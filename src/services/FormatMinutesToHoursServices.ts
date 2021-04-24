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
    const hoursFloat = minutes / AMOUNT_MINUTES_IN_1_HOUR;
    const minutesRemais = minutes % AMOUNT_MINUTES_IN_1_HOUR;
    const hoursOverworked = parseInt(hoursFloat.toString());
    const hoursOverWorkedString = `${
      hoursOverworked < 10 ? `${hoursOverworked}` : hoursOverworked
    }h:${minutesRemais}min`;

    return {
      hours_overworked: hoursOverWorkedString,
    };
  }
}
