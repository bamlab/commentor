import { ProjectType } from 'redux/Project';
import { ISelectedOptionsType } from './MultiSelect.type';

//to do
export const adaptProjectToMultiSelectOptions = (projects: ProjectType[]): ISelectedOptionsType[] =>
  projects.map(item => ({
    value: item.id.toString(),
    label: item.name,
  }));

export const adaptOptionFromId = (
  projectsId: number[],
  projects: ProjectType[],
): ISelectedOptionsType[] => {
  let result: ISelectedOptionsType[] = [];
  projects.forEach(item => {
    if (projectsId.includes(item.id)) {
      result.push({
        value: item.id.toString(),
        label: item.name,
      });
    }
  });
  return result;
};
