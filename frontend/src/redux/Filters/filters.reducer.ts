import { ActionType, getType } from 'typesafe-actions';

import { AnyAction } from 'redux';
import {
  selectRepositoryIds,
  selectRequesterIds,
  selectCommentorIds,
  selectStartingDate,
  selectEndingDate,
  selectTagCodes,
} from './filters.actions';

export type FiltersAction =
  | ActionType<typeof selectRepositoryIds.request>
  | ActionType<typeof selectRequesterIds.request>
  | ActionType<typeof selectCommentorIds.request>
  | ActionType<typeof selectStartingDate.request>
  | ActionType<typeof selectEndingDate.request>
  | ActionType<typeof selectTagCodes.request>;

export type FiltersState = Readonly<{
  repositoryIds: number[];
  requesterIds: string[];
  commentorIds: string[];
  startingDate: Date | string | null; // string if value comes from local Storage after persisting
  endingDate: Date | string | null; // string if value comes from local Storage after persisting
  tagCodes: string[]; // Best effort keys
}>;

const today = new Date();
today.setHours(0, 0, 0, 0);
const lastWeek = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);

const initialState: FiltersState = {
  repositoryIds: [],
  requesterIds: [],
  commentorIds: [],
  startingDate: lastWeek,
  endingDate: today,
  tagCodes: [],
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
    case getType(selectTagCodes.request):
      return {
        ...state,
        tagCodes: typedAction.payload.tagCodes.map(tag => tag.label),
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
