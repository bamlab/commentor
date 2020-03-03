import { ActionType, getType } from 'typesafe-actions';

import { AnyAction } from 'redux';
import {
  selectRepositoryIds,
  selectRequesterIds,
  selectCommentorIds,
  selectTagIds,
} from './filters.actions';

export type FiltersAction =
  | ActionType<typeof selectRepositoryIds.request>
  | ActionType<typeof selectRequesterIds.request>
  | ActionType<typeof selectCommentorIds.request>
  | ActionType<typeof selectTagIds.request>;

export type FiltersState = Readonly<{
  repositoryIds: number[];
  requesterIds: string[];
  commentorIds: string[];
  tagIds: string[];
}>;

const initialState: FiltersState = {
  repositoryIds: [],
  requesterIds: [],
  commentorIds: [],
  tagIds: [],
};

const reducer = (state: FiltersState = initialState, action: AnyAction) => {
  const typedAction = action as FiltersAction;
  switch (typedAction.type) {
    case getType(selectRepositoryIds.request):
      return {
        ...state,
        repositoryIds: typedAction.payload.repositoryIds.map(repo => parseInt(repo.value)),
      };
    case getType(selectRequesterIds.request):
      return {
        ...state,
        requesterIds: typedAction.payload.requesterIds.map(requester => requester.value),
      };
    case getType(selectCommentorIds.request):
      return {
        ...state,
        commentorIds: typedAction.payload.commentorIds.map(commentor => commentor.value),
      };
    case getType(selectTagIds.request):
      return {
        ...state,
        tagIds: typedAction.payload.tagIds.map(tag => tag.value),
      };
    default:
      return state;
  }
};

export default reducer;
