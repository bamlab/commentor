import { put, takeEvery } from 'redux-saga/effects';
import { getType } from 'typesafe-actions';
import {
  selectRepositoryIds,
  selectRequesterIds,
  selectCommentorIds,
  selectTagCodes,
  selectStartingDate,
  selectEndingDate,
} from './filters.actions';
import { loadComments } from '../Comment/comment.actions';

export function* loadCommentsOnFilterChangeSaga() {
  try {
    yield put(loadComments.request({}));
  } catch (error) {
    yield put(loadComments.failure({ errorMessage: error.message }));
  }
}

export default function* filtersSagas() {
  yield takeEvery(
    [
      getType(selectTagCodes.request),
      getType(selectRepositoryIds.request),
      getType(selectCommentorIds.request),
      getType(selectRequesterIds.request),
      getType(selectStartingDate.request),
      getType(selectEndingDate.request),
    ],
    loadCommentsOnFilterChangeSaga,
  );
}
