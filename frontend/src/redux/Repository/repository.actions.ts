import { createAsyncAction } from 'typesafe-actions';
import { RepositoryType } from './repository.types';

export const loadProjects = createAsyncAction(
  'Tag/GET_PROJECTS_REQUEST',
  'Tag/GET_PROJECTS_SUCCESS',
  'Tag/GET_PROJECTS_FAILURE',
)<
  {},
  {
    projects: RepositoryType[];
  },
  {
    errorMessage: string;
  }
>();

export default { loadProjects };
