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
import PhotoViewer from "../../components/photo-viewer/PhotoViewer";
import { CLOUDFRONT_URL, imageFileTypes, videoFileFormats } from "../../scripts/constants";
import VideoViewer from "../../components/video-viewer/VideoViewer";
  

const Upload: React.FC = () => {

	const { guestId } = useParams<{ guestId: string }>();

	// const [db, setDb] = useState<FileSystemDb | null>(null);
	const [directories, setDirectories] = useState<IFileMetadata[]>([]);
	const [files, setFiles] = useState<IFileMetadata[]>([]);
	// const [currentDirectoryId, setCurrentDirectoryId] = useState<number | null>(null); // Start with root
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
	const [photoUrl, setPhotoUrl] = useState<string | null>(null);

	const [isVideoViewerOpen, setIsVideoViewerOpen] = useState(false);
	const [videoUrl, setVideoUrl] = useState<string | null>(null);

	const GET_S3_FS = "https://2fiucgicl8.execute-api.us-east-2.amazonaws.com/get-s3-fs";

	useEffect(() => {
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
					keys[i] = keys[i].substring(`uploads/${guestId}/`.length);
					let key = keys[i];
					if(key.startsWith("files/")){
						key = key.substring("files".length);
						fileKeyHash[key] = true;

						let keyPathParts = key.split("/");
						keyPathParts.pop(); // Remove the file name
						keyPathParts.shift(); // Remove starting /
						
						let constructedPath = "";
						for(let j = 0; j < keyPathParts.length; j++){
							let pathPart = keyPathParts[j];
							if(pathPart.length){
								constructedPath = constructedPath + "/" + pathPart;
								directoriesHash[constructedPath] = true;
								// console.log("Added", constructedPath);
							}
						}
					}
					else if(key.startsWith("compressed/")){
						key = key.substring("compressed".length);
						compressedKeyHash[key] = true;
					}
					else if(key.startsWith("thumbnails/")){
						key = key.substring("thumbnails".length);
						thumbnailKeyHash[key] = true;
					}
				}

				// For each directory, make sure all the directories exist in our local db.

				let directories = Object.keys(directoriesHash);
				for(let i = 0; i < directories.length; i++){
					let path = directories[i];
					if(!await fs.exists(path)){
						await fs.createDirectory(path);
					}
				}

				// Add all the files that don't exist locally.

				let files = Object.keys(fileKeyHash);
				for(let i = 0; i < files.length; i++){
					let fullFilePath = files[i];
					// console.log("File:", fullFilePath);
					let fileName = fullFilePath.split("/").pop();
					let filePath = fullFilePath.split("/").slice(0, -1).join("/").substring(1) + "/";
					// console.log("Create", filePath, fileName);
					await fs.createFileRecord(filePath, fileName, 0, !!thumbnailKeyHash[fullFilePath])
				}

				// let allFileKeys = Object.keys(fileKeyHash);

			}

			loadDirectory(fs, "/"); // Load root directory (parentDirectoryId is null for root)
		};

		initDb();


		return () => {
			// if (db) db.close();
		};
	}, []);

	const dropFiles = async (files: { file: File, path: string }[]) => {
		// console.log(files);
		// uploadPipe.processBatch({
		// 	files: files,
		// 	userId: guestId,
		// });
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

	// const loadDirectory = async (fsDb: FileSystemDb, parentDirectoryId: number | null) => {
	// 	const allDirectories = await fsDb.getAllRecords('directory');
	// 	const allFiles = await fsDb.getAllRecords('s3File');

	// 	// Filter directories and files by parentDirectoryId
	// 	const filteredDirectories = allDirectories.filter(
	// 		(dir: Directory) => dir.parentDirectoryId === parentDirectoryId
	// 	);
	// 	const filteredFiles = allFiles.filter(
	// 		(file: S3File) => file.parentDirectoryId === parentDirectoryId
	// 	);

	// 	setDirectories(filteredDirectories);
	// 	setFiles(filteredFiles);
	// 	setCurrentDirectoryId(parentDirectoryId);
	// };

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

	const handleFileDoubleClick = (fileName: string) => {
		// console.log(`File ${fileName} opened`);

		if(videoFileFormats.indexOf(fileName.toLowerCase().split(".").pop()) != -1){
			openVideoViewer(`${CLOUDFRONT_URL}/uploads/${guestId}/files${fileName}`);
		}
		else if(imageFileTypes.indexOf(fileName.toLowerCase().split(".").pop()) != -1){
			openPhotoViewer(`${CLOUDFRONT_URL}/uploads/${guestId}/compressed${fileName}`);
		}
	};

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

	const navigateToBreadcrumb = async (index: number) => {
		let constructedPath = "/";

		for (let i = 1; i <= index; i++) {
			constructedPath += breadcrumb[i] + "/";
		}

		await loadDirectory(fs, constructedPath);
	};

	const newFolderBtn = async () => {
		if (fs) {
			let newFolderName = prompt("Enter the name of the new folder:");
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
		}

		loadDirectory(fs, currentPath);
	};

	const handleKeyPressOnDirectory = (e: React.KeyboardEvent, path: string, directoryName: string) => {
		switch (e.key) {
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
			case 'Enter': {
				// handleDirectoryDoubleClick(directoryId, directoryName);
				break;
			}
			case 'Delete': {
				deleteItem(fileId);
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

	// Function to open the photo viewer
	const openPhotoViewer = (url: string) => {
		setPhotoUrl(url);
		setIsViewerOpen(true);
	};

	// Function to close the photo viewer
	const closePhotoViewer = () => {
		setIsViewerOpen(false);
		setPhotoUrl(null);
	};

	const closeVideoViewer = () => {
		setIsVideoViewerOpen(false);
		setVideoUrl(null);
	};

	const openVideoViewer = (url: string) => {
		setVideoUrl(url);
		setIsVideoViewerOpen(true);
	};

	return (
		<>
			{/* Breadcrumb Navigation */}
			<div className="breadcrumb">
				{breadcrumb.map((crumb, index) => (
					<span key={index}>
						<span

							className="breadcrumb-item"
							onClick={() => navigateToBreadcrumb(index)}
						>
							{index == 0 ? "files" : crumb}
						</span>
						{index < breadcrumb.length - 1 && <span className="breadcrumb-divider">/</span>}
					</span>
				))}
			</div>

			<button className="fs-btn" onClick={newFolderBtn}><img src={newFolderButtonIcon} width="32px" /></button>
			<UploadButton onFilesSelected={selectFiles} />

			<div className="file-grid">
				{currentPath !== "/" && (
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
						label={directory.name}
						onSelect={() => setSelectedItem({ type: 'directory', path: directory.path })} // Track selection
						onDoubleClick={() => handleDirectoryDoubleClick(directory.path, directory.name)}
						onKeyPress={(e) => { handleKeyPressOnDirectory(e as any, directory.path, directory.name) }}
					/>
				))}

				{files.map((file) => (
					<FileIcon
						key={file.path}
						// iconUrl={file.localThumbnailUrl || file.remoteThumbnailUrl} // Use the file's thumbnail for the icon
						iconUrl={file.hasThumbnail ? `${CLOUDFRONT_URL}/uploads/${guestId}/thumbnails${file.path}` : videoFileFormats.indexOf(file.path.toLocaleLowerCase().split(".").pop()) != -1 ? videoIcon : unknownIcon} // Use the file's thumbnail for the icon
						label={file.name}
						onSelect={() => setSelectedItem({ type: 'file', path: file.path })} // Track selection
						onDoubleClick={() => handleFileDoubleClick(file.path)}
						onKeyPress={(e) => { handleKeyPressOnFile(e as any, file.path) }}
					/>
				))}

			</div>
			{!files.length && !directories.length && <div className="empty-folder-message">Folder is empty. To upload files, drag and drop them onto the web page, or click the upload to cloud button above.</div>}
			<PhotoViewer
				isOpen={isViewerOpen}
				photoUrl={photoUrl}
				onClose={closePhotoViewer} />
			<VideoViewer
				isOpen={isVideoViewerOpen}
				videoUrl={videoUrl}
				onClose={closeVideoViewer} />
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