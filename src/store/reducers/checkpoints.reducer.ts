/* eslint-disable camelcase */
import checkpointsActions from '../actions/checkpoints.actions';

export interface ICheckpointsState {
  checkpoints: [];
}

const initialState: ICheckpointsState = {
  checkpoints: [],
};

interface IActionDTO {
  type: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  payload: any;
}

const checkpointsReducer = (
  state = initialState,
  action: IActionDTO,
): ICheckpointsState => {
  switch (action.type) {
    case checkpointsActions.CHANGE_CHECKPOINTS:
      return { ...state, checkpoints: action.payload.checkpoints };
    default:
      return state;
  }
};

export default checkpointsReducer;
