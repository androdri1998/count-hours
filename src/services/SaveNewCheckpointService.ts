/* eslint-disable camelcase */
/* eslint-disable radix */
import { keyStoreConstants } from '../utils/appConstants';
import { Checkpoint, Checkpoints } from '../@types';
import { IStorageProvider } from '../providers/StorageProvider';
import ListCheckpointsService from './ListCheckpointsService';

interface IExecuteDTO {
  type: string;
  date: string;
  time: string;
  startsAt: string;
  endsAt: string;
}

interface IExecuteResponse {
  checkpoints: Checkpoint[];
}

export default class SaveNewCheckpointService {
  storageProvider: IStorageProvider;

  constructor(storageProvider: IStorageProvider) {
    this.storageProvider = storageProvider;
  }

  execute({
    type,
    time,
    date,
    startsAt,
    endsAt,
  }: IExecuteDTO): IExecuteResponse {
    const currentCheckpoints: Checkpoints | null = this.storageProvider.get({
      key: keyStoreConstants.CHECKPOINTS,
    });

    let newCheckpoints = {};
    if (!currentCheckpoints) {
      const dateKeyString = `${date}T00:00:00.000Z`;
      newCheckpoints = {
        [dateKeyString]: {
          date: dateKeyString,
          points: [
            {
              type,
              hour: time,
            },
          ],
          resume: {
            hours_overworked: '00h:00min',
            minutes_overworked: 0,
            reliable: false,
          },
        },
      };
    } else {
      const dateKeyString = `${date}T00:00:00.000Z`;
      const hasCheckpoint = currentCheckpoints[dateKeyString];
      if (hasCheckpoint) {
        const currentCheckpoint = hasCheckpoint;
        currentCheckpoint.points.push({
          type,
          hour: time,
        });
        const newCheckpoint = {
          [dateKeyString]: currentCheckpoint,
        };
        newCheckpoints = Object.assign(currentCheckpoints, newCheckpoint);
      } else {
        const newCheckpoint = {
          [dateKeyString]: {
            date: dateKeyString,
            points: [
              {
                type,
                hour: time,
              },
            ],
            resume: {
              hours_overworked: '00h:00min',
              minutes_overworked: 0,
              reliable: false,
            },
          },
        };
        newCheckpoints = Object.assign(currentCheckpoints, newCheckpoint);
      }
    }

    this.storageProvider.store({
      key: keyStoreConstants.CHECKPOINTS,
      value: newCheckpoints,
    });

    const listCheckpointsService = new ListCheckpointsService(
      this.storageProvider,
    );
    const { checkpoints } = listCheckpointsService.execute({
      startsAt,
      endsAt,
    });

    return { checkpoints };
  }
}
