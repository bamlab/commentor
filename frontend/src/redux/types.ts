import { LoginAction, LoginState } from './Login';
import { CommentAction, CommentState } from './Comment';
import { TagAction, TagState } from './Tag';

export type RootState = Readonly<{
  login: LoginState;
  comment: CommentState;
  tag: TagState;
}>;
export type RootAction = LoginAction | CommentAction | TagAction;
