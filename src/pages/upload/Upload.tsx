import { useEffect, useRef, useState } from "react";
import FileSystemDb from "../../scripts/file-upload/file-system-db";
import FileIcon from "./file-icon/FileIcon";
// import testIcon from "./file-icon/test-icon";
import directoryIcon from "../../assets/images/icons/folder-open.svg";
import videoIcon from "../../assets/images/icons/video-file.svg";
import unknownIcon from "../../assets/images/icons/image-files.svg";
import newFolderButtonIcon from "../../assets/images/icons/folder-plus.svg";
import returnIcon from "../../assets/images/icons/up-one.svg";
import uploadIcon from "../../assets/images/icons/cloud-upload.svg";

import "./Upload.css";
import { UploadPipe } from "../../scripts/file-upload/upload-pipe";
import { useParams } from "react-router-dom";
import ProgressBar from "../../components/progress-bar/ProgressBar";
import DragAndDrop from "../../components/drag-and-drop/DragAndDrop";
import IndexedDbFilesystem from "../../scripts/filesystem/indexed-db-filesystem";
import { IFileMetadata } from "../../scripts/filesystem/i-filesystem";
import MediaViewer from "../../components/media-viewer/MediaViewer";
import { CLOUDFRONT_URL, imageFileTypes, videoFileFormats } from "../../scripts/constants";
import VideoViewer from "../../components/video-viewer/VideoViewer";
import UPLOAD_IDS from "../../scripts/upload-ids";
  

