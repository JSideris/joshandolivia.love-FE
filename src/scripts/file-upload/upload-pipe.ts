/* I present the most overengineered file upload system ever. */

import * as uuid from "uuid";
import FileUploadCache from "./file-upload-cache";
import generateThumbnails from "./generate-thumbnails";
import { LocalDb } from "../local-db";

export const DB_OBJECT_NAME = "files";

const GET_PRESIGNED_UPLOAD_URL = "https://2fiucgicl8.execute-api.us-east-2.amazonaws.com/get-s3-link";
const REGISTER_UPLOAD_URL = "https://2fiucgicl8.execute-api.us-east-2.amazonaws.com/register-upload";

type FileRecord = {
	id: string;
	userId: string;

	name: string;
	path: string; // Local path in the local fs.
	
	file: File;
	thumbnail: Blob;
	compressed: Blob;
	localThumbnailUrl: string;
	
	error: boolean;
	
	// S3
	isUploaded: boolean;
	presignedUploadUri: string;
	presignedThumbnailUploadUri: string;
	presignedCompressedUploadUri: string;
};

function sleep(ms){
	return new Promise((resolve) => {
		setTimeout(resolve, ms);
	});
}

// TODO: this utility would benefit from the user of service workers.

// TODO: put into a util.
function getRenamedFileFromPath(filePath) {
	// Remove leading slashes
	const cleanedPath = filePath.replace(/^[/\\]+/, "");

	// Replace spaces, forward slashes, and backslashes with underscores
	const newName = cleanedPath.replace(/[\s/\\]+/g, "_");

	return newName;
}

async function uploadToS3(presignedUrl, fileBlob, fileName) {
	// return;
	// try {
		const contentType = fileBlob.type;
		const response = await fetch(presignedUrl, {
			method: "PUT",
			body: fileBlob,
			headers: {
				"Content-Type": contentType,
			},
		});

		if (!response.ok) {
			console.error(
				`Failed to upload file ${fileName}. HTTP status: ${response.status}`,
			);
		}
	// } catch (error) {
	// 	console.error(`Error uploading file ${fileName}:`, error);
	// }
}

abstract class UploadPipeNode<TIn, TOut>{
	
	abstract process(data: TIn): Promise<TOut>;
}

type RegisterFileParams = {
	file: File,
	path: string,
}

// class RegisterFilePipeNode extends UploadPipeNode<{userId: string, inputFiles: RegisterFileParams[]}, FileRecord[]>{
// 	async process(data: {userId: string, inputFiles: RegisterFileParams[]}): Promise<FileRecord[]>{
// 		let {userId: userId, inputFiles} = data;
// 		let retries = 0;
// 		do{
// 			try{
// 				let records: FileRecord[] = inputFiles.map(data => {
// 					return {
// 						id: null,
// 						userId: userId,
// 						file: data.file,
// 						thumbnail: null,
// 						compressed: null,
// 						name: data.file.name,
// 						path: data.path.substring(1),
// 						isUploaded: false,
// 						error: false,

// 						localThumbnailUrl: null,
// 						presignedUploadUri: null,
// 						presignedThumbnailUploadUri: null,
// 						presignedCompressedUploadUri: null,
// 					}
// 				});

// 				const response = await fetch(REGISTER_UPLOAD_URL, {
// 					method: "POST",
// 					body: JSON.stringify({
// 						guestId: userId,
// 						files: records.map(record => {
// 							return {
// 								// TODO: if we have the relative path in the future, we could create a directory structure.
// 								// We may be able to get this from file["path"].
// 								name: getRenamedFileFromPath(record.name),
// 								path: getRenamedFileFromPath(record.path.split("/").join("????SEPARATOR????")).split("????SEPARATOR????").join("/"),
// 								hasThumbnail: false,
// 							}
// 						})
// 					}),
// 				});
		
// 				let responseData = await response.json();

// 				if(!responseData.records) throw new Error("No records returned from server.");

// 				// console.log("records", responseData);
// 				for(let i = 0; i < responseData.records.length; i++){
// 					// console.log("Setting ID to", responseData.records[i].id);
// 					records[i].id = responseData.records[i].id;
// 				}

// 				return records;
// 			}
// 			catch(e){
// 				console.warn(e);
// 				await sleep(Math.min(2500, ( 1 + retries * retries ) * 100));
// 				retries++;
// 			}
// 		// } while(retries < 5);
// 		} while(true);
		
// 		return [];
// 	}
// }

