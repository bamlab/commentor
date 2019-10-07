// import { ActionType, getType } from 'typesafe-actions';

import { AnyAction } from 'redux';
import { CommentType } from './comment.types';

export type CommentAction = AnyAction;

export type CommentState = Readonly<{
  comments: CommentType[];
}>;

const defaultComment = {
  id: 2,
  body: 'ed',
  filePath: 'weff',
  url: 'wffew',
  commentor: 'Amaury',
  requester: 'wfwef',
  pullRequestUrl: 'ewffew',
  repositoryId: 31312,
  creationDate: new Date(),
};
const initialState: CommentState = { comments: [defaultComment, defaultComment, defaultComment] };

const reducer = (state: CommentState = initialState, action: AnyAction) => {
  const typedAction = action as CommentAction;
  switch (typedAction.type) {
    default:
      return state;
  }
};

export default reducer;
