import { RootState } from 'redux/types';
import { ProjectType } from './repository.types';

export const getProjects = (store: RootState): ProjectType[] => store.project.projects;
