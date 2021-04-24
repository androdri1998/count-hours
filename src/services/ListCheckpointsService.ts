/* eslint-disable camelcase */
/* eslint-disable radix */
import { keyStoreConstants } from '../utils/appConstants';
import { ICheckpoints, ICheckpoint } from '../@types';
import { IStorageProvider } from '../providers/StorageProvider';

interface IExecuteDTO {
  startsAt: string;
  endsAt: string;
}

interface IExecuteResponse {
  checkpoints: ICheckpoint[];
}

export default class ListCheckpointsService {
  storageProvider: IStorageProvider;

  constructor(storageProvider: IStorageProvider) {
    this.storageProvider = storageProvider;
  }

  execute({ startsAt, endsAt }: IExecuteDTO): IExecuteResponse {
    const currentCheckpoints: ICheckpoints | null = this.storageProvider.get({
      key: keyStoreConstants.CHECKPOINTS,
    });

    const checkpointsFiltered: ICheckpoint[] = [];
    if (currentCheckpoints) {
      Object.keys(currentCheckpoints).forEach(date => {
        const currentDateIndex = date.split('T')[0];
        if (startsAt <= currentDateIndex && currentDateIndex <= endsAt) {
          checkpointsFiltered.push(currentCheckpoints[date]);
        }
      });
    }

    return { checkpoints: checkpointsFiltered };
  }
}
