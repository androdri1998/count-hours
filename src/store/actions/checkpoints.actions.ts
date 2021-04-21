import { Checkpoints, Checkpoint } from '../../@types';

interface ICheckpointssActions {
  ASYNC_FETCH_CHECKPOINTS: string;
  CHANGE_CHECKPOINTS: string;
  ASYNC_SAVE_CHECKPOINT: string;
  ASYNC_REMOVE_CHECKPOINT: string;
}

const checkpointsActions = {
  ASYNC_FETCH_CHECKPOINTS: '@checkpoints/ASYNC_FETCH_CHECKPOINTS',
  CHANGE_CHECKPOINTS: '@checkpoints/CHANGE_CHECKPOINTS',
  ASYNC_SAVE_CHECKPOINT: '@checkpoints/ASYNC_SAVE_CHECKPOINT',
  ASYNC_REMOVE_CHECKPOINT: '@checkpoints/ASYNC_REMOVE_CHECKPOINT',
} as ICheckpointssActions;

interface IChangeCheckpointsDTO {
  checkpoints: Checkpoint[];
}

interface IChangeCheckpointsResponse {
  type: string;
  payload: {
    checkpoints: Checkpoint[];
  };
}

export const changeCheckpoints = ({
  checkpoints,
}: IChangeCheckpointsDTO): IChangeCheckpointsResponse => ({
  type: checkpointsActions.CHANGE_CHECKPOINTS,
  payload: {
    checkpoints,
  },
});

interface IAsyncSaveNewCheckpointDTO {
  date: string;
  time: string;
  type: string;
  startsAt: string;
  endsAt: string;
}

interface IAsyncSaveNewCheckpointResponse {
  type: string;
  payload: {
    date: string;
    time: string;
    type: string;
    startsAt: string;
    endsAt: string;
  };
}

export const asyncSaveNewCheckpoint = ({
  date,
  time,
  type,
  startsAt,
  endsAt,
}: IAsyncSaveNewCheckpointDTO): IAsyncSaveNewCheckpointResponse => ({
  type: checkpointsActions.ASYNC_SAVE_CHECKPOINT,
  payload: {
    date,
    time,
    type,
    startsAt,
    endsAt,
  },
});

export default checkpointsActions;
