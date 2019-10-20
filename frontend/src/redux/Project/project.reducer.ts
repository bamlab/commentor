import { ActionType, getType } from 'typesafe-actions';

import { AnyAction } from 'redux';
import { ProjectType } from './project.types';
import { loadProjects } from './project.actions';

export type ProjectAction = ActionType<
  typeof loadProjects.success | typeof loadProjects.failure | typeof loadProjects
>;

export type ProjectState = Readonly<{
  projects: ProjectType[];
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
    case getType(loadProjects.success):
      return {
        ...state,
        projects: typedAction.payload.projects,
        isLoading: false,
        tagError: null,
      };
    case getType(loadProjects.failure):
      return {
        ...state,
        projectError: typedAction.payload.errorMessage,
        isLoading: false,
      };
    case getType(loadProjects.request):
      return {
        ...state,
        isLoading: true,
      };
    default:
      return state;
  }
};

export default reducer;
