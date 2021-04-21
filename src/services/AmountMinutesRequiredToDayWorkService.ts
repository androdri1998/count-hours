/* eslint-disable radix */

interface IExecuteDTO {
  date: string;
}

export default class AmountMinutesRequiredToDayWorkService {
  execute({ date }: IExecuteDTO): number {
    const dateToCheck = new Date(date);
    const day = dateToCheck.getDay();

    const MINUTES_REQUIRED_AT_WEEKEND = 0;
    const MINUTES_REQUIRED_AT_FRIDAY = 480;
    const MINUTES_REQUIRED_AT_NORMAL_DAY_WEEK = 540;

    const FRIDAY = 5;
    const SUNDAY = 0;
    const SATURDAY = 6;

    if (day === FRIDAY) {
      return MINUTES_REQUIRED_AT_FRIDAY;
    }
    if (day !== FRIDAY && day > SUNDAY && day < SATURDAY) {
      return MINUTES_REQUIRED_AT_NORMAL_DAY_WEEK;
    }
    return MINUTES_REQUIRED_AT_WEEKEND;
  }
}
