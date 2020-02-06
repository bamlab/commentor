import { ActionType, getType } from 'typesafe-actions';

import { AnyAction } from 'redux';
import { CommentType, DevType } from './comment.types';
import { loadComments } from './comment.actions';

export type CommentAction = ActionType<
  typeof loadComments.success | typeof loadComments.failure | typeof loadComments
>;
export type CommentState = Readonly<{
  comments: CommentType[];
  availableDevs: DevType[];
  commentError: string | null;
  isLoading: boolean;
}>;

const initialState: CommentState = {
  comments: [],
  commentError: null,
  availableDevs: [],
  isLoading: false,
};

const removeDuplicate = (array: string[]): string[] =>
  array.reduce((acc: string[], item: string) => (acc.includes(item) ? acc : [...acc, item]), []);

const filterDevsFromComment = (comments: CommentType[]): DevType[] =>
  removeDuplicate(comments.map(comment => comment.requester));

const reducer = (state: CommentState = initialState, action: AnyAction) => {
  const typedAction = action as CommentAction;
  switch (typedAction.type) {
    case getType(loadComments.success):
      return {
        ...state,
        comments: typedAction.payload.comments,
        availableDevs: filterDevsFromComment(typedAction.payload.comments),
        isLoading: false,
      };
    case getType(loadComments.failure):
      return {
        ...state,
        commentError: typedAction.payload.errorMessage,
        availableDevs: [],
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
