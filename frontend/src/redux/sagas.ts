import { all } from 'redux-saga/effects';

import { sagas as loginSagas } from 'redux/Login';
import { sagas as commentSagas } from 'redux/Comment';
import { sagas as tagSagas } from 'redux/Tag';
import { sagas as repositorySagas } from 'redux/Repository';

// single entry point to start all Sagas at once
export default function* rootSaga() {
  yield all([loginSagas(), commentSagas(), tagSagas(), repositorySagas()]);
}
