import { createAsyncAction } from 'typesafe-actions';
import { ISelectedOptionsType } from '../../components/MultiSelect/MultiSelect.type';

export const selectRepositoryIds = createAsyncAction(
  'Filters/SELECT_REPOSITORY_IDS_REQUEST',
  'Filters/SELECT_REPOSITORY_IDS_SUCCESS',
  'Filters/SELECT_REPOSITORY_IDS_FAILURE',
)<
  {
    repositoryIds: ISelectedOptionsType[];
  },
  {
    // not used
  },
  {
    // not used
  }
>();

export default { selectRepositoryIds };
