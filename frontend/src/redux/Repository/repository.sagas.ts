import { call, put, takeEvery } from 'redux-saga/effects';
import client from 'services/networking/client';
import { ActionType, getType } from 'typesafe-actions';
import { loadRepositories } from './repository.actions';
import { RepositoryType } from './repository.types';

export function* loadRepositoriesSaga(action: ActionType<typeof loadRepositories.request>) {
  try {
    const repositories: RepositoryType[] = yield call(
      [client, client.fetchRepositories],
      action.payload,
    );
    yield put(loadRepositories.success({ repositories }));
  } catch (error) {
    yield put(loadRepositories.failure({ errorMessage: error.message }));
  }
}

export default function* repositorySagas() {
  yield takeEvery(getType(loadRepositories.request), loadRepositoriesSaga);
}
