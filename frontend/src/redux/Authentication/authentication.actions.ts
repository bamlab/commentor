import { createAsyncAction } from 'typesafe-actions';

export const login = createAsyncAction(
  'Authentication/LOGIN_REQUEST',
  'Authentication/LOGIN_SUCCESS',
  'Authentication/LOGIN_FAILURE',
)<
  { code: string },
  {},
  {
    errorMessage: string;
  }
>();

export default { login };