const Upload: React.FC = () => {

	const { guestId } = useParams<{ guestId: string }>();
	const guestName = UPLOAD_IDS[guestId];

	// const [db, setDb] = useState<FileSystemDb | null>(null);
	const [directories, setDirectories] = useState<IFileMetadata[]>([]);
	const [files, setFiles] = useState<IFileMetadata[]>([]);
	// const [currentDirectoryId, setCurrentDirectoryId] = useState<number | null>(null); // Start with root
	const [basePath, setBasePath] = useState<string>("");
	const [currentPath, setCurrentPath] = useState<string>("");
	const [breadcrumb, setBreadcrumb] = useState<string[]>([]); // Breadcrumb stack
	const [selectedItem, setSelectedItem] = useState<{ type: 'directory' | 'file'; path: string } | null>(null); // Track selected item
	// const [uploadPipe, setUploadPipe] = useState<UploadPipe | null>(null);

	const [fs, setFs] = useState<IndexedDbFilesystem | null>(null);

	// Progress bar props:
	const [completedThumbnails, setCompletedThumbnails] = useState(20);
	const [completedUploads, setCompletedUploads] = useState(0);
	const [avgT, setAvgT] = useState(3.5);
	const [totalFiles, setTotalFiles] = useState(0);
	const [show, setShow] = useState(false);

	// Photo viewer:
	const [isViewerOpen, setIsViewerOpen] = useState(false);
	const [mediaUrl, setMediaUrl] = useState<string | null>(null);
	const [nextMediaUrl, setNextMediaUrl] = useState<string | null>(null);
	const [photographerName, setPhotographerName] = useState<string | null>(null);
	const [hdMediaPath, setHdMediaPath] = useState<string | null>(null);

	// const [isVideoViewerOpen, setIsVideoViewerOpen] = useState(false);
	// const [videoUrl, setVideoUrl] = useState<string | null>(null);

	const GET_S3_FS = "https://2fiucgicl8.execute-api.us-east-2.amazonaws.com/get-s3-fs";
	const DELETE_S3_FILE = "https://2fiucgicl8.execute-api.us-east-2.amazonaws.com/delete-s3-file";

	useEffect(() => {

		let basePath;
		const initDb = async () => {

			let fs = new IndexedDbFilesystem(uploadProgress);
			setFs(fs);

			await fs.wipeDb();

			{ // Also load whatever is in s3, and update the local db.
				let response = await fetch(GET_S3_FS, {
					method: "POST",
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify({ 
						guestId: guestId
					})
				});

				let data = await response.json();

				let keys = data?.keys || [];
				let fileKeyHash = {};
				let thumbnailKeyHash = {};
				let compressedKeyHash = {};

				let directoriesHash = {};

				for (let i = 0; i < keys.length; i++) {
					// keys[i] = keys[i].substring(`uploads/${guestId}/`.length);
					// let key = keys[i];
					let keyParts = keys[i].split("/");
					keyParts.shift(); // Remove the uploads folder
					let fileGuestDirectory = keyParts.shift(); // Remove the guestId
					// console.log(fileGuestDirectory);
					let key = keyParts.join("/");

					let isFile = key.startsWith("files/");
					let isCompressed = key.startsWith("compressed/");
					let isThumbnail = key.startsWith("thumbnails/");

					fileKeyHash[fileGuestDirectory] = fileKeyHash[fileGuestDirectory] || {};
					compressedKeyHash[fileGuestDirectory] = compressedKeyHash[fileGuestDirectory] || {};
					thumbnailKeyHash[fileGuestDirectory] = thumbnailKeyHash[fileGuestDirectory] || {};

					if(isFile){
						key = key.substring("files".length);
						fileKeyHash[fileGuestDirectory][key] = true;

						// Also set up the directories here.

						let keyPathParts = key.split("/");
						keyPathParts.pop(); // Remove the file name
						keyPathParts.shift(); // Remove starting /
						
						let constructedPath = `/${fileGuestDirectory}`;
						directoriesHash[constructedPath] = true;
						constructedPath += `/files`;
						directoriesHash[constructedPath] = true;

						for(let j = 0; j < keyPathParts.length; j++){
							let pathPart = keyPathParts[j];
							if(pathPart.length){
								constructedPath = constructedPath + "/" + pathPart;
								directoriesHash[constructedPath] = true;
								// console.log("Added", constructedPath);
							}
						}
					}
					else if(isCompressed){
						key = key.substring("compressed".length);
						compressedKeyHash[fileGuestDirectory][key] = true;
					}
					else if(isThumbnail){
						key = key.substring("thumbnails".length);
						thumbnailKeyHash[fileGuestDirectory][key] = true;
					}
				}

				// For each directory, make sure all the directories exist in our local db.

				let directories = Object.keys(directoriesHash);
				// console.log("directories", directories);
				for(let i = 0; i < directories.length; i++){
					let path = directories[i];
					if(!await fs.exists(path)){
						await fs.createDirectory(path);
					}
				}

				// Add all the files that don't exist locally.

				let guests = Object.keys(fileKeyHash);
				for(let i = 0; i < guests.length; i++){
					let currentGuestId = guests[i];
					let currentFiles = Object.keys(fileKeyHash[currentGuestId]);

					for(let j = 0; j < currentFiles.length; j++){
						let relativeFilePath = currentFiles[j];
						// console.log("File:", fullFilePath);
						let fileName = relativeFilePath.split("/").pop();
						let filePath = `${currentGuestId}/files${relativeFilePath}`.split("/").slice(0, -1).join("/") + "/";
						if(filePath == "/")	filePath = "";
						// console.log("Create", filePath, fileName);
						// console.log("Guest Folder", currentGuestId);
						let thumbnailPath = null;
						let compressedPath = null;
						if(thumbnailKeyHash[currentGuestId][relativeFilePath]){
							thumbnailPath = `/${currentGuestId}/thumbnails${relativeFilePath}`.split("/").slice(0, -1).join("/") + "/" + fileName;
						}
						if(compressedKeyHash[currentGuestId][relativeFilePath]){
							compressedPath = `/${currentGuestId}/compressed${relativeFilePath}`.split("/").slice(0, -1).join("/") + "/" + fileName;
						}
						// console.log(thumbnailPath);
						await fs.createFileRecord(`/${filePath}${fileName}`, 0, thumbnailPath, compressedPath);
					}
				}

				// let allFileKeys = Object.keys(fileKeyHash);

			}

			console.log(basePath);
			loadDirectory(fs, basePath); // Load root directory (parentDirectoryId is null for root)
		};

		if(guestId == "master"){
			basePath = "/";
		}
		else{
			basePath = `/${guestId}/files/`;
		}
		setBasePath(basePath);

		initDb();


		return () => {
			// if (db) db.close();
		};
	}, []);

	const dropFiles = async (files: { file: File, path: string }[]) => {
		await fs.writeFiles(files);
	};

	const loadDirectory = async (fsDb: IndexedDbFilesystem, path: string) => {

		// console.log(`Loading directory ${path}.`);

		setCurrentPath(path);
		setBreadcrumb(path.split("/"));

		let contents = await fsDb.listDirectory(path);

		let directories = contents.filter((c) => c.isDirectory);
		let files = contents.filter((c) => !c.isDirectory);
		// console.log(contents);


		setDirectories(directories);
		setFiles(files);

		// console.log("Loading", path, contents);
	};

	const handleDirectoryDoubleClick = (path: string, directoryName: string) => {
		if (fs) {
			let newPath = `${currentPath}${directoryName}/`;
			loadDirectory(fs, newPath);

			// Get the full path:
			// let path = "";
			// for (let i = 1; i < breadcrumb.length; i++) {
			// 	path += breadcrumb[i].name + "/";
			// }
			// path += `${directoryName}/`;

			// setCurrentPath(newPath);
		}
	};

	const handleFileDoubleClick = async (fileName: string) => {
		// console.log(`File ${fileName} opened`);

		let fileRecord = await fs.getMetadata(`${fileName}`);

		if(imageFileTypes.indexOf(fileName.toLowerCase().split(".").pop()) != -1 
			|| videoFileFormats.indexOf(fileName.toLowerCase().split(".").pop()) != -1){
			loadMedia(fileRecord.path, null);
		}
	};

	const loadMedia = (path: string, nextPath: string) => {
		let fullPath = null;
		let fullHdPath = `${CLOUDFRONT_URL}/uploads${path}`;
		let nextFullPath = null;

		if(imageFileTypes.indexOf(path.toLocaleLowerCase().split(".").pop()) != -1){
			let parts = path.split("/");
			parts[2] = "compressed";
			fullPath = `${CLOUDFRONT_URL}/uploads${parts.join("/")}`;
			setHdMediaPath(fullHdPath);
		}
		else{
			fullPath = fullHdPath;
			setHdMediaPath(null);
		}

		if(nextPath){
			if(imageFileTypes.indexOf(nextPath.toLocaleLowerCase().split(".").pop()) != -1){
				let parts = nextPath.split("/");
				parts[2] = "compressed";
				nextFullPath = `${CLOUDFRONT_URL}/uploads${parts.join("/")}`;
			}
			else{
				nextFullPath = `${CLOUDFRONT_URL}/uploads${path}`;
			}
		}

		setMediaUrl(fullPath);
		setNextMediaUrl(nextFullPath);
		setPhotographerName(UPLOAD_IDS[path.split("/")[1]]);
		setIsViewerOpen(true);
	}

	const upOne = () => {
		if (breadcrumb.length > 1) {
			const previousDirectory = breadcrumb[breadcrumb.length - 2]; // Get the previous directory
			setBreadcrumb(breadcrumb.slice(0, -1)); // Remove the current directory from breadcrumb

			let newPath = currentPath.split("/").slice(0, -2).join("/") + "/";
			loadDirectory(fs, newPath);

			// let path = "";
			// for (let i = 1; i < breadcrumb.length - 1; i++) {
			// 	path += breadcrumb[i].name + "/";
			// }

			// setCurrentPath(newPath);
		}
	};

	const selectPrev = () => {
		// console.log("prev", selectedItem);
		if (selectedItem) {
			const currentIndex = files.findIndex((f) => f.path === selectedItem.path);
			// console.log(currentIndex);
			if (currentIndex !== -1 && currentIndex > 0) {
				let newPath = files[currentIndex - 1].path;
				setSelectedItem({ type: 'file', path: newPath });
				if(isViewerOpen){
					loadMedia(newPath, null);
				}
			}

		}
	}

	const selectNext = () => {
		// console.log("next", selectedItem);
		if (selectedItem) {

			let newPath = null;
			let nextNewPath = null; // For preloading.

			const currentIndex = files.findIndex((f) => f.path === selectedItem.path);
			// console.log(currentIndex);
			if (currentIndex !== -1 && currentIndex < files.length - 1) {
				newPath = files[currentIndex + 1].path;
				setSelectedItem({ type: 'file', path: newPath });
			}
			if (currentIndex !== -1 && currentIndex < files.length - 2) {
				nextNewPath = files[currentIndex + 2].path;
			}
			
			if(newPath && isViewerOpen){
				loadMedia(newPath, nextNewPath);
			}
		}
		
	}

	const navigateToBreadcrumb = async (index: number) => {
		let constructedPath = "/";

		for (let i = 1; i <= index; i++) {
			constructedPath += breadcrumb[i] + "/";
		}

		if(constructedPath.length >= basePath.length){
			await loadDirectory(fs, constructedPath);
		}
	};

	const newFolderBtn = async () => {
		if (fs) {
			let newFolderName = prompt("Enter the name of the new folder:");
			if(!newFolderName) return;
			let path = `${currentPath}${newFolderName}`;
			// console.log(path);
			// return;
			if (await fs.exists(path)) {
				console.warn("Folder already exists");
				return;
			}
			await fs.createDirectory(path);

			await loadDirectory(fs, currentPath);
		}
	};

	// Delete directory and its children recursively
	const deleteItem = async (path: string) => {
		// console.log(path);

		let item = await fs.getMetadata(path);

		if (item.isDirectory) {
			let children = await fs.listDirectory(path);

			console.log(`Deleting ${path} and its children.`);

			while (children.length > 0) {
				await deleteItem(children.pop().path);
			}

			await fs.deleteDirectory(item.path);
		}
		else {
			console.log(`Deleting ${path}.`);
			await fs.deleteFile(item.path);

			// Get the relative path (the part after "files"):
			let relativePath = item.path.split("/").slice(3).join("/");
			// console.log(relativePath);

			await fetch(DELETE_S3_FILE, {
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify({
					guestId: guestId,
					relativeKey: relativePath
				})
			});
		}

		loadDirectory(fs, currentPath);
	};

	const handleKeyPressOnDirectory = (e: React.KeyboardEvent, path: string, directoryName: string) => {
		switch (e.key) {
			case 'Escape': {
				if(isViewerOpen) closePhotoViewer();
				// if(isVideoViewerOpen) closeVideoViewer();
				break;
			}
			case 'Enter': {
				handleDirectoryDoubleClick(path, directoryName);
				break;
			}
			case 'Delete': {
				deleteItem(path);
				break;
			}
		}
	};

	const handleKeyPressOnFile = (e: React.KeyboardEvent, fileId: string) => {
		switch (e.key) {
			case 'Escape': {
				if(isViewerOpen) closePhotoViewer();
				// if(isVideoViewerOpen) closeVideoViewer();
				break;
			}
			case 'Enter': {
				// handleDirectoryDoubleClick(directoryId, directoryName);
				break;
			}
			case 'Delete': {
				deleteItem(fileId);
				break;
			}
			case 'ArrowLeft': {
				selectPrev();
				break;
			}
			case 'ArrowRight': {
				selectNext();
				break;
			}
		}
	};

	const uploadProgress = async (fs, progress) => {
		// console.log(progress);

		setCompletedThumbnails(progress.cached);
		setCompletedUploads(progress.complete);
		// setAvgT();
		setTotalFiles(progress.total);
		setShow(progress.complete != progress.total);

		if (progress.newFiles?.length) {
			// console.log(currentPath || "/");

			// I understood why this bug was happening a bit too late to fix it.
			// This hacx will have to do for now.
			let cp = null;
			setCurrentPath((v) => {
				cp = v;
				loadDirectory(fs, v || "/");
				return v;
			});
		}
	}

	// useEffect(() => {
	// 	if (uploadPipe) {
	// 		uploadPipe.setProgressHandler(uploadProgress);
	// 	}
	// }, [uploadPipe]);

	const selectFiles = async (fileList: FileList) => {
		let files = Array.from(fileList);
		// uploadPipe.processBatch({
		// 	files: files.map(f => {
		// 		return {
		// 			file: f,
		// 			path: currentPath
		// 		};
		// 	}),
		// 	userId: guestId,
		// });

		await fs.writeFiles(files.map(f => {
			return {
				file: f,
				path: currentPath
			}
		}));
	};

	// Function to close the photo viewer
	const closePhotoViewer = () => {
		setIsViewerOpen(false);
		setMediaUrl(null);
	};

	// const closeVideoViewer = () => {
	// 	setIsVideoViewerOpen(false);
	// 	setVideoUrl(null);
	// };

	// const openVideoViewer = (url: string) => {
	// 	setVideoUrl(url);
	// 	setIsVideoViewerOpen(true);
	// };

	return (
		<>
			{!!guestName ?
				<>
					<h1>{guestName}'s Uploads</h1>
					{/* Breadcrumb Navigation */}
					<div className="breadcrumb">
						{breadcrumb.map((crumb, index) => (
							<span key={index}>
								<span

									className="breadcrumb-item"
									onClick={() => navigateToBreadcrumb(index)}
								>
									{index == 0 ? "uploads" : crumb}
								</span>
								{index < breadcrumb.length - 1 && <span className="breadcrumb-divider">/</span>}
							</span>
						))}
					</div>

					<button className="fs-btn" onClick={newFolderBtn}><img src={newFolderButtonIcon} width="32px" /></button>
					<UploadButton onFilesSelected={selectFiles} />

					<div className="file-grid">
						{currentPath.length > basePath.length && (
							<FileIcon
								iconUrl={returnIcon}
								label=".."
								onDoubleClick={() => upOne()}
								onKeyPress={(e) => {
									if (e.key === 'Enter') {
										upOne();
									}
								}}
							/>
						)}
						{directories.map((directory) => (
							<FileIcon
								key={directory.path}
								iconUrl={directoryIcon} // Use the SVG icon for directories
								label={currentPath == "/" ? (UPLOAD_IDS[directory.name] || directory.name) : directory.name}
								onSelect={() => setSelectedItem({ type: 'directory', path: directory.path })} // Track selection
								onDoubleClick={() => handleDirectoryDoubleClick(directory.path, directory.name)}
								onKeyPress={(e) => { handleKeyPressOnDirectory(e as any, directory.path, directory.name) }}
								selected={selectedItem?.path === directory.path}
							/>
						))}

						{files.map((file) => (
							<FileIcon
								key={file.path}
								// iconUrl={file.localThumbnailUrl || file.remoteThumbnailUrl} // Use the file's thumbnail for the icon
								iconUrl={file.thumbnailPath ? `${CLOUDFRONT_URL}/uploads${file.thumbnailPath}` : videoFileFormats.indexOf(file.path.toLocaleLowerCase().split(".").pop()) != -1 ? videoIcon : unknownIcon} // Use the file's thumbnail for the icon
								label={file.name}
								onSelect={() => setSelectedItem({ type: 'file', path: file.path })} // Track selection
								onDoubleClick={() => handleFileDoubleClick(file.path)}
								onKeyPress={(e) => { handleKeyPressOnFile(e as any, file.path) }}
								selected={selectedItem?.path === file.path}
							/>
						))}

					</div>
					{!files.length && !directories.length && <div className="empty-folder-message">Folder is empty. To upload files, drag and drop them onto the web page, or click the upload to cloud button above.</div>}
					<MediaViewer
						isOpen={isViewerOpen}
						mediaUrl={mediaUrl}
						nextMediaUrl={nextMediaUrl}
						photographerName={photographerName}
						hdPhotoUrl={hdMediaPath}
						onClose={closePhotoViewer} 
						onSwipeLeft={selectNext}
						onSwipeRight={selectPrev}
						/>
					{/* <VideoViewer
						isOpen={isVideoViewerOpen}
						videoUrl={videoUrl}
						onClose={closeVideoViewer} /> */}
					<ProgressBar
						totalFiles={totalFiles}
						completedThumbnails={completedThumbnails}
						completedUploads={completedUploads}
						show={show}
						avgT={avgT}
					/>
					<DragAndDrop currentPath={currentPath} onDrop={dropFiles} />
				</>

				//   <div className="file-grid">
				// 	<FileIcon
				// 		iconUrl={null}
				// 		label="ReallyReallyReallyReally ReallyReallyLongName.png"
				// 		size={100}
				// 		// onSelect={handleSelect}
				// 		// onKeyPress={handleKeyPress}
				// 	/>
				//   </div>
				: <h1>Guest not found</h1>
			}
		</>
	);
};

interface UploadButtonProps {
	onFilesSelected: (files: FileList) => void; // Function to handle selected files
}
const UploadButton: React.FC<UploadButtonProps> = ({ onFilesSelected }) => {
	const fileInputRef = useRef<HTMLInputElement | null>(null);

	const uploadDialog = () => {
		if (fileInputRef.current) {
			fileInputRef.current.click(); // Trigger the file input click
		}
	};

	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const files = event.target.files;
		if (files) {
			onFilesSelected(files); // Call the function with the selected files
		}
	};

	return (
		<>
			<button className="fs-btn" onClick={uploadDialog}><img src={uploadIcon} width="32px" /></button>

			{/* Hidden file input */}
			<input
				type="file"
				ref={fileInputRef}
				style={{ display: 'none' }}
				accept="image/*, video/*" // Accept images and videos
				multiple // Allow multiple file selection
				onChange={handleFileChange} // Handle file selection
			/>
		</>
	);
};

export default Upload;