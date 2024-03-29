import { call, put, takeEvery, select } from 'redux-saga/effects';
import client from 'services/networking/client';
import { ActionType, getType } from 'typesafe-actions';
import { loadComments, loadPieChartData, loadBarChartData } from './comment.actions';
import { getFilters } from '../Filters';
import { getUser } from '../Authentication';

// @ts-ignore typing generator
export function* loadCommentsSaga(action: ActionType<typeof loadComments.request>) {
  try {
    let filters = yield select(getFilters);
    let user = yield select(getUser);
    const { comments, pieChartData, barChartData } = yield call([client, client.fetchCommentData], {
      ...filters,
      oAuthLogin: user.oAuthLogin,
    });

    yield put(loadComments.success({ comments }));
    yield put(loadPieChartData.success({ pieChartData }));
    yield put(loadBarChartData.success({ barChartData }));
  } catch (error) {
    yield put(loadComments.failure({ errorMessage: error.message }));
  }
}

export default function* commentSagas() {
  yield takeEvery(getType(loadComments.request), loadCommentsSaga);
}
