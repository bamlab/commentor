import { FiltersState } from '../../redux/Filters';
import { CommentType } from '../../redux/Comment';
import { TagType } from '../../redux/Tag';

export type HomePropsType = {
  loadRepositories: () => void;
  isAuthenticated: boolean;
  comments: CommentType[];
  loadTags: () => void;
  loadComments: () => void;
  isCommentLoading: boolean;
};
