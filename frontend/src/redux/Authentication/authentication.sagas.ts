import { call, put, takeEvery } from 'redux-saga/effects';
import client from 'services/networking/client';
import { ActionType, getType } from 'typesafe-actions';
import { login } from './authentication.actions';

export function* loginSaga(action: ActionType<typeof login.request>) {
  try {
    yield call([client, client.createAccessToken], action.payload);
    const user = yield call([client, client.getUser]);
    yield put(login.success({ user }));
  } catch (error) {
    yield put(login.failure({ errorMessage: error.message }));
  }
}

export default function* authenticationSagas() {
  yield takeEvery(getType(login.request), loginSaga);
}
