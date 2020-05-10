import { createAsyncAction } from 'typesafe-actions';
import { UserType } from './authentication.type';

export const login = createAsyncAction(
  'Authentication/LOGIN_REQUEST',
  'Authentication/LOGIN_SUCCESS',
  'Authentication/LOGIN_FAILURE',
)<
  { code: string; provider: 'gitlab' | 'github' },
  {
    user: UserType;
  },
  {
    errorMessage: string;
  }
>();

export const logout = createAsyncAction(
  'Authentication/LOGOUT_REQUEST',
  'Authentication/LOGOUT_SUCCESS',
  'Authentication/LOGOUT_FAILURE',
)<
  {},
  {},
  {
    errorMessage: string;
  }
>();

export const authentication = createAsyncAction(
  'Authentication/AUTHENTICATION_REQUEST',
  'Authentication/AUTHENTICATION_SUCCESS',
  'Authentication/AUTHENTICATION_FAILURE',
)<
  { code: string },
  {},
  {
    errorMessage: string;
  }
>();

export default { login, authentication };
