import { ActionType, getType } from 'typesafe-actions';

import { AnyAction } from 'redux';
import { selectRepositoryIds, selectDevIds } from './filters.actions';

export type FiltersAction =
  | ActionType<typeof selectRepositoryIds.request>
  | ActionType<typeof selectDevIds.request>;

export type FiltersState = Readonly<{
  repositoryIds: number[];
  devIds: number[];
}>;

const initialState: FiltersState = {
  repositoryIds: [],
  devIds: [],
};

const reducer = (state: FiltersState = initialState, action: AnyAction) => {
  const typedAction = action as FiltersAction;
  switch (typedAction.type) {
    case getType(selectRepositoryIds.request):
      return {
        ...state,
        repositoryIds: typedAction.payload.repositoryIds.map(repo => parseInt(repo.value)),
      };
    case getType(selectDevIds.request):
      return {
        ...state,
        devIds: typedAction.payload.devIds.map(dev => parseInt(dev.value)),
      };
    default:
      return state;
  }
};

export default reducer;
