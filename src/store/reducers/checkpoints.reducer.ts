/* eslint-disable camelcase */
import { ICheckpoint } from '../../@types';
import checkpointsActions from '../actions/checkpoints.actions';

export interface ICheckpointsState {
  checkpoints: ICheckpoint[];
  resume: {
    hours_overworked: string;
    minutes_overworked: number;
    checkpoints_no_reliable: {
      date: string;
    }[];
  };
}

const initialState: ICheckpointsState = {
  checkpoints: [],
  resume: {
    hours_overworked: '0h:0min',
    minutes_overworked: 0,
    checkpoints_no_reliable: [],
  },
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
    case checkpointsActions.CHANGE_RESUME_CHECKPOINTS:
      return {
        ...state,
        resume: {
          hours_overworked: action.payload.hoursOverworked,
          minutes_overworked: action.payload.minutesOverworked,
          checkpoints_no_reliable: action.payload.checkpointsNoReliable,
        },
      };
    default:
      return state;
  }
};

export default checkpointsReducer;
