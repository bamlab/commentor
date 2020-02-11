import { call, put, takeEvery } from 'redux-saga/effects';
import client from 'services/networking/client';
import { ActionType, getType } from 'typesafe-actions';
import { loadComments } from './comment.actions';
import { CommentType } from './comment.types';

export function* loadCommentsSaga(action: ActionType<typeof loadComments.request>) {
  try {
    const comments: CommentType[] = yield call([client, client.fetchComments], action.payload);
    yield put(loadComments.success({ comments }));
  } catch (error) {
    yield put(loadComments.failure({ errorMessage: error.message }));
  }
}

export default function* commentSagas() {
  yield takeEvery(getType(loadComments.request), loadCommentsSaga);
}
