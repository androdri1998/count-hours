/* eslint-disable radix */

interface IExecuteDTO {
  input: string;
  exit: string;
}

export default class DiffBetweenHourService {
  execute({ input, exit }: IExecuteDTO): number {
    const currentFullDate = new Date();
    const currentDate = currentFullDate.toISOString().split('T')[0];
    const inputDate = new Date(`${currentDate}T${input}:00.000Z`);
    const exitDate = new Date(`${currentDate}T${exit}:00.000Z`);

    const MILISECONDS_IN_1_SECOND = 1000;
    const diffTime =
      (exitDate.getTime() - inputDate.getTime()) / MILISECONDS_IN_1_SECOND;

    const SECONDS_IN_1_MINUTE = 60;
    const diffMinutes = diffTime / SECONDS_IN_1_MINUTE;
    const minutesRounded = Math.abs(Math.round(diffMinutes));
    return minutesRounded;
  }
}
