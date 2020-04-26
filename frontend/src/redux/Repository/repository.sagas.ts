import { call, put, takeEvery } from 'redux-saga/effects';
import client from 'services/networking/client';
import { ActionType, getType } from 'typesafe-actions';
import { loadRepositories } from './repository.actions';
import { authentication } from '../Authentication/authentication.actions';
import { RepositoryType } from './repository.types';
import { loadComments } from '../Comment/comment.actions';
import { loadTagsOverTime } from '../GraphData/graphData.actions';

export function* loadRepositoriesSaga(action: ActionType<typeof loadRepositories.request>) {
  try {
    const repositories: RepositoryType[] = yield call(
      [client, client.fetchRepositories],
      action.payload,
    );
    yield put(loadRepositories.success({ repositories }));
    yield put(loadComments.request({}));
    yield put(loadTagsOverTime.request({}));
  } catch (error) {
    if (error.status && error.status === 401) {
      yield put(authentication.failure({ errorMessage: error.message }));
    }
    yield put(loadRepositories.failure({ errorMessage: error.message }));
  }
}

export default function* repositorySagas() {
  yield takeEvery(getType(loadRepositories.request), loadRepositoriesSaga);
}
