import { ActionType, getType } from 'typesafe-actions';

import { AnyAction } from 'redux';
import { login, authentication, logout } from './authentication.actions';
import { UserType } from './authentication.type';

export type LoginAction = ActionType<typeof login.success | typeof login.failure | typeof login>;
export type AuthenticationAction = ActionType<
  typeof authentication.success | typeof authentication.failure | typeof authentication
>;
export type LogoutAction = ActionType<
  typeof logout.success | typeof logout.failure | typeof logout
>;

export type AuthenticationState = Readonly<{
  isAuthenticated: boolean;
  loginError: string | null;
  isLoading: boolean;
  user: UserType | null;
}>;

const initialState: AuthenticationState = {
  isAuthenticated: false,
  loginError: null,
  isLoading: false,
  user: null,
};

const reducer = (state: AuthenticationState = initialState, action: AnyAction) => {
  const typedAction = action as LoginAction | AuthenticationAction | LogoutAction;
  switch (typedAction.type) {
    case getType(login.success):
      return {
        ...state,
        isAuthenticated: true,
        isLoading: false,
        user: typedAction.payload.user,
      };
    case getType(logout.success):
      return {
        ...state,
        isAuthenticated: false,
        isLoading: false,
      };
    case getType(authentication.failure):
      return {
        ...state,
        isAuthenticated: false,
        isLoading: false,
      };
    case getType(login.failure):
      return {
        ...state,
        loginError: typedAction.payload.errorMessage,
        isLoading: false,
      };
    case getType(logout.failure):
      return {
        ...state,
        isLoading: false,
      };
    case getType(login.request):
      return {
        ...state,
        isLoading: true,
      };
    case getType(logout.request):
      return {
        ...state,
        isLoading: true,
      };
    default:
      return state;
  }
};

export default reducer;
