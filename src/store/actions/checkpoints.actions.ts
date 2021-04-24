/* eslint-disable camelcase */
import { ICheckpoint } from '../../@types';

interface ICheckpointssActions {
  ASYNC_FETCH_CHECKPOINTS: string;
  CHANGE_CHECKPOINTS: string;
  CHANGE_RESUME_CHECKPOINTS: string;
  ASYNC_SAVE_CHECKPOINT: string;
  ASYNC_REMOVE_CHECKPOINT: string;
}

const checkpointsActions = {
  ASYNC_FETCH_CHECKPOINTS: '@checkpoints/ASYNC_FETCH_CHECKPOINTS',
  CHANGE_CHECKPOINTS: '@checkpoints/CHANGE_CHECKPOINTS',
  CHANGE_RESUME_CHECKPOINTS: '@checkpoints/CHANGE_RESUME_CHECKPOINTS',
  ASYNC_SAVE_CHECKPOINT: '@checkpoints/ASYNC_SAVE_CHECKPOINT',
  ASYNC_REMOVE_CHECKPOINT: '@checkpoints/ASYNC_REMOVE_CHECKPOINT',
} as ICheckpointssActions;

interface IChangeCheckpointsDTO {
  checkpoints: ICheckpoint[];
}

interface IChangeCheckpointsResponse {
  type: string;
  payload: {
    checkpoints: ICheckpoint[];
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

interface IChangeResumeCheckpointsDTO {
  hoursOverworked: string;
  minutesOverworked: number;
  checkpointsNoReliable: {
    date: string;
  }[];
}

interface IChangeResumeCheckpointsResponse {
  type: string;
  payload: {
    hoursOverworked: string;
    minutesOverworked: number;
    checkpointsNoReliable: {
      date: string;
    }[];
  };
}

export const changeResumeCheckpoints = ({
  hoursOverworked,
  minutesOverworked,
  checkpointsNoReliable,
}: IChangeResumeCheckpointsDTO): IChangeResumeCheckpointsResponse => ({
  type: checkpointsActions.CHANGE_RESUME_CHECKPOINTS,
  payload: {
    hoursOverworked,
    minutesOverworked,
    checkpointsNoReliable,
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

interface IAsyncFetchCheckpointsDTO {
  startsAt: string;
  endsAt: string;
}

interface IAsyncFetchCheckpointsResponse {
  type: string;
  payload: {
    startsAt: string;
    endsAt: string;
  };
}

export const asyncFetchCheckpoints = ({
  startsAt,
  endsAt,
}: IAsyncFetchCheckpointsDTO): IAsyncFetchCheckpointsResponse => ({
  type: checkpointsActions.ASYNC_FETCH_CHECKPOINTS,
  payload: {
    startsAt,
    endsAt,
  },
});

export default checkpointsActions;
