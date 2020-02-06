import { RepositoryType } from '../../redux/Repository/repository.types';
import { ISelectedOptionsType } from './MultiSelect.type';
import { RequesterType } from '../../redux/Comment';

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

export const adaptSelectedRequestersFromIds = (
  selectedRequesters: string[],
  requesters: RequesterType[],
): ISelectedOptionsType[] => {
  let result: ISelectedOptionsType[] = [];
  requesters.forEach(requester => {
    if (selectedRequesters.includes(requester)) {
      result.push({
        value: requester,
        label: requester,
      });
    }
  });
  return result;
};

export const adaptRequesterToMultiSelectOptions = (requesters: RequesterType[]): ISelectedOptionsType[] =>
  requesters.map(requester => ({
    value: requester,
    label: requester,
  }));
