import { ActionType, getType } from 'typesafe-actions';

import { AnyAction } from 'redux';
import { selectRepositoryIds } from './filters.actions';

export type FiltersAction = ActionType<typeof selectRepositoryIds.request>;

export type FiltersState = Readonly<{
  repositoryIds: number[];
}>;

const initialState: FiltersState = {
  repositoryIds: [],
};

const reducer = (state: FiltersState = initialState, action: AnyAction) => {
  const typedAction = action as FiltersAction;
  switch (typedAction.type) {
    case getType(selectRepositoryIds.request):
      return {
        ...state,
        repositoryIds: typedAction.payload.repositoryIds.map(repo => parseInt(repo.value)),
      };
    default:
      return state;
  }
};

export default reducer;
