import { ProjectType } from 'redux/Project';
import { ISelectedOptionsType } from './MultiSelect.type';

//to do
export const adaptProjectToMultiSelectOptions = (projects: ProjectType[]): ISelectedOptionsType[] =>
  projects.map(item => ({
    value: item.repositoryId.toString(),
    label: item.repositoryId.toString(),
  }));

export const adaptOptionFromId = (
  projectsId: number[],
  projects: ProjectType[],
): ISelectedOptionsType[] => {
  let result: ISelectedOptionsType[] = [];
  projects.forEach(item => {
    if (projectsId.includes(item.repositoryId)) {
      result.push({
        value: item.repositoryId.toString(),
        label: item.repositoryId.toString(),
      });
    }
  });
  return result;
};
