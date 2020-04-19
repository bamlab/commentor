import { call, put, takeEvery, select } from 'redux-saga/effects';
import client from 'services/networking/client';
import { ActionType, getType } from 'typesafe-actions';
import { loadComments } from './comment.actions';
import { CommentType } from './comment.types';
import { getFilters } from '../Filters';

export function* loadCommentsSaga(action: ActionType<typeof loadComments.request>) {
  try {
    let filters = yield select(getFilters);
    const comments: CommentType[] = yield call([client, client.fetchComments], filters);

    yield put(loadComments.success({ comments }));
  } catch (error) {
    yield put(loadComments.failure({ errorMessage: error.message }));
  }
}

export default function* commentSagas() {
  yield takeEvery(getType(loadComments.request), loadCommentsSaga);
}
