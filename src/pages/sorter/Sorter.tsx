import { useEffect, useRef, useState } from "react";
import FileSystemDb from "../../scripts/file-upload/file-system-db";
// import testIcon from "./file-icon/test-icon";
import directoryIcon from "../../assets/images/icons/folder-open.svg";
import videoIcon from "../../assets/images/icons/video-file.svg";
import unknownIcon from "../../assets/images/icons/image-files.svg";
import newFolderButtonIcon from "../../assets/images/icons/folder-plus.svg";
import returnIcon from "../../assets/images/icons/up-one.svg";
import uploadIcon from "../../assets/images/icons/cloud-upload.svg";

import "./Sorter.css";
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
  

const Sorter: React.FC = () => {

	const { guestId } = useParams<{ guestId: string }>();
	const guestName = UPLOAD_IDS["master"];

	// const [db, setDb] = useState<FileSystemDb | null>(null);
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
	const [selectedMediaIndex, setSelectedMediaIndex] = useState(0);
	const [mediaUrl, setMediaUrl] = useState<string | null>(null);
	// const [nextMediaUrl, setNextMediaUrl] = useState<string | null>(null);
	const [photographerName, setPhotographerName] = useState<string | null>(null);
	const [hdMediaPath, setHdMediaPath] = useState<string | null>(null);

	// const [isVideoViewerOpen, setIsVideoViewerOpen] = useState(false);
	// const [videoUrl, setVideoUrl] = useState<string | null>(null);

	const GET_S3_FS = "https://2fiucgicl8.execute-api.us-east-2.amazonaws.com/get-s3-fs";
	const DELETE_S3_FILE = "https://2fiucgicl8.execute-api.us-east-2.amazonaws.com/delete-s3-file";

	useEffect(() => {

		let basePath;
		const initDb = async () => {

			let fs = new IndexedDbFilesystem(null);
			setFs(fs);

			await fs.wipeDb();

			{ // Also load whatever is in s3, and update the local db.
				let response = await fetch(GET_S3_FS, {
					method: "POST",
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify({ 
						guestId: "master"
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
		// console.log("drop", files);
		await fs.writeFiles(files);
	};

	const loadDirectory = async (fsDb: IndexedDbFilesystem, path: string) => {

		// console.log(`Loading directory ${path}.`);

		setCurrentPath(path);
		setBreadcrumb(path.split("/"));

		let contents = await fsDb.listAllFiles();

		let files = contents.filter((c) => !c.isDirectory);
		// console.log(contents);

		setFiles(files);

		// console.log("Loading", path, contents);
	};

	const handleFileDoubleClick = async (fileName: string) => {
		// console.log(`File ${fileName} opened`);

		let fileRecord = await fs.getMetadata(`${fileName}`);

		if(imageFileTypes.indexOf(fileName.toLowerCase().split(".").pop()) != -1 
			|| videoFileFormats.indexOf(fileName.toLowerCase().split(".").pop()) != -1){
			loadMedia(fileRecord.path);
		}
	};

	const loadMedia = (path: string) => {
		let fullPath = null;
		let fullHdPath = `${CLOUDFRONT_URL}/uploads${path}`;
		// let nextFullPath = null;

		let nextIndex = files.findIndex((f) => f.path === path);
		if(nextIndex != -1){
			setSelectedMediaIndex(nextIndex);
		}

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

		// if(nextPath){
		// 	if(imageFileTypes.indexOf(nextPath.toLocaleLowerCase().split(".").pop()) != -1){
		// 		let parts = nextPath.split("/");
		// 		parts[2] = "compressed";
		// 		nextFullPath = `${CLOUDFRONT_URL}/uploads${parts.join("/")}`;
		// 	}
		// 	else{
		// 		nextFullPath = `${CLOUDFRONT_URL}/uploads${path}`;
		// 	}
		// }

		setMediaUrl(fullPath);
		// setNextMediaUrl(nextFullPath);
		setPhotographerName(UPLOAD_IDS[path.split("/")[1]]);
		setIsViewerOpen(true);
		document.body.classList.add('no-scroll');
	}

	const selectPrev = () => {
		// console.log("prev", selectedItem);
		if (selectedItem) {
			const currentIndex = files.findIndex((f) => f.path === selectedItem.path);
			// console.log(currentIndex);
			if (currentIndex !== -1 && currentIndex > 0) {
				let newPath = files[currentIndex - 1].path;
				setSelectedItem({ type: 'file', path: newPath });
				if(isViewerOpen){
					loadMedia(newPath);
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
				loadMedia(newPath);
			}
		}
		
	}

	const selectFiles = async (fileList: FileList) => {
		let files = Array.from(fileList);

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
		document.body.classList.remove('no-scroll');
	};

	return (
		<>
			{!!guestName ?
				<>
					<h1>Image Sorter</h1>

					<div className="file-list">

						{files.map((file) => (
							// <FileIcon
							// 	key={file.path}
							// 	// iconUrl={file.localThumbnailUrl || file.remoteThumbnailUrl} // Use the file's thumbnail for the icon
							// 	iconUrl={file.thumbnailPath ? `${CLOUDFRONT_URL}/uploads${file.thumbnailPath}` : videoFileFormats.indexOf(file.path.toLocaleLowerCase().split(".").pop()) != -1 ? videoIcon : unknownIcon} // Use the file's thumbnail for the icon
							// 	label={file.name}
							// 	onSelect={() => setSelectedItem({ type: 'file', path: file.path })} // Track selection
							// 	onDoubleClick={() => handleFileDoubleClick(file.path)}
							// 	onKeyPress={(e) => { handleKeyPressOnFile(e as any, file.path) }}
							// 	selected={selectedItem?.path === file.path}
							// />
							<div className="file-list-item" key={file.path}>
								<img onDoubleClick={()=>handleFileDoubleClick(file.path)} src={file.thumbnailPath ? `${CLOUDFRONT_URL}/uploads${file.thumbnailPath}` : videoFileFormats.indexOf(file.path.toLocaleLowerCase().split(".").pop()) != -1 ? videoIcon : unknownIcon} alt={file.name} />
								<div>
									<p>File name: {file.name}</p>
									<p>Taken by: {UPLOAD_IDS[file.path.split("/")[1]]||"Unknown"}</p>
								</div>
								<div>
									<p><input type="checkbox" /> Show in carousel?</p>
									<p><input type="checkbox" /> Make public?</p>
									<p><input type="checkbox" /> Favorites?</p>
								</div>
								<div>
									<p><b>Category:</b></p>
									<select>
										<option>Uncategorized</option>
										<option>Bridal Shower</option>
										<option>Preparation</option>
										<option>Ceremony</option>
										<option>Reception</option>
										<option>Honeymoon</option>
									</select>
								</div>
							</div>
						))}

					</div>
					<MediaViewer
						isOpen={isViewerOpen}
						mediaData={files}
						mediaIndex={selectedMediaIndex}
						photographerName={photographerName}
						hdPhotoUrl={hdMediaPath}
						onClose={closePhotoViewer} 
						onSwipeLeft={selectNext}
						onSwipeRight={selectPrev}
						/>
					<ProgressBar
						totalFiles={totalFiles}
						completedThumbnails={completedThumbnails}
						completedUploads={completedUploads}
						show={show}
						avgT={avgT}
					/>
					<DragAndDrop currentPath={currentPath} onDrop={dropFiles} />
				</>

				: <h1>Guest not found</h1>
			}
		</>
	);
};

export default Sorter;