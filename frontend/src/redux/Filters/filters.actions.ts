import { createAsyncAction } from 'typesafe-actions';
import { ISelectedOptionsType } from './filters.type';

export const selectProjectIds = createAsyncAction(
  'Filters/SELECT_PROJECT_IDS_REQUEST',
  'Filters/SELECT_PROJECT_IDS_SUCCESS',
  'Filters/SELECT_PROJECT_IDS_FAILURE',
)<
  {
    selectedProjectIds: ISelectedOptionsType[];
  },
  {
    // not used
  },
  {
    // not used
  }
>();

export default { selectProjectIds };
