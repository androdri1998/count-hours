/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { takeEvery, ForkEffect, put } from 'redux-saga/effects';

import StorageProvider from '../../providers/implementations/StorageProvider';

import SaveNewCheckpointService from '../../services/SaveNewCheckpointService';

import checkpointsActions, {
  changeCheckpoints,
} from '../actions/checkpoints.actions';

interface IAsyncSaveNewCheckpointDTO {
  type: string;
  payload: {
    date: string;
    time: string;
    type: string;
    startsAt: string;
    endsAt: string;
  };
}

function* asyncSaveNewCheckpoint({
  payload: { date, time, type, startsAt, endsAt },
}: IAsyncSaveNewCheckpointDTO) {
  const storageProvider = new StorageProvider();
  const saveNewCheckpointService = new SaveNewCheckpointService(
    storageProvider,
  );
  const { checkpoints } = saveNewCheckpointService.execute({
    date,
    time,
    type,
    startsAt,
    endsAt,
  });
  yield put(changeCheckpoints({ checkpoints }));
}

interface IAsyncFetchCheckpointsDTO {
  type: string;
  payload: {
    startsAt: string;
    endsAt: string;
  };
}

function* asyncFetchCheckpoints({
  payload: { startsAt, endsAt },
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
