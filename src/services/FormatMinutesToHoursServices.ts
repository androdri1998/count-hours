/* eslint-disable radix */
/* eslint-disable camelcase */
interface IExecuteDTO {
  minutes: number;
}

interface IExecuteResponse {
  hours_overworked: string;
}

export default class FormatMinutesToHoursServices {
  execute({ minutes }: IExecuteDTO): IExecuteResponse {
    const AMOUNT_MINUTES_IN_1_HOUR = 60;
    const hoursFloat = (minutes / AMOUNT_MINUTES_IN_1_HOUR).toFixed(2);
    const hoursOverWorkedString = `${hoursFloat}h`;

    return {
      hours_overworked: hoursOverWorkedString,
    };
  }
}
