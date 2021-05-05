/* eslint-disable radix */
import { IPoint } from '../@types';
import DiffBetweenHoursService from './DiffBetweenHoursService';
import GetMinutesRestRemainsService from './GetMinutesRestRemainsService';

interface IExecuteDTO {
  checkpoints: IPoint[];
}

export default class SumDiffBetweenHoursService {
  execute({ checkpoints = [] }: IExecuteDTO): number {
    const sortedCheckpoits = checkpoints.sort((a, b) => {
      if (a.hour > b.hour) {
        return 1;
      }
      if (a.hour < b.hour) {
        return -1;
      }
      return 0;
    });

    const hoursToDiff = [];
    for (let index = 0; index < sortedCheckpoits.length; index += 2) {
      const inputIndex = index;
      const inputHour = sortedCheckpoits[inputIndex].hour;

      const exitIndex = index + 1;
      const exitHour = sortedCheckpoits[exitIndex].hour;

      hoursToDiff.push({ input: inputHour, exit: exitHour });
    }

    const diffBetweenHoursService = new DiffBetweenHoursService();
    let amountMinutes = 0;
    hoursToDiff.forEach(checkpoint => {
      const diffBetweenHours = diffBetweenHoursService.execute(checkpoint);
      amountMinutes += diffBetweenHours;
    });

    const getMinutesRestRemainsService = new GetMinutesRestRemainsService();
    const minutesRestRemains = getMinutesRestRemainsService.execute({
      checkpoints,
    });

    const totalWorkedAtDay = minutesRestRemains + amountMinutes;

    return totalWorkedAtDay;
  }
}
