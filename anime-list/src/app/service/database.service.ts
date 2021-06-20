import { Injectable } from '@angular/core';

import { Capacitor } from '@capacitor/core';
import { CapacitorDataStorageSqlite } from 'capacitor-data-storage-sqlite';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  store: any;
  isService = false;
  platform: string;
  constructor() {
  }
  /**
   * Plugin Initialization
   */
  async init(): Promise<void> {
    this.platform = Capacitor.getPlatform();
    this.store = CapacitorDataStorageSqlite;
    this.isService = true;
  }
  /**
   * Open a Store
   *
   * @param _dbName string optional
   * @param _table string optional
   * @param _encrypted boolean optional
   * @param _mode string optional
   */
  async openStore(_dbName?: string,_table?: string,_encrypted?: boolean,_mode?: string): Promise<void> {
    if(this.isService && this.store != null) {
      const database: string = _dbName ? _dbName : 'storage';
      const table: string = _table ? _table : 'storage_table';
      const encrypted: boolean = _encrypted ? _encrypted : false;
      const mode: string = _mode ? _mode : 'no-encryption';
      try {
        await this.store.openStore({database,table,encrypted,mode});
        return Promise.resolve();
      } catch (err) {
        return Promise.reject(err);
      }
    } else {
      return Promise.reject(new Error('openStore: Store not opened'));
    }
  }
  /**
   * Close a store
   *
   * @param dbName
   * @returns
   */
  async closeStore(dbName: string): Promise<void> {
    if(this.isService && this.store != null) {
      try {
        await this.store.closeStore({database:dbName});
        return Promise.resolve();
      } catch (err) {
        return Promise.reject(err);
      }
    } else {
      return Promise.reject(new Error('close: Store not opened'));
    }
  }
  /**
   * Create/Set a Table
   *
   * @param table string
   */
  async setTable(table: string): Promise<void> {
    if(this.isService && this.store != null) {
      try {
        await this.store.setTable({table});
        return Promise.resolve();
      } catch (err) {
        return Promise.reject(err);
      }
    } else {
      return Promise.reject(new Error('setTable: Store not opened'));
    }
  }
  /**
   * Set of Key
   *
   * @param key string
   * @param value string
   */
  async setItem(key: string,value: string): Promise<void> {
    if(this.isService && this.store != null) {
      if(key.length > 0) {
        try {
          await this.store.set({ key, value });
          return Promise.resolve();
        } catch (err) {
          return Promise.reject(err);
        }
      } else {
        return Promise.reject(new Error('setItem: Must give a key'));
      }
    } else {
      return Promise.reject(new Error('setItem: Store not opened'));
    }
  }
  /**
   * Get the Value for a given Key
   *
   * @param key string
   */
  async getItem(key: string): Promise<string> {
    if(this.isService && this.store != null) {
      if(key.length > 0) {
        try {
          const {value} = await this.store.get({ key });
          return Promise.resolve(value);
        } catch (err) {
          return Promise.reject(err);
        }
      } else {
        return Promise.reject(new Error('getItem: Must give a key'));
      }
    } else {
      return Promise.reject(new Error('getItem: Store not opened'));
    }

  }
  async getAllValues(): Promise<Array<string>> {
    if(this.isService && this.store != null) {
      try {
        const {values} = await this.store.values();
        return Promise.resolve(values);
      } catch (err) {
        return Promise.reject(err);
      }
    } else {
      return Promise.reject(new Error('getAllValues: Store not opened'));
    }
  }

  async removeItem(key: string): Promise<void> {
    if(this.isService && this.store != null) {
      if(key.length > 0) {
        try {
          await this.store.remove({ key });
          return Promise.resolve();
        } catch (err) {
          return Promise.reject(err);
        }
      } else {
        return Promise.reject(new Error('removeItem: Must give a key'));
      }
    } else {
      return Promise.reject(new Error('removeItem: Store not opened'));
    }
  }

  async clear(): Promise<void> {
    if(this.isService && this.store != null) {
      try {
        await this.store.clear();
        return Promise.resolve();
      } catch (err) {
        return Promise.reject(err.message);
      }
    } else {
      return Promise.reject(new Error('clear: Store not opened'));
    }
  }

  async deleteStore(_dbName?: string): Promise<void> {
    const database: string = _dbName ? _dbName : 'storage';
    await this.init();
    if(this.isService && this.store != null) {
      try {
        await this.store.deleteStore({database});
        return Promise.resolve();
      } catch (err) {
        return Promise.reject(err.message);
      }
    } else {
      return Promise.reject(new Error('deleteStore: Store not opened'));
    }
  }
  async getAllTables(): Promise<Array<string>> {
    if(this.isService && this.store != null) {
      try {
        const {tables} = await this.store.tables();
        return Promise.resolve(tables);
      } catch (err) {
        return Promise.reject(err);
      }
    } else {
      return Promise.reject(new Error('getAllTables: Store not opened'));
    }
  }
  async deleteTable(table?: string): Promise<void> {
    if(this.isService && this.store != null) {
      if(table.length > 0) {
        try {
          await this.store.deleteTable({table});
          return Promise.resolve();
        } catch (err) {
          return Promise.reject(err);
        }
      } else {
        return Promise.reject(new Error('deleteTable: Must give a table'));
      }
    } else {
      return Promise.reject(new Error('deleteTable: Store not opened'));
    }
  }

  async isStoreOpen(_dbName?: string): Promise<boolean>{
    const {tables} = await this.store.tables();
    for(let i = 0 ; i < tables.length; i++) {
      if(tables[i].database === _dbName) {
        return tables[i].database.isOpen;
      }
    }
    return false;
  }
}
