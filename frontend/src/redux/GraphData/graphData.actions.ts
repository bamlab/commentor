import { createAsyncAction } from 'typesafe-actions';
import { TagsOverTimeType } from './graphData.types';

export const loadTagsOverTime = createAsyncAction(
  'Tag/GET_TAGS_OVER_TIME_REQUEST',
  'Tag/GET_TAGS_OVER_TIME_SUCCESS',
  'Tag/GET_TAGS_OVER_TIME_FAILURE',
)<
  {},
  {
    tagsOverTime: TagsOverTimeType;
  },
  {
    errorMessage: string;
  }
>();

export default { loadTagsOverTime };
