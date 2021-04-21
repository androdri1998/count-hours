import { all, AllEffect, ForkEffect } from 'redux-saga/effects';

import checkpointsSaga from './sagas/checkpoints.saga';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default function* rootSaga(): Generator<
  AllEffect<Generator<ForkEffect<never>, void, unknown>>,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  any,
  unknown
> {
  return yield all([checkpointsSaga()]);
}
