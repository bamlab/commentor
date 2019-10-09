import { call, put, takeEvery } from 'redux-saga/effects';
import client from 'services/networking/client';
import { ActionType, getType } from 'typesafe-actions';
import { loadTags } from './tag.actions';
import { TagType } from './tag.types';

export function* loadTagsSaga(action: ActionType<typeof loadTags.request>) {
  try {
    const tags: TagType[] = yield call([client, client.fetchTags], action.payload);
    yield put(loadTags.success({ tags }));
  } catch (error) {
    yield put(loadTags.failure({ errorMessage: error.message }));
  }
}

export default function* commentSagas() {
  yield takeEvery(getType(loadTags.request), loadTagsSaga);
}
