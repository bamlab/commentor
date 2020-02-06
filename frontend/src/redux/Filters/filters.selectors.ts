import { RootState } from 'redux/types';

export const getSelectedRepositoryIds = (store: RootState): number[] => store.filters.repositoryIds;

export const getSelectedRequesterIds = (store: RootState): string[] => store.filters.requesterIds;
