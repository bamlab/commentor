import { createAsyncAction } from 'typesafe-actions';
import { TagType } from './tag.types';

export const loadTags = createAsyncAction(
  'Tag/GET_TAGS_REQUEST',
  'Tag/GET_TAGS_SUCCESS',
  'Tag/GET_TAGS_FAILURE',
)<
  {},
  {
    tags: TagType[];
  },
  {
    errorMessage: string;
  }
>();

export default { loadTags };
