import { LocalDb } from "../local-db";


export default class FileUploadCache extends LocalDb {
	constructor(){
		super("FileUploadCache", 1);
	}

	createDb(): void {
		if (!this.db.objectStoreNames.contains("files")) {
			this.db.createObjectStore("files", { keyPath: "id" });
		}
	}
}