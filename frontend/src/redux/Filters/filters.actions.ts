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

export const selectTagCodes = createAsyncAction(
  'Filters/SELECT_TAG_CODES_REQUEST',
  'Filters/SELECT_TAG_CODES_SUCCESS',
  'Filters/SELECT_TAG_CODES_FAILURE',
)<
  {
    tagCodes: ISelectedOptionsType[];
  },
  {
    // not used
  },
  {
    // not used
  }
>();

export const selectStartingDate = createAsyncAction(
  'Filters/SELECT_STARTING_DATE_REQUEST',
  'Filters/SELECT_STARTING_DATE_SUCCESS',
  'Filters/SELECT_STARTING_DATE_FAILURE',
)<
  {
    startingDate: Date | null;
  },
  {
    // not used
  },
  {
    // not used
  }
>();

export const selectEndingDate = createAsyncAction(
  'Filters/SELECT_ENDING_DATE_REQUEST',
  'Filters/SELECT_ENDING_DATE_SUCCESS',
  'Filters/SELECT_ENDING_DATE_FAILURE',
)<
  {
    endingDate: Date | null;
  },
  {
    // not used
  },
  {
    // not used
  }
>();

export default {
  selectRepositoryIds,
  selectRequesterIds,
  selectCommentorIds,
  selectTagCodes,
  selectStartingDate,
  selectEndingDate,
};
