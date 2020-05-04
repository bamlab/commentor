import { ActionType, getType } from 'typesafe-actions';

import { AnyAction } from 'redux';
import { CommentType, RequesterType, CommentorType, PieChartData } from './comment.types';
import { loadComments, loadPieChartData } from './comment.actions';

export type CommentAction = ActionType<
  | typeof loadComments.success
  | typeof loadComments.failure
  | typeof loadComments
  | typeof loadPieChartData.success
>;

export type CommentState = Readonly<{
  comments: CommentType[];
  availableRequesters: RequesterType[];
  availableCommentors: CommentorType[];
  pieChartData: PieChartData[];
  commentError: string | null;
  isLoading: boolean;
}>;

const initialState: CommentState = {
  comments: [],
  commentError: null,
  pieChartData: [],
  availableRequesters: [],
  availableCommentors: [],
  isLoading: false,
};

const removeDuplicate = (array: string[]): string[] =>
  array.reduce((acc: string[], item: string) => (acc.includes(item) ? acc : [...acc, item]), []);

const filterRequestersFromComment = (comments: CommentType[]): RequesterType[] =>
  removeDuplicate(comments.map(comment => comment.requester));

const filterCommentorsFromComment = (comments: CommentType[]): RequesterType[] =>
  removeDuplicate(comments.map(comment => comment.commentor));

const reducer = (state: CommentState = initialState, action: AnyAction) => {
  const typedAction = action as CommentAction;
  switch (typedAction.type) {
    case getType(loadPieChartData.success):
      return {
        ...state,
        pieChartData: typedAction.payload.pieChartData,
        isLoading: false,
      };
    case getType(loadComments.success):
      return {
        ...state,
        comments: typedAction.payload.comments,
        availableRequesters: filterRequestersFromComment(typedAction.payload.comments),
        availableCommentors: filterCommentorsFromComment(typedAction.payload.comments),
        isLoading: false,
      };
    case getType(loadComments.failure):
      return {
        ...state,
        commentError: typedAction.payload.errorMessage,
        pieChartData: [],
        availableRequesters: [],
        availableCommentors: [],
        isLoading: false,
      };
    case getType(loadComments.request):
      return {
        ...state,
        isLoading: true,
      };
    default:
      return state;
  }
};

export default reducer;
