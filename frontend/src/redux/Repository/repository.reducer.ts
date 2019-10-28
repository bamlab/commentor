import { ActionType, getType } from 'typesafe-actions';

import { AnyAction } from 'redux';
import { RepositoryType } from './repository.types';
import { loadRepositories } from './repository.actions';

export type ProjectAction = ActionType<
  typeof loadRepositories.success | typeof loadRepositories.failure | typeof loadRepositories
>;

export type ProjectState = Readonly<{
  projects: RepositoryType[];
  projectError: string | null;
  isLoading: boolean;
}>;

const initialState: ProjectState = {
  projects: [],
  projectError: null,
  isLoading: false,
};

const reducer = (state: ProjectState = initialState, action: AnyAction) => {
  const typedAction = action as ProjectAction;
  switch (typedAction.type) {
    case getType(loadRepositories.success):
      return {
        ...state,
        projects: typedAction.payload.projects,
        isLoading: false,
        tagError: null,
      };
    case getType(loadRepositories.failure):
      return {
        ...state,
        projectError: typedAction.payload.errorMessage,
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
