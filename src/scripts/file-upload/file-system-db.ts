import { LocalDb } from "../local-db";


export default class FileSystemDb extends LocalDb {
	constructor(){
		super("FileSystemDb", 1);
	}

	createDb(): void {

		if (!this.db.objectStoreNames.contains("s3File")) {
			this.db.createObjectStore("s3File", { keyPath: "id" });
		}

		if (!this.db.objectStoreNames.contains("directory")) {
			this.db.createObjectStore("directory", { keyPath: "id" });
		}
	}
}