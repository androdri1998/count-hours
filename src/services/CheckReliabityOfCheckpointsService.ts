/* eslint-disable radix */
import { IPoint } from '../@types';

interface IExecuteDTO {
  checkpoints: IPoint[];
}

export default class CheckReliabityOfCheckpointsService {
  execute({ checkpoints = [] }: IExecuteDTO): boolean {
    let amountEntrance = 0;
    let amountExit = 0;

    checkpoints.forEach(checkpoint => {
      if (checkpoint.type === 'Entrance') {
        amountEntrance += 1;
      } else if (checkpoint.type === 'Exit') {
        amountExit += 1;
      }
    });

    const isCheckpointsRealiable = amountEntrance === amountExit;
    return isCheckpointsRealiable;
  }
}
