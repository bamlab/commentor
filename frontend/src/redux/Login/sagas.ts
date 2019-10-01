import * as Sentry from '@sentry/browser';
import jwt_decode from 'jwt-decode';
import { call, put, takeEvery } from 'redux-saga/effects';
import client from 'services/networking/client';
import { ActionType, getType } from 'typesafe-actions';
import { loginUser, logoutUser } from './actions';
import { push } from 'connected-react-router';

export function* loginUserSaga(action: ActionType<typeof loginUser.request>) {
  try {
    const token: string | undefined = yield call([client, client.login], action.payload);
    if (token) {
      yield put(loginUser.success({ token }));
      Sentry.configureScope(scope => {
        scope.setUser({
          email: action.payload.email,
          ...jwt_decode(token),
        });
      });
      yield put(push('/'));
    } else {
      yield put(loginUser.failure({ errorMessage: 'No token in login response body' }));
    }
  } catch (error) {
    yield put(loginUser.failure({ errorMessage: error.message }));
  }
}

export function* logoutUserSaga() {
  yield call([client, client.logout]);
  yield put(push('/login'));
}

export default function* loginSagas() {
  yield takeEvery(getType(loginUser.request), loginUserSaga);
  yield takeEvery(logoutUser.type, logoutUserSaga);
}
