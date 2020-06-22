import { CommentType } from '../../redux/Comment';

export interface HomePropsType {
  loadRepositories: () => void;
  isAuthenticated: boolean;
  comments: CommentType[];
  loadTags: () => void;
  loadComments: () => void;
  isCommentLoading: boolean;
}
