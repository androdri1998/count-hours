/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { takeEvery, ForkEffect, put } from 'redux-saga/effects';

import checkpointsActions, {
  changeCheckpoints,
} from '../actions/checkpoints.actions';

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
    asyncFetchCheckpoints,
  );
}
