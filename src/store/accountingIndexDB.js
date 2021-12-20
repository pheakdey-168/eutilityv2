const DB_NAME = 'accountingDB';
const DB_VERSION = 1;
let DB;

export default {

	async getDb() {
		return new Promise((resolve, reject) => {

			if(DB) { return resolve(DB); }
			window.console.log('OPENING DB', DB);
			let request = window.indexedDB.open(DB_NAME, DB_VERSION);
			
			request.onerror = e => {
				window.console.log('Error opening db', e);
				reject('Error');
			};
	
			request.onsuccess = e => {
				DB = e.target.result;
				resolve(DB);
			};
			
			request.onupgradeneeded = e => {
				window.console.log('onupgradeneeded');
				let db = e.target.result;
				db.createObjectStore("accounts", { autoIncrement: false, keyPath:'uuid' });
			};
		});
	},
	async deleteAccount(account) {

		let db = await this.getDb();

		return new Promise(resolve => {

			let trans = db.transaction(['accounts'],'readwrite');
			trans.oncomplete = () => {
				resolve();
			};

			let store = trans.objectStore('accounts');
			store.delete(account.uuid);
		});	
	},
	async getAccounts() {

		let db = await this.getDb();

		return new Promise(resolve => {

			let trans = db.transaction(['accounts'],'readonly');
			trans.oncomplete = () => {
				resolve(accounts);
			};
			
			let store = trans.objectStore('accounts');
			let accounts = [];
			
			store.openCursor().onsuccess = e => {
				let cursor = e.target.result;
				if (cursor) {
					accounts.push(cursor.value)
					cursor.continue();
				}
			};

		});
	},

	async saveAccount(account) {

		let db = await this.getDb();

		return new Promise(resolve => {

			let trans = db.transaction(['accounts'],'readwrite');
			trans.oncomplete = () => {
				resolve();
			};

			let store = trans.objectStore('accounts');
			store.put(account);

		});
	
	}

}

/* 
	More info:
	https://www.raymondcamden.com/2019/10/16/using-indexeddb-with-vuejs
*/