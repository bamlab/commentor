import { FiltersState } from '../../redux/Filters';
import { CommentType } from '../../redux/Comment';
import { TagType } from '../../redux/Tag';

export type HomePropsType = {
  loadRepositories: () => void;
  login: (code: string) => void;
  isAuthenticated: boolean;
  location: { search: string };
  comments: CommentType[];
  tags: TagType[];
  loadTags: () => void;
  loadComments: (
    filters: {
      repositoryIds: number[];
      startingDate: Date | null;
      endingDate: Date | null;
    },
  ) => void;
  isCommentLoading: boolean;
  repositoryIds: number[];
  startingDate: Date | null;
  endingDate: Date | null;
  filters: FiltersState;
};