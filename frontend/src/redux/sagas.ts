import { all } from 'redux-saga/effects';

import { sagas as loginSagas } from 'redux/Login';

// single entry point to start all Sagas at once
export default function* rootSaga() {
  yield all([loginSagas()]);
}
