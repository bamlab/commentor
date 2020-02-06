import { call, put, takeEvery } from 'redux-saga/effects';
import client from 'services/networking/client';
import { ActionType, getType } from 'typesafe-actions';
import { loadComments } from './comment.actions';
import { CommentType } from './comment.types';

export function* loadCommentsSaga(action: ActionType<typeof loadComments.request>) {
  try {
    const comments: CommentType[] = yield call([client, client.fetchComments], action.payload);
    
    // not sure if right place
    const filteredComments = comments.filter(comment =>
      action.payload.devIds.includes(comment.requester),
    );
    yield put(loadComments.success({ comments: filteredComments }));
  } catch (error) {
    yield put(loadComments.failure({ errorMessage: error.message }));
  }
}

export default function* commentSagas() {
  yield takeEvery(getType(loadComments.request), loadCommentsSaga);
}
