import { call, put, takeEvery } from 'redux-saga/effects';
import client from 'services/networking/client';
import { ActionType, getType } from 'typesafe-actions';
import { loadTags, addTag, deleteTag } from './tag.actions';
import { TagType } from './tag.types';

export function* loadTagsSaga(action: ActionType<typeof loadTags.request>) {
  try {
    const tags: TagType[] = yield call([client, client.fetchTags], action.payload);
    yield put(loadTags.success({ tags }));
  } catch (error) {
    yield put(loadTags.failure({ errorMessage: error.message }));
  }
}

export function* addTagSaga(action: ActionType<typeof addTag.request>) {
  try {
    const tag: TagType = yield call([client, client.addTag], action.payload);
    yield put(addTag.success({ tag }));
  } catch (error) {
    yield put(addTag.failure({ errorMessage: error.message }));
  }
}
export function* deleteTagSaga(action: ActionType<typeof deleteTag.request>) {
  try {
    yield call([client, client.deleteTag], action.payload.tagId);
    yield put(deleteTag.success({ tagId: action.payload.tagId }));
  } catch (error) {
    yield put(deleteTag.failure({ errorMessage: error.message }));
  }
}

export default function* commentSagas() {
  yield takeEvery(getType(loadTags.request), loadTagsSaga);
  yield takeEvery(getType(addTag.request), addTagSaga);
  yield takeEvery(getType(deleteTag.request), deleteTagSaga);
}
