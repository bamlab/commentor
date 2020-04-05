import { createAsyncAction } from 'typesafe-actions';
import { CommentType } from './comment.types';

export const loadComments = createAsyncAction(
  'Comment/GET_COMMENTS_REQUEST',
  'Comment/GET_COMMENTS_SUCCESS',
  'Comment/GET_COMMENTS_FAILURE',
)<
  {
    repositoryIds: number[];
    startingDate: Date | null;
    endingDate: Date | null;
  },
  {
    comments: CommentType[];
  },
  {
    errorMessage: string;
  }
>();

export default { loadComments };
