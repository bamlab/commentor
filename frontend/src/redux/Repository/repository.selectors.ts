import { RootState } from 'redux/types';
import { RepositoryType } from './repository.types';

export const getProjects = (store: RootState): RepositoryType[] => store.project.projects;
