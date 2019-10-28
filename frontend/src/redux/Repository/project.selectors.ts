import { RootState } from 'redux/types';
import { ProjectType } from './project.types';

export const getProjects = (store: RootState): ProjectType[] => store.project.projects;
