import { LoginAction, LoginState } from './Login';

export type RootState = Readonly<{
  login: LoginState;
}>;
export type RootAction = LoginAction;
