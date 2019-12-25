import { CommentAction, CommentState } from './Comment';
import { TagAction, TagState } from './Tag';
import { RepositoryAction, RepositoryState } from './Repository';
import { FiltersAction, FiltersState } from './Filters';

export type RootState = Readonly<{
  comment: CommentState;
  tag: TagState;
  repository: RepositoryState;
  filters: FiltersState;
}>;
export type RootAction = CommentAction | TagAction | FiltersAction | RepositoryAction;
