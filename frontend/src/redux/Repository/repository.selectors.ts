import { RootState } from 'redux/types';
import { RepositoryType } from './repository.types';

export const getRepositories = (store: RootState): RepositoryType[] =>
  store.repository.repositories;
