/* eslint-disable @typescript-eslint/no-explicit-any */
import { IStorageProvider } from '../StorageProvider';

interface IStoreDTO {
  key: string;
  value: any;
}

interface IGetDTO {
  key: string;
}

interface IRemoveDTO {
  key: string;
}

export default class StorageProvider implements IStorageProvider {
  private storage;

  constructor() {
    this.storage = localStorage;
  }

  store({ key, value }: IStoreDTO): any {
    const jsonStringValue = JSON.stringify(value);
    this.storage.setItem(key, jsonStringValue);
    return value;
  }

  get({ key }: IGetDTO): any {
    const jsonStringValue = this.storage.getItem(key);
    let storageValue = null;
    if (jsonStringValue) {
      storageValue = JSON.parse(jsonStringValue);
    }
    return storageValue;
  }

  remove({ key }: IRemoveDTO): boolean {
    this.storage.removeItem(key);
    return true;
  }
}