// Caches the file in indexed DB.
export class IndexedDbWriterPipeNode extends UploadPipeNode<FileRecord, boolean>{
	db: LocalDb;

	constructor(db: LocalDb){
		super();
		this.db = db;
	}

	async process(data: FileRecord): Promise<boolean>{
		let retries = 0;
		do{
			try{
				await this.db.createRecord(DB_OBJECT_NAME, data);
				return true;
			}
			catch(e){
				console.warn(e);
				await sleep(Math.min(2500, ( 1 + retries * retries ) * 100));
				retries++;
			}
		} while(retries < 5 || (Date.now() - this.db.lastUpdate) < 10000);
		
		return false;
	}
}

// Reads a file from indexed DB.
export class IndexedDbReaderPipeNode extends UploadPipeNode<string, FileRecord>{
	db: LocalDb;

	constructor(db: LocalDb){
		super();
		this.db = db;
	}

	async process(id: string): Promise<FileRecord>{
		return await this.db.getRecord(DB_OBJECT_NAME, id) as FileRecord;
	}
}

// Generates a thumbnail and grabs metadata.
export class GenerateThumbnailPipeNode extends UploadPipeNode<FileRecord, FileRecord>{
	async process(data: FileRecord): Promise<FileRecord>{
		let atlas = await generateThumbnails(data.file);
		console.log(atlas);
		if(!atlas.errors?.length){
			let url = (URL.createObjectURL(atlas.thumbnail.blob)) ?? null;
			if(data.localThumbnailUrl) URL.revokeObjectURL(data.localThumbnailUrl);
			data.localThumbnailUrl = url;
			data.thumbnail = atlas.thumbnail?.blob;
			data.compressed = atlas.compressed?.blob;
		}
		return data;
	}
}

// Gets presigned upload URIs for S3.
export class GetUploadUrisPipeNode extends UploadPipeNode<FileRecord, FileRecord>{
	async process(record: FileRecord): Promise<FileRecord>{
		let retries = 0;
		do{
			try{
				const response = await fetch(GET_PRESIGNED_UPLOAD_URL, {
					method: "POST",
					body: JSON.stringify({
						guestId: record.userId,
						path: `${record.path}${record.name}`,
						getCompressedUrl: !!record.compressed,
						getThumbnailUrl: !!record.thumbnail,
					}),
				});

				let responseData = await response.json();

				record.presignedUploadUri = responseData.uploadUrl;
				record.presignedThumbnailUploadUri = responseData.thumbnailUrl;
				record.presignedCompressedUploadUri = responseData.compressedUrl;

				return record;
			}
			catch(e){
				console.warn(e);
				await sleep(Math.min(2500, ( 1 + retries * retries ) * 100));
				retries++;
			}
		} while(retries < 5);
		
		return null;
	}
}

type FileUploadData = {
	presignedUri: string;
	fileData: Blob;
	fileName: string;
};

// Uploads the file to S3.
export class UploadFilePipeNode extends UploadPipeNode<FileUploadData, boolean>{
	async process(data: FileUploadData): Promise<boolean>{
		let retries = 0;

		if(!data?.presignedUri){
			console.error("No presigned URI provided.");
			return false;
		}

		do{
			

			try{
				await uploadToS3(data.presignedUri, data.fileData, data.fileName);
				// data.isUploaded = true;
				return true;
			}
			catch(e){
				console.warn(e);
				await sleep(Math.min(2500, ( 1 + retries * retries ) * 100));
				retries++;
			}
		// } while(retries < 5);
		} while(true);
		
		return false;
	}
}

// Deletes a processed file from IndexedDB. 
export class IndexedDbDeleterPipeNode extends UploadPipeNode<string, void>{
	db: LocalDb;

	constructor(db: LocalDb){
		super();
		this.db = db;
	}

	async process(id: string): Promise<void>{
		await this.db.deleteRecord(DB_OBJECT_NAME, id);
	}
}

type ProgressCallback = (progress: {
	total: number,
	cached: number,
	complete: number,
	errors: number,
	newFiles: FileRecord[]
}) => void;

export class UploadPipe{
	db: LocalDb;
	// registerFileNode: RegisterFilePipeNode;
	dbWriterNode: IndexedDbWriterPipeNode;
	dbReaderNode: IndexedDbReaderPipeNode;
	thumbnailNode: GenerateThumbnailPipeNode;
	getUploadUrisNode: GetUploadUrisPipeNode;
	uploadNode: UploadFilePipeNode;
	dbDeleterNode: IndexedDbDeleterPipeNode;
	
