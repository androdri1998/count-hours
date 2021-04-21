/* eslint-disable radix */
import { Point } from '../@types';

interface IExecuteDTO {
  checkpoints: Point[];
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
