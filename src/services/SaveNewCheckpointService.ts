/* eslint-disable camelcase */
/* eslint-disable radix */
import { keyStoreConstants } from '../utils/appConstants';
import { ICheckpoint, ICheckpoints } from '../@types';

import { IStorageProvider } from '../providers/StorageProvider';

import ListCheckpointsService from './ListCheckpointsService';
import CheckReliabityOfCheckpointsService from './CheckReliabityOfCheckpointsService';
import DiffMinutesWorkedAtDayService from './DiffMinutesWorkedAtDayService';
import FormatMinutesToHoursServices from './FormatMinutesToHoursServices';

interface IExecuteDTO {
  type: string;
  date: string;
  time: string;
  startsAt: string;
  endsAt: string;
}

interface IExecuteResponse {
  checkpoints: ICheckpoint[];
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
    const currentCheckpoints: ICheckpoints | null = this.storageProvider.get({
      key: keyStoreConstants.CHECKPOINTS,
    });

    let newCheckpoints = {};
    if (!currentCheckpoints) {
      const dateKeyString = `${date}T03:00:00.000Z`;
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
            hours_overworked: '0h',
            minutes_overworked: 0,
            reliable: false,
          },
        },
      };
    } else {
      const dateKeyString = `${date}T03:00:00.000Z`;
      const hasCheckpoint = currentCheckpoints[dateKeyString];
      if (hasCheckpoint) {
        const currentCheckpoint = hasCheckpoint;
        currentCheckpoint.points.push({
          type,
          hour: time,
        });

        const checkReliabityOfCheckpointsService = new CheckReliabityOfCheckpointsService();
        const isCheckpointsRealiable = checkReliabityOfCheckpointsService.execute(
          { checkpoints: currentCheckpoint.points },
        );
        if (isCheckpointsRealiable) {
          const diffMinutesWorkedAtDayService = new DiffMinutesWorkedAtDayService();
          const {
            amount_diff_worked_in_minutes: amountDiffWorkedInMinutes,
          } = diffMinutesWorkedAtDayService.execute({
            checkpoints: currentCheckpoint.points,
            date: dateKeyString,
          });

          const formatMinutesToHoursServices = new FormatMinutesToHoursServices();
          const {
            hours_overworked: hoursOverworked,
          } = formatMinutesToHoursServices.execute({
            minutes: amountDiffWorkedInMinutes,
          });
          currentCheckpoint.resume.minutes_overworked = amountDiffWorkedInMinutes;
          currentCheckpoint.resume.hours_overworked = hoursOverworked;
          currentCheckpoint.resume.reliable = isCheckpointsRealiable;
        } else {
          currentCheckpoint.resume.reliable = isCheckpointsRealiable;
          currentCheckpoint.resume.minutes_overworked = 0;
          currentCheckpoint.resume.hours_overworked = '0h';
        }
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
              hours_overworked: '0h',
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
