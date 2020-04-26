import { ActionType, getType } from 'typesafe-actions';

import { AnyAction } from 'redux';
import { CommentType, RequesterType, CommentorType } from './comment.types';
import { loadComments } from './comment.actions';

export type CommentAction = ActionType<
  typeof loadComments.success | typeof loadComments.failure | typeof loadComments
>;
export type CommentState = Readonly<{
  comments: CommentType[];
  availableRequesters: RequesterType[];
  availableCommentors: CommentorType[];
  commentError: string | null;
  isLoading: boolean;
}>;

const initialState: CommentState = {
  comments: [],
  commentError: null,
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

const reducer = (state: CommentState = initialState, action: AnyAction): CommentState => {
  const typedAction = action as CommentAction;
  switch (typedAction.type) {
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
