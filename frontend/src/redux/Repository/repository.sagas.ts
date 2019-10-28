import { call, put, takeEvery } from 'redux-saga/effects';
import client from 'services/networking/client';
import { ActionType, getType } from 'typesafe-actions';
import { loadProjects } from './repository.actions';
import { RepositoryType } from './repository.types';

export function* loadRepositoriesSaga(action: ActionType<typeof loadProjects.request>) {
  try {
    const projects: RepositoryType[] = yield call([client, client.fetchProjects], action.payload);
    yield put(loadProjects.success({ projects }));
  } catch (error) {
    yield put(loadProjects.failure({ errorMessage: error.message }));
  }
}

export default function* repositorySagas() {
  yield takeEvery(getType(loadProjects.request), loadRepositoriesSaga);
}
