import { CommentType } from '../../redux/Comment';

export type HomePropsType = {
  loadRepositories: () => void;
  isAuthenticated: boolean;
  comments: CommentType[];
  loadTags: () => void;
  loadComments: () => void;
  isCommentLoading: boolean;
};
