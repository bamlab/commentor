import { LoginAction, LoginState } from './Login';
import { CommentState } from './Comment';

export type RootState = Readonly<{
  login: LoginState;
  comment: CommentState;
}>;
export type RootAction = LoginAction;
