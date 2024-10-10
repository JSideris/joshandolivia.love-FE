import { UploadPipe } from "../file-upload/upload-pipe";
import { IFileMetadata, IFilesystem } from "./i-filesystem";

class IndexedDbFilesystem implements IFilesystem {
	private dbName: string;
	private storeName: string;
	private uploadPipe: UploadPipe;

	constructor(progressHandler, dbName: string = 'FilesystemDB', storeName: string = 'files') {
		this.dbName = dbName;
		this.storeName = storeName;
		this.uploadPipe = new UploadPipe();
		this.uploadPipe.setProgressHandler(async progress=>{

			for(let f in (progress.newFiles || [])){
				let F = progress.newFiles[f];
				// await this.createFileRecord(F.path, F.name, F.file.size, !!F.thumbnail);
				let path = `/${F.path}${F.name}`;
				let pathParts = path.split("/");
				let thumbPath = null;
				let compressedPath = null;
				if(F.thumbnail){
					pathParts[2] = "thumbnails";
					thumbPath = pathParts.join("/");
				}
				if(F.compressed){
					pathParts[2] = "compressed";
					compressedPath = pathParts.join("/");
				}

				await this.createFileRecord(path, F.file.size, thumbPath, compressedPath);
			}

			progressHandler(this, progress);
		});
		this.uploadPipe.initialize();
	}
	readFile(path: string): Promise<File> {
		throw new Error("Method not implemented.");
	}

	async writeFile(path: string, data: File): Promise<void> {
		await this.writeFiles([{ file: data, path }]);
	}

	async writeFiles(data: {
		file: File,
		path: string
	}[]): Promise<void> {
		// let userId = window.location.hash.split("/").pop() || window.location.pathname.split("/").pop() || "anonymous";

		{ // Create the directories related to the files.

			let newDirs = {};
			for(let f = 0; f < data.length; f++){
				let F = data[f];
				
				// Add the directory first.
				let constructedPath = "/";
				let directoryParts = F.path.split("/");
				for(let j = 0; j < directoryParts.length - 1; j++){
					let pathPart = directoryParts[j];
					if(pathPart.length){
						let toCreate = constructedPath + pathPart;
						constructedPath = toCreate + "/";
						if(!newDirs[constructedPath]){
							newDirs[constructedPath] = true;
							if(!await this.exists(toCreate)){
								await this.createDirectory(toCreate);
							}
						}
					}
				}
			}
		}

		await this.uploadPipe.processBatch({
			files: data
		});
	}
	async deleteFile(path: string): Promise<void> {
		// const db = await this.openDB();
		// return new Promise((resolve, reject) => {
		// 	const transaction = db.transaction(this.storeName, 'readwrite');
		// 	const store = transaction.objectStore(this.storeName);
		// 	const request = store.delete(path);
		// 	request.onsuccess = () => resolve();
		// 	request.onerror = () => reject(request.error);
		// });
		await this.deleteDirectory(path);
	}
	copyFile(sourcePath: string, destinationPath: string): Promise<void> {
		throw new Error("Method not implemented.");
	}
	moveFile(sourcePath: string, destinationPath: string): Promise<void> {
		throw new Error("Method not implemented.");
	}

	private async openDB(): Promise<IDBDatabase> {
		return new Promise((resolve, reject) => {
			const request = indexedDB.open(this.dbName, 1);
			request.onupgradeneeded = () => {
				const db = request.result;
				if (!db.objectStoreNames.contains(this.storeName)) {
					db.createObjectStore(this.storeName, { keyPath: 'path' });
				}
			};
			request.onsuccess = () => resolve(request.result);
			request.onerror = () => reject(request.error);
		});
	}

	private async getFileRecord(path: string): Promise<IFileMetadata | undefined> {
		const db = await this.openDB();
		return new Promise((resolve, reject) => {
			const transaction = db.transaction(this.storeName, 'readonly');
			const store = transaction.objectStore(this.storeName);
			const request = store.get(path);
			request.onsuccess = () => resolve(request.result);
			request.onerror = () => reject(request.error);
		});
	}

