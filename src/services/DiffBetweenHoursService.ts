/* eslint-disable radix */

interface IExecuteDTO {
  input: string;
  exit: string;
}

export default class DiffBetweenHourService {
  execute({ input, exit }: IExecuteDTO): number {
    const inputArr = input.split(':');
    const hourInput = parseInt(inputArr[0]);
    const minuteInput = parseInt(inputArr[1]);

    const exitArr = exit.split(':');
    const hourExit = parseInt(exitArr[0]);
    const minuteExit = parseInt(exitArr[1]);

    const MINUTES_IN_AN_HOUR = 60;
    const diffBetweenHoursInMinutes =
      (hourExit - hourInput) * MINUTES_IN_AN_HOUR;
    const fractionOfMinutes = minuteInput + minuteExit;
    const amountTotalMinutes = diffBetweenHoursInMinutes + fractionOfMinutes;

    return amountTotalMinutes;
  }
}
