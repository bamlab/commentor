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

export const selectRequesterIds = createAsyncAction(
  'Filters/SELECT_REQUESTER_IDS_REQUEST',
  'Filters/SELECT_REQUESTER_IDS_SUCCESS',
  'Filters/SELECT_REQUESTER_IDS_FAILURE',
)<
  {
    requesterIds: ISelectedOptionsType[];
  },
  {
    // not used
  },
  {
    // not used
  }
>();

export const selectCommentorIds = createAsyncAction(
  'Filters/SELECT_COMMENTOR_IDS_REQUEST',
  'Filters/SELECT_COMMENTOR_IDS_SUCCESS',
  'Filters/SELECT_COMMENTOR_IDS_FAILURE',
)<
  {
    commentorIds: ISelectedOptionsType[];
  },
  {
    // not used
  },
  {
    // not used
  }
>();

export default { selectRepositoryIds, selectRequesterIds, selectCommentorIds };
