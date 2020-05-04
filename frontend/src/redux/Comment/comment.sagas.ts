import { call, put, takeEvery, select } from 'redux-saga/effects';
import client from 'services/networking/client';
import { ActionType, getType } from 'typesafe-actions';
import { loadComments, loadPieChartData } from './comment.actions';
import { CommentType, PieChartData } from './comment.types';
import { getFilters } from '../Filters';

export function* loadCommentsSaga(action: ActionType<typeof loadComments.request>) {
  try {
    let filters = yield select(getFilters);
    const comments: CommentType[] = yield call([client, client.fetchComments], filters);
    const pieChartData: PieChartData[] = yield call(
      [client, client.fetchPieChartDataComments],
      filters,
    );
    console.log('Amo: function*loadCommentsSaga -> pieChartData', pieChartData);

    yield put(loadComments.success({ comments }));
    yield put(loadPieChartData.success({ pieChartData }));
  } catch (error) {
    yield put(loadComments.failure({ errorMessage: error.message }));
  }
}

export default function* commentSagas() {
  yield takeEvery(getType(loadComments.request), loadCommentsSaga);
}
