import { ActionType, getType } from 'typesafe-actions';

import { AnyAction } from 'redux';
import {
  selectRepositoryIds,
  selectRequesterIds,
  selectCommentorIds,
  selectStartingDate,
  selectEndingDate,
  selectTagIds,
} from './filters.actions';

export type FiltersAction =
  | ActionType<typeof selectRepositoryIds.request>
  | ActionType<typeof selectRequesterIds.request>
  | ActionType<typeof selectCommentorIds.request>
  | ActionType<typeof selectStartingDate.request>
  | ActionType<typeof selectEndingDate.request>
  | ActionType<typeof selectTagIds.request>;

export type FiltersState = Readonly<{
  repositoryIds: number[];
  requesterIds: string[];
  commentorIds: string[];
  startingDate: Date | string | null; // string if value comes from local Storage after persisting
  endingDate: Date | string | null; // string if value comes from local Storage after persisting
  tagIds: string[];
}>;

const initialState: FiltersState = {
  repositoryIds: [],
  requesterIds: [],
  commentorIds: [],
  startingDate: null,
  endingDate: null,
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
    case getType(selectStartingDate.request):
      return {
        ...state,
        startingDate: typedAction.payload.startingDate,
      };
    case getType(selectEndingDate.request):
      return {
        ...state,
        endingDate: typedAction.payload.endingDate,
      };
    default:
      return state;
  }
};

export default reducer;