	total: number = 0;
	cached: number = 0;
	complete: number = 0;
	errors: number = 0;

	updateCb: ProgressCallback;

	constructor(){
		this.db = new FileUploadCache();
		// this.registerFileNode = new RegisterFilePipeNode();
		this.dbWriterNode = new IndexedDbWriterPipeNode(this.db);
		this.dbReaderNode = new IndexedDbReaderPipeNode(this.db);
		this.thumbnailNode = new GenerateThumbnailPipeNode();
		this.getUploadUrisNode = new GetUploadUrisPipeNode();
		this.uploadNode = new UploadFilePipeNode();
		this.dbDeleterNode = new IndexedDbDeleterPipeNode(this.db);

	}
	
	setProgressHandler(updateCb: ProgressCallback){
		this.updateCb = updateCb;
	}
	
	async initialize(){

		try{
			await this.db.open();
			
			// Don't await it. This will happen asyncronously.
			this.recover();
		}
		catch(e){
			console.error("Failed to open database.", e);
			// Technically we don't need the db. It's just for caching and recovery.
		}
	}

	private async processFile(record: FileRecord): Promise<void>{

		
		// Generate a thumbnail and grab metadata.
		await this.thumbnailNode.process(record);

		// This will update thumbs:
		this.updateProgress();

		// Get the upload URIs.
		await this.getUploadUrisNode.process(record);

		// Upload the file to S3.
		record.isUploaded = await this.uploadNode.process({
			fileData: record.file,
			fileName: record.name, // TODO: these may not be correct.
			presignedUri: record.presignedUploadUri
		});

		// Upload the thumbnail to S3.
		if(record.isUploaded){
			// This is technically optional.
			// Nothing bad will happen if we don't have it.
			
			if(record.compressed){
				await this.uploadNode.process({
					fileData: record.compressed,
					fileName: record.name, 
					presignedUri: record.presignedCompressedUploadUri
				});
			}
			if(record.thumbnail){
				await this.uploadNode.process({
					fileData: record.thumbnail,
					fileName: record.name, 
					presignedUri: record.presignedThumbnailUploadUri
				});
			}
		}

		record.isUploaded = true;

		// Delete the file from the cache.
		await this.dbDeleterNode.process(record.id);

		this.complete++;

		// this.updateProgress([record]);
		this.updateProgress([record]);
	}

	async processBatch(data: {
		files: Array<{
			path: string,
			file: File
		}>,
		userId: string
	}){

		this.total += data.files.length;

		// Register the files with the webapp db.
		// let records = await this.registerFileNode.process(
		// 	{
		// 		userId: data.userId,
		// 		inputFiles: data.files
		// 	}
		// );

		this.updateProgress();

		let batch = data.files.map(async (datum) => {
			let record = {
				id: uuid.v4(),
				userId: data.userId,
				file: datum.file,
				thumbnail: null,
				compressed: null,
				name: datum.file.name,
				path: datum.path.substring(1),
				isUploaded: false,
				error: false,

				localThumbnailUrl: null,
				presignedUploadUri: null,
				presignedThumbnailUploadUri: null,
				presignedCompressedUploadUri: null,
			}
			
			// Register the file.
			await this.dbWriterNode.process(record);
			this.cached++;
			this.updateProgress();
			
			// Process and upload the file.
			await this.processFile(record);
			
		});

		await Promise.all(batch);

		if(this.total == this.complete){
			this.resetTally();
		}
	}

	private async recover(){

		let records = await this.db.getAllRecords(DB_OBJECT_NAME) as FileRecord[];

		this.cached += records.length;
		this.total += records.length;

		this.updateProgress(records);

		let batch = records.map(async (record) => {
			
			// Get the recovered record.
			record = await this.dbReaderNode.process(record.id);
			
			if(record){
				// Process and upload the file.
				await this.processFile(record);
			}
			else{
				console.log("Warning: a cached file was missing from the cache. This may indicate that multiple uploaders are running simutaneously.");
			}
			
		});

		await Promise.all(batch);

		if(this.total == this.complete){
			this.resetTally();
		}
	}

	resetTally(){
		this.total = 0;
		this.complete = 0;
		this.cached = 0;
		this.errors = 0;
	}

	updateProgress(newFiles: FileRecord[] = []){
		this.updateCb({
			total: this.total,
			complete: this.complete,
			cached: this.cached,
			errors: this.errors,
			newFiles: newFiles
		});
	}
}