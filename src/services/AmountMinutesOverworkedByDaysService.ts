/* eslint-disable camelcase */
/* eslint-disable radix */
import { Checkpoints } from '../@types';
import CheckReliabityOfCheckpointsService from './CheckReliabityOfCheckpointsService';
import DiffMinutesWorkedAtDayService from './DiffMinutesWorkedAtDayService';

interface IExecuteDTO {
  checkpoints: Checkpoints;
}

interface ICheckpointNoReliable {
  date: string;
}

interface IExecuteResponse {
  amount_overworked_minutes: number;
  hours_overworked: string;
  checkpoint_no_reliable: ICheckpointNoReliable[];
}

export default class AmountMinutesOverworkedByDaysService {
  execute({ checkpoints }: IExecuteDTO): IExecuteResponse {
    let amountOverworkedMinutes = 0;
    const checkpointNoReliable: ICheckpointNoReliable[] = [];

    const checkReliabityOfCheckpointsService = new CheckReliabityOfCheckpointsService();
    const diffMinutesWorkedAtDayService = new DiffMinutesWorkedAtDayService();
    Object.keys(checkpoints).forEach((date: string) => {
      const isCheckpointsRealiable = checkReliabityOfCheckpointsService.execute(
        {
          checkpoints: checkpoints[date].points,
        },
      );

      if (isCheckpointsRealiable) {
        const {
          amount_diff_worked_in_minutes: amountDiffWorkedInMinutes,
        } = diffMinutesWorkedAtDayService.execute({
          checkpoints: checkpoints[date].points,
          date,
        });

        amountOverworkedMinutes += amountDiffWorkedInMinutes;
      } else {
        checkpointNoReliable.push({
          date,
        });
      }
    });

    const AMOUNT_MINUTES_IN_1_HOUR = 60;
    const hoursFloat = amountOverworkedMinutes / AMOUNT_MINUTES_IN_1_HOUR;
    const minutesRemais = amountOverworkedMinutes % AMOUNT_MINUTES_IN_1_HOUR;
    const hoursOverworked = parseInt(hoursFloat.toString());
    const hoursOverWorkedString = `${
      hoursOverworked < 10 ? `0${hoursOverworked}` : hoursOverworked
    }h:${minutesRemais}min`;

    return {
      amount_overworked_minutes: amountOverworkedMinutes,
      hours_overworked: hoursOverWorkedString,
      checkpoint_no_reliable: checkpointNoReliable,
    };
  }
}
