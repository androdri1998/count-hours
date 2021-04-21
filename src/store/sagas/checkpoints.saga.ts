/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { takeEvery, ForkEffect, put } from 'redux-saga/effects';

import checkpointsActions, {
  changeCheckpoints,
} from '../actions/checkpoints.actions';

// '2021-04-16T00:00:00': [
//   {
//       hour: '08:00',
//       type: 'Entrance'
//   },
//   {
//       hour: '12:00',
//       type: 'Exit'
//   },
//   {
//       hour: '13:00',
//       type: 'Entrance'
//   },
//   {
//       hour: '18:22',
//       type: 'Exit'
//   },
// ]

interface IAsyncSaveNewCheckpointDTO {
  type: string;
  payload: {
    date: string;
    time: string;
    type: string;
  };
}

function* asyncSaveNewCheckpoint({
  payload: { date, time, type },
}: IAsyncSaveNewCheckpointDTO) {
  console.log('teste');
  yield put(changeCheckpoints({ checkpoints: [] }));
}

interface IAsyncFetchCheckpointsDTO {
  type: string;
  payload: {
    startAt: string;
    endAt: string;
  };
}

function* asyncFetchCheckpoints({
  payload: { startAt, endAt },
}: IAsyncFetchCheckpointsDTO) {
  console.log('teste');
  yield put(changeCheckpoints({ checkpoints: [] }));
}

export default function* wordsSaga(): Generator<
  ForkEffect<never>,
  void,
  unknown
> {
  yield takeEvery(
    checkpointsActions.ASYNC_FETCH_CHECKPOINTS,
    asyncFetchCheckpoints,
  );
  yield takeEvery(
    checkpointsActions.ASYNC_REMOVE_CHECKPOINT,
    asyncFetchCheckpoints,
  );
  yield takeEvery(
    checkpointsActions.ASYNC_SAVE_CHECKPOINT,
    asyncSaveNewCheckpoint,
  );
}
