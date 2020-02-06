import { RootState } from 'redux/types';

export const getSelectedRepositoryIds = (store: RootState): number[] => store.filters.repositoryIds;

export const getSelectedDevIds = (store: RootState): number[] => store.filters.devIds;
