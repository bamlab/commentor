import { RepositoryType } from '../../redux/Repository/repository.types';
import { ISelectedOptionsType } from './MultiSelect.type';

//to do
export const adaptRepositoryToMultiSelectOptions = (
  repositories: RepositoryType[],
): ISelectedOptionsType[] =>
  repositories.map(repo => ({
    value: repo.id.toString(),
    label: repo.name,
  }));

export const adaptOptionFromId = (
  repositoryIds: number[],
  repositories: RepositoryType[],
): ISelectedOptionsType[] => {
  let result: ISelectedOptionsType[] = [];
  repositories.forEach(repo => {
    if (repositoryIds.includes(repo.id)) {
      result.push({
        value: repo.id.toString(),
        label: repo.name,
      });
    }
  });
  return result;
};
