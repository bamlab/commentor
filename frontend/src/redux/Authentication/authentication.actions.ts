import { createAsyncAction } from 'typesafe-actions';
import { UserType } from './authentication.type';

export const login = createAsyncAction(
  'Authentication/LOGIN_REQUEST',
  'Authentication/LOGIN_SUCCESS',
  'Authentication/LOGIN_FAILURE',
)<
  { code: string },
  {
    user: UserType;
  },
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
