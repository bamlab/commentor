import { createAsyncAction } from 'typesafe-actions';
import { CommentType } from './comment.types';

export const loadComments = createAsyncAction(
  'Comment/GET_COMMENTS_REQUEST',
  'Comment/USER_LOGIN_SUCCESS',
  'Comment/USER_LOGIN_FAILURE',
)<
  {},
  {
    comments: CommentType[];
  },
  {
    errorMessage: string;
  }
>();

export default { loadComments };
