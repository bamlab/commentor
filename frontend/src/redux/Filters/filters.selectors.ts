import { RootState } from 'redux/types';
import { FiltersState } from './filters.reducer';

export const getSelectedRepositoryIds = (store: RootState): number[] => store.filters.repositoryIds;

export const getSelectedRequesterIds = (store: RootState): string[] => store.filters.requesterIds;

export const getSelectedCommentords = (store: RootState): string[] => store.filters.commentorIds;

export const getSelectedTagIds = (store: RootState): string[] => store.filters.tagIds;

export const getFilters = (store: RootState): FiltersState => store.filters;
