import { call, put, takeEvery, select } from 'redux-saga/effects';
import client from 'services/networking/client';
import { getType } from 'typesafe-actions';
import { getFilters } from '../Filters';
import { loadTagsOverTime } from './graphData.actions';
import { TagsOverTimeType } from './graphData.types';

export function* loadTagsOverTimeSaga() {
  try {
    let filters = yield select(getFilters);
    const tagsOverTime: TagsOverTimeType = yield call([client, client.fetchTagOverTime], filters);

    yield put(loadTagsOverTime.success({ tagsOverTime }));
  } catch (error) {
    yield put(loadTagsOverTime.failure({ errorMessage: error.message }));
  }
}

export default function* graphDataSaga() {
  yield takeEvery(getType(loadTagsOverTime.request), loadTagsOverTimeSaga);
}
