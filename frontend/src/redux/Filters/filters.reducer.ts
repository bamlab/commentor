import { ActionType, getType } from 'typesafe-actions';

import { AnyAction } from 'redux';
import { selectRepositoryIds, selectRequesterIds } from './filters.actions';

export type FiltersAction =
  | ActionType<typeof selectRepositoryIds.request>
  | ActionType<typeof selectRequesterIds.request>;

export type FiltersState = Readonly<{
  repositoryIds: number[];
  requesterIds: string[];
}>;

const initialState: FiltersState = {
  repositoryIds: [],
  requesterIds: [],
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
    default:
      return state;
  }
};

export default reducer;
