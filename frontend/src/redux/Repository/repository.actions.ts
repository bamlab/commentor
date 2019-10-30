import { createAsyncAction } from 'typesafe-actions';
import { RepositoryType } from './repository.types';

export const loadRepositories = createAsyncAction(
  'Tag/GET_REPOSITORIES_REQUEST',
  'Tag/GET_REPOSITORIES_SUCCESS',
  'Tag/GET_REPOSITORIES_FAILURE',
)<
  {},
  {
    repositories: RepositoryType[];
  },
  {
    errorMessage: string;
  }
>();

export default { loadRepositories };
