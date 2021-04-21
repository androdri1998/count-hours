/* eslint-disable @typescript-eslint/no-explicit-any */
import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { History } from 'history';

import checkpointsReducer, {
  ICheckpointsState,
} from './reducers/checkpoints.reducer';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface IReducerState {
  checkpointsReducer: ICheckpointsState;
}

const reducer = (history: History<any>): any =>
  combineReducers({
    router: connectRouter(history),
    checkpointsReducer,
  });

export default reducer;
