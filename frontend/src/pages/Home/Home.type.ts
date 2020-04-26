import { CommentType } from '../../redux/Comment';
import { FiltersState } from '../../redux/Filters';
import { TagType } from '../../redux/Tag';

export type HomePropsType = {
  loadRepositories: () => void;
  isAuthenticated: boolean;
  comments: CommentType[];
  tags: TagType[];
  loadTags: () => void;
  filters: FiltersState;
};
