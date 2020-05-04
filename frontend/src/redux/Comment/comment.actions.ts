import { createAsyncAction } from 'typesafe-actions';
import { CommentType, PieChartData } from './comment.types';

export const loadComments = createAsyncAction(
  'Comment/GET_COMMENTS_REQUEST',
  'Comment/GET_COMMENTS_SUCCESS',
  'Comment/GET_COMMENTS_FAILURE',
)<
  {},
  {
    comments: CommentType[];
  },
  {
    errorMessage: string;
  }
>();

export const loadPieChartData = createAsyncAction(
  'Comment/GET_PIE_CHART_DATA_REQUEST',
  'Comment/GET_PIE_CHART_DATA_SUCCESS',
  'Comment/GET_PIE_CHART_DATA_FAILURE',
)<
  {},
  {
    pieChartData: PieChartData[];
  },
  {
    errorMessage: string;
  }
>();
export default { loadComments };
