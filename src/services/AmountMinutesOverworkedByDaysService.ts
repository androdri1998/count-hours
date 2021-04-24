/* eslint-disable camelcase */
/* eslint-disable radix */
import { ICheckpoint } from '../@types';

import CheckReliabityOfCheckpointsService from './CheckReliabityOfCheckpointsService';
import DiffMinutesWorkedAtDayService from './DiffMinutesWorkedAtDayService';
import FormatMinutesToHoursServices from './FormatMinutesToHoursServices';

interface IExecuteDTO {
  checkpoints: ICheckpoint[];
}

interface ICheckpointsNoReliable {
  date: string;
}

interface IExecuteResponse {
  amount_overworked_minutes: number;
  hours_overworked: string;
  checkpoints_no_reliable: ICheckpointsNoReliable[];
}

export default class AmountMinutesOverworkedByDaysService {
  execute({ checkpoints }: IExecuteDTO): IExecuteResponse {
    let amountOverworkedMinutes = 0;
    const checkpointsNoReliable: ICheckpointsNoReliable[] = [];

    const checkReliabityOfCheckpointsService = new CheckReliabityOfCheckpointsService();
    const diffMinutesWorkedAtDayService = new DiffMinutesWorkedAtDayService();
    checkpoints.forEach((checkpoint: ICheckpoint) => {
      const isCheckpointsRealiable = checkReliabityOfCheckpointsService.execute(
        {
          checkpoints: checkpoint.points,
        },
      );

      if (isCheckpointsRealiable) {
        const {
          amount_diff_worked_in_minutes: amountDiffWorkedInMinutes,
        } = diffMinutesWorkedAtDayService.execute({
          checkpoints: checkpoint.points,
          date: checkpoint.date,
        });

        amountOverworkedMinutes += amountDiffWorkedInMinutes;
      } else {
        checkpointsNoReliable.push({
          date: checkpoint.date,
        });
      }
    });

    const formatMinutesToHoursServices = new FormatMinutesToHoursServices();
    const {
      hours_overworked: hoursOverworked,
    } = formatMinutesToHoursServices.execute({
      minutes: amountOverworkedMinutes,
    });

    return {
      amount_overworked_minutes: amountOverworkedMinutes,
      hours_overworked: hoursOverworked,
      checkpoints_no_reliable: checkpointsNoReliable,
    };
  }
}