	async createFileRecord(path: string, size: number, thumbnailPath: string, compressedPath): Promise<void> {
		if(await this.exists(path)){
			console.log(`Warning: File already exists at path: ${path}.`);
			await this.deleteFile(path);
		}
		
		const db = await this.openDB();
		// console.log(path);
		return new Promise((resolve, reject) => {
			const transaction = db.transaction(this.storeName, 'readwrite');
			const store = transaction.objectStore(this.storeName);
			const directory: IFileMetadata = {
				name: path.split("/").pop() || "",
				path: path,
				size: size,
				lastModified: new Date(),
				isDirectory: false,
				thumbnailPath,
				compressedPath
			};
			const request = store.add(directory);
			request.onsuccess = () => resolve();
			request.onerror = () => reject(request.error);
		});
	}
	async createDirectory(path: string): Promise<void> {
		const db = await this.openDB();
		return new Promise((resolve, reject) => {
			const transaction = db.transaction(this.storeName, 'readwrite');
			const store = transaction.objectStore(this.storeName);
			const directory: IFileMetadata = {
				name: path.split('/').pop() || '',
				path,
				size: 0,
				lastModified: new Date(),
				isDirectory: true,
				thumbnailPath: null
			};
			const request = store.add(directory);
			request.onsuccess = () => resolve();
			request.onerror = () => reject(request.error);
		});
	}

	async deleteDirectory(path: string): Promise<void> {
		const db = await this.openDB();
		return new Promise((resolve, reject) => {
			const transaction = db.transaction(this.storeName, 'readwrite');
			const store = transaction.objectStore(this.storeName);
			const request = store.delete(path);
			request.onsuccess = () => resolve();
			request.onerror = () => reject(request.error);
		});
	}

	async listDirectory(path: string): Promise<IFileMetadata[]> {
		if(!path.endsWith('/')) {
			path += '/'; // Ensure path ends with a slash
		}
		const db = await this.openDB();
		return new Promise((resolve, reject) => {
			const transaction = db.transaction(this.storeName, 'readonly');
			const store = transaction.objectStore(this.storeName);
			const request = store.openCursor();
			const results: IFileMetadata[] = [];
			request.onsuccess = (event) => {
				const cursor = event.target["result"];
				if (cursor) {
					const file = cursor.value as IFileMetadata;
					// Check if the file is an immediate child of the specified path
					// console.log("cursor", file.path, path); // debugging
					if (
						file.path.startsWith(path) &&
						file.path.split('/').length === path.split('/').length
					) {
						results.push(file);
					}
					cursor.continue();
				} else {
					resolve(results);
				}
			};
			request.onerror = () => reject(request.error);
		});
	}


	async getMetadata(path: string): Promise<IFileMetadata> {
		const file = await this.getFileRecord(path);
		if (!file) {
			throw new Error(`File or directory not found: ${path}`);
		}
		return file;
	}

	async exists(path: string): Promise<boolean> {
		const file = await this.getFileRecord(path);
		return file !== undefined;
	}

	async rename(oldPath: string, newPath: string): Promise<void> {
		const db = await this.openDB();
		return new Promise(async (resolve, reject) => {
			const file = await this.getFileRecord(oldPath);
			if (!file) {
				return reject(new Error(`File or directory not found: ${oldPath}`));
			}
			const transaction = db.transaction(this.storeName, 'readwrite');
			const store = transaction.objectStore(this.storeName);
			file.path = newPath;
			const deleteRequest = store.delete(oldPath);
			deleteRequest.onsuccess = () => {
				const addRequest = store.add(file);
				addRequest.onsuccess = () => resolve();
				addRequest.onerror = () => reject(addRequest.error);
			};
			deleteRequest.onerror = () => reject(deleteRequest.error);
		});
	}

	async wipeDb(){
		const db = await this.openDB();
		return new Promise<void>((resolve, reject) => {
			const transaction = db.transaction(this.storeName, 'readwrite');
			const store = transaction.objectStore(this.storeName);
			const request = store.clear();
			request.onsuccess = () => resolve();
			request.onerror = () => reject(request.error);
		});
	}
}

export default IndexedDbFilesystem;