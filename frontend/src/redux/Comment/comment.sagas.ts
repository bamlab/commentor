import { call, put, takeEvery, select } from 'redux-saga/effects';
import client from 'services/networking/client';
import { ActionType, getType } from 'typesafe-actions';
import { loadComments, loadPieChartData } from './comment.actions';
import { getFilters } from '../Filters';

// @ts-ignore typing generator
export function* loadCommentsSaga(action: ActionType<typeof loadComments.request>) {
  try {
    let filters = yield select(getFilters);
    const { comments, pieChartData } = yield call([client, client.fetchCommentData], filters);

    yield put(loadComments.success({ comments }));
    yield put(loadPieChartData.success({ pieChartData }));
  } catch (error) {
    yield put(loadComments.failure({ errorMessage: error.message }));
  }
}

export default function* commentSagas() {
  yield takeEvery(getType(loadComments.request), loadCommentsSaga);
}
