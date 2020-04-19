import { RootState } from 'redux/types';
import { FiltersState } from './filters.reducer';
import { formatStringOrDateToDate } from '../../services/date/dateFormatter';
import { isNil } from 'lodash';

export const getSelectedRepositoryIds = (store: RootState): number[] => store.filters.repositoryIds;

export const getSelectedRequesterIds = (store: RootState): string[] => store.filters.requesterIds;

export const getSelectedCommentords = (store: RootState): string[] => store.filters.commentorIds;

export const getSelectedTagCodes = (store: RootState): string[] => store.filters.tagCodes || [];

export const getSelectedStartingDate = (store: RootState): Date | null => {
  if (isNil(store.filters.startingDate)) return null;
  return formatStringOrDateToDate(store.filters.startingDate);
};

export const getSelectedEndingDate = (store: RootState): Date | null => {
  if (isNil(store.filters.endingDate)) return null;
  return formatStringOrDateToDate(store.filters.endingDate);
};

export const getFilters = (store: RootState): FiltersState => store.filters;
