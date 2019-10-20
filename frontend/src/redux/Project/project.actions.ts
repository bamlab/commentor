import { createAsyncAction } from 'typesafe-actions';
import { ProjectType } from './project.types';

export const loadProjects = createAsyncAction(
  'Tag/GET_PROJECTS_REQUEST',
  'Tag/GET_PROJECTS_SUCCESS',
  'Tag/GET_PROJECTS_FAILURE',
)<
  {},
  {
    projects: ProjectType[];
  },
  {
    errorMessage: string;
  }
>();

export default { loadProjects };
