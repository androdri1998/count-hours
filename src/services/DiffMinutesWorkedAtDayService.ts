/* eslint-disable camelcase */
/* eslint-disable radix */
import { IPoint } from '../@types';
import AmountMinutesRequiredToDayWorkService from './AmountMinutesRequiredToDayWorkService';
import SumDiffBetweenHoursService from './SumDiffBetweenHoursService';

interface IExecuteDTO {
  checkpoints: IPoint[];
  date: string;
}

interface IExecuteResponse {
  date: string;
  amount_diff_worked_in_minutes: number;
}

export default class DiffMinutesWorkedAtDayService {
  execute({ checkpoints = [], date }: IExecuteDTO): IExecuteResponse {
    let amountDiffWorkedInMinutes = 0;
    const amountMinutesRequiredToDayWorkService = new AmountMinutesRequiredToDayWorkService();
    const sumDiffBetweenHoursService = new SumDiffBetweenHoursService();
    const minutesRequiredOfWork = amountMinutesRequiredToDayWorkService.execute(
      { date },
    );
    const workedMinutes = sumDiffBetweenHoursService.execute({ checkpoints });

    amountDiffWorkedInMinutes = workedMinutes - minutesRequiredOfWork;

    return { date, amount_diff_worked_in_minutes: amountDiffWorkedInMinutes };
  }
}
