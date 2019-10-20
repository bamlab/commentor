import { ProjectType } from 'redux/Project';
import { ISelectedOptionsType } from '../../redux/Filters/filters.type';

//to do
export const adaptProjectToMultiSelectOptions = (projects: ProjectType[]): ISelectedOptionsType[] =>
  projects.map(item => ({
    value: item.repositoryId.toString(),
    label: item.repositoryId.toString(),
  }));
