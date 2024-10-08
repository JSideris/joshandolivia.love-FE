
/** 
 * An wrapper for indexed DB. Instantiate as many as you want.
*/
export abstract class LocalDb{
	db: IDBDatabase;
	name: string;
	lastUpdate: number;
	version: number;

	constructor(name: string, version: number){
		this.name = name;
		this.version = version;
	}

	abstract createDb(): void;

	// Call this once.
	async open(){
		if(this.db) throw new Error("Database already open.");

		return new Promise<void>((resolve, reject) => {

			const openRequest = window.indexedDB.open(this.name, this.version);
			
			openRequest.onsuccess = (e) => {
				// console.log("DB Opened.");
				this.db = e.target["result"];
				resolve();
			};

			openRequest.onupgradeneeded = (e) => {
				this.db = e.target["result"];
				this.createDb();
			};
			
			openRequest.onerror = (e) => {
				console.error('Error opening database:', e.target["errorCode"]);
				reject(e.target["errorCode"]);
			};
		});
	}

	// Don't call this.
	async close(){
		if(this.db) {
			this.db.close();
			this.db = null;
		}
	}

	async createRecord(tableName: string, record) {
		if(!this.db) throw new Error("Database not open.");

		return new Promise<void>((resolve, reject) => {

			const transaction = this.db.transaction(tableName, "readwrite");
			const store = transaction.objectStore(tableName);
			const request = store.add(record);
			
			request.onsuccess = () => {
				// console.log(request.result);
				this.lastUpdate = Date.now();
				resolve();
			};
			
			request.onerror = function(e) {
				reject(e.target && e.target["error"]);
			};
		});
	}

	async getRecord(tableName: string, id: string) {
		if(!this.db) throw new Error("Database not open.");
		return new Promise((resolve, reject) => {
			const transaction = this.db.transaction(tableName, "readonly");
			const store = transaction.objectStore(tableName);
			const request = store.get(id);
		
			request.onsuccess = function() {
				if (request.result) {
					// console.log('Retrieved record:', request.result);
					resolve(request.result);
				} else {
					console.warn('No record found with the ID', id);
					resolve(null);
				}
			};
		
			request.onerror = function(e) {
				reject(e.target && e.target["error"]);
			};
		});
	}
	
	async getAllKeys(tableName: string): Promise<Array<string>> {
		if(!this.db) throw new Error("Database not open.");

		return new Promise((resolve, reject) => {
			const transaction = this.db.transaction(tableName, "readonly");
			const store = transaction.objectStore(tableName);
			const request = store.getAllKeys();
		
			request.onsuccess = function() {
				if (request.result) {
					resolve(request.result as Array<string>);
				} else {
					console.warn(`Keys for ${tableName} not found.`);
					resolve([]);
				}
			};
		
			request.onerror = function(e) {
				reject(e.target && e.target["error"]);
			};
		});
	}
	
	async getAllRecords(tableName: string): Promise<Array<any>> {
		if(!this.db) throw new Error("Database not open.");

		return new Promise((resolve, reject) => {
			const transaction = this.db.transaction(tableName, "readonly");
			const store = transaction.objectStore(tableName);
			const request = store.getAll();
		
			request.onsuccess = function() {
				if (request.result) {
					resolve(request.result as Array<string>);
				} else {
					console.warn(`Keys for ${tableName} not found.`);
					resolve([]);
				}
			};
		
			request.onerror = function(e) {
				reject(e.target && e.target["error"]);
			};
		});
	}

	async deleteRecord(tableName: string, id: string) {
		if(!this.db) throw new Error("Database not open.");

		return new Promise<void>((resolve, reject) => {
			const transaction = this.db.transaction(tableName, "readwrite");
			const store = transaction.objectStore(tableName);
			const request = store.delete(id);
		
			request.onsuccess = function() {
				resolve();
			};
		
			request.onerror = function(e) {
				reject(e.target && e.target["error"]);
			};
		});
	}
}