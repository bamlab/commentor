import { CommentAction, CommentState } from './Comment';
import { TagAction, TagState } from './Tag';
import { RepositoryAction, RepositoryState } from './Repository';
import { FiltersAction, FiltersState } from './Filters';
import { LoginAction, AuthenticationState } from './Authentication';
import { GraphDataAction, GraphDataState } from './GraphData';

export type RootState = Readonly<{
  comment: CommentState;
  tag: TagState;
  authentication: AuthenticationState;
  repository: RepositoryState;
  filters: FiltersState;
  graphData: GraphDataState;
}>;
export type RootAction =
  | CommentAction
  | TagAction
  | FiltersAction
  | RepositoryAction
  | LoginAction
  | GraphDataAction;
