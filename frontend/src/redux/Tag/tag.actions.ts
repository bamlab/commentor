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

export const addTag = createAsyncAction(
  'Tag/ADD_TAG_REQUEST',
  'Tag/ADD_TAG_SUCCESS',
  'Tag/ADD_TAG_FAILURE',
)<
  {
    code: string;
    description: string;
  },
  {
    tag: TagType;
  },
  {
    errorMessage: string;
  }
>();

export default { loadTags, addTag };
