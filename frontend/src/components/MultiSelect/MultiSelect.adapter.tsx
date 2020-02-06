import { RepositoryType } from '../../redux/Repository/repository.types';
import { ISelectedOptionsType } from './MultiSelect.type';
import { DevType } from '../../redux/Comment';

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

export const adaptSelectedDevsFromIds = (
  selectedDevs: string[],
  devs: DevType[],
): ISelectedOptionsType[] => {
  let result: ISelectedOptionsType[] = [];
  devs.forEach(dev => {
    if (selectedDevs.includes(dev)) {
      result.push({
        value: dev,
        label: dev,
      });
    }
  });
  return result;
};

export const adaptDevToMultiSelectOptions = (devs: DevType[]): ISelectedOptionsType[] =>
  devs.map(dev => ({
    value: dev,
    label: dev,
  }));
