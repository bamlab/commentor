import { ActionType, getType } from 'typesafe-actions';

import { AnyAction } from 'redux';
import { RepositoryType } from './repository.types';
import { loadRepositories } from './repository.actions';

export type RepositoryAction = ActionType<
  typeof loadRepositories.success | typeof loadRepositories.failure | typeof loadRepositories
>;

export type RepositoryState = Readonly<{
  repositories: RepositoryType[];
  repositoryError: string | null;
  isLoading: boolean;
}>;

const initialState: RepositoryState = {
  repositories: [],
  repositoryError: null,
  isLoading: false,
};

const reducer = (state: RepositoryState = initialState, action: AnyAction) => {
  const typedAction = action as RepositoryAction;
  switch (typedAction.type) {
    case getType(loadRepositories.success):
      return {
        ...state,
        repositories: typedAction.payload.repositories,
        isLoading: false,
        repositoryError: null,
      };
    case getType(loadRepositories.failure):
      return {
        ...state,
        repositoryError: typedAction.payload.errorMessage,
        isLoading: false,
      };
    case getType(loadRepositories.request):
      return {
        ...state,
        isLoading: true,
      };
    default:
      return state;
  }
};

export default reducer;
