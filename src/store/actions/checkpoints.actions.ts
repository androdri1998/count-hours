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
  checkpoints: [];
}

interface IChangeCheckpointsResponse {
  type: string;
  payload: {
    checkpoints: [];
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

export default checkpointsActions;
