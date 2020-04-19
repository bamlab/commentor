import { all } from 'redux-saga/effects';

import { sagas as commentSagas } from 'redux/Comment';
import { sagas as tagSagas } from 'redux/Tag';
import { sagas as filtersSagas } from 'redux/Filters';
import { sagas as repositorySagas } from 'redux/Repository';
import { sagas as authenticationSagas } from 'redux/Authentication';

// single entry point to start all Sagas at once
export default function* rootSaga() {
  yield all([commentSagas(), tagSagas(), repositorySagas(), authenticationSagas(), filtersSagas()]);
}
