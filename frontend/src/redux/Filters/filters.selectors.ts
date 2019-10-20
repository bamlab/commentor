import { RootState } from 'redux/types';
import { ISelectedOptionsType } from './filters.type';

export const getSelectedProjectIds = (store: RootState): ISelectedOptionsType[] =>
  store.filters.selectedProjectIds;
