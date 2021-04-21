/* eslint-disable @typescript-eslint/no-explicit-any */
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

export interface IStorageProvider {
  store(params: IStoreDTO): any;
  get(params: IGetDTO): any;
  remove(params: IRemoveDTO): boolean;
}
