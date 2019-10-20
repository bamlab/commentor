import { LoginAction, LoginState } from './Login';
import { CommentAction, CommentState } from './Comment';
import { TagAction, TagState } from './Tag';
import { FiltersAction, FiltersState } from './Filters';

export type RootState = Readonly<{
  login: LoginState;
  comment: CommentState;
  tag: TagState;
  filters: FiltersState;
}>;
export type RootAction = LoginAction | CommentAction | TagAction | FiltersAction;
