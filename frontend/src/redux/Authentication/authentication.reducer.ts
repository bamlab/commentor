import { ActionType, getType } from 'typesafe-actions';

import { AnyAction } from 'redux';
import { login } from './authentication.actions';

export type LoginAction = ActionType<typeof login.success | typeof login.failure | typeof login>;
export type AuthenticationState = Readonly<{
  isAuthenticated: boolean;
  loginError: string | null;
  isLoading: boolean;
}>;

const initialState: AuthenticationState = {
  isAuthenticated: false,
  loginError: null,
  isLoading: false,
};

const reducer = (state: AuthenticationState = initialState, action: AnyAction) => {
  const typedAction = action as LoginAction;
  switch (typedAction.type) {
    case getType(login.success):
      return {
        ...state,
        isAuthenticated: true,
        isLoading: false,
      };
    case getType(login.failure):
      return {
        ...state,
        loginError: typedAction.payload.errorMessage,
        isLoading: false,
      };
    case getType(login.request):
      return {
        ...state,
        isLoading: true,
      };
    default:
      return state;
  }
};

export default reducer;
