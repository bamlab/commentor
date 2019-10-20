import { call, put, takeEvery } from 'redux-saga/effects';
import client from 'services/networking/client';
import { ActionType, getType } from 'typesafe-actions';
import { loadProjects } from './project.actions';
import { ProjectType } from './project.types';

export function* loadTagsSaga(action: ActionType<typeof loadProjects.request>) {
  try {
    const projects: ProjectType[] = yield call([client, client.fetchProjects], action.payload);
    yield put(loadProjects.success({ projects }));
  } catch (error) {
    yield put(loadProjects.failure({ errorMessage: error.message }));
  }
}

export default function* commentSagas() {
  yield takeEvery(getType(loadProjects.request), loadTagsSaga);
}
