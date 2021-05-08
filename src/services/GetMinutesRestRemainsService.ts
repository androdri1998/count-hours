/* eslint-disable radix */
import { IPoint } from '../@types';
import DiffBetweenHoursService from './DiffBetweenHoursService';

interface IExecuteDTO {
  checkpoints: IPoint[];
}

export default class GetMinutesRestRemainsService {
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

    const hoursRestToDiff = [];
    for (let index = 0; index < sortedCheckpoits.length; index += 2) {
      const exitIndex = index + 1;
      const exitHour = sortedCheckpoits[exitIndex].hour;

      const nextPosition = exitIndex + 1;
      if (
        sortedCheckpoits[nextPosition] &&
        sortedCheckpoits[nextPosition].type.toLowerCase() === 'entrance'
      ) {
        hoursRestToDiff.push({
          input: exitHour,
          exit: sortedCheckpoits[nextPosition].hour,
        });
      }
    }

    const diffBetweenHoursService = new DiffBetweenHoursService();
    let amountRestMinutes = 0;
    hoursRestToDiff.forEach(checkpoint => {
      amountRestMinutes += diffBetweenHoursService.execute(checkpoint);
    });

    const minuteOfRest = 60;
    const minutesRestRemains = minuteOfRest - amountRestMinutes;

    if (minutesRestRemains < 0) {
      return 0;
    }

    return minutesRestRemains;
  }
}
