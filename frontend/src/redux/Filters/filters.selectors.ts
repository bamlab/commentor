import { RootState } from 'redux/types';

export const getSelectedProjectIds = (store: RootState): number[] =>
  store.filters.selectedProjectIds;
