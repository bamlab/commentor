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

export const deleteTag = createAsyncAction(
  'Tag/DELETE_TAG_REQUEST',
  'Tag/DELETE_TAG_SUCCESS',
  'Tag/DELETE_TAG_FAILURE',
)<
  {
    tagId: number;
  },
  {
    tagId: number;
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
    color: string;
    description: string;
  },
  {
    tag: TagType;
  },
  {
    errorMessage: string;
  }
>();

export const updateTag = createAsyncAction(
  'Tag/UPDATE_TAG_REQUEST',
  'Tag/UPDATE_TAG_SUCCESS',
  'Tag/UPDATE_TAG_FAILURE',
)<
  {
    tagId: number;
    code: string;
    description: string;
    color: string;
  },
  {
    tag: TagType;
  },
  {
    errorMessage: string;
  }
>();

export const selectTag = createAsyncAction(
  'Tag/SELECT_TAG_REQUEST',
  'Tag/SELECT_TAG_SUCCESS',
  'Tag/SELECT_TAG_FAILURE',
)<
  {
    tagId: number | null;
  },
  {
    // not used
  },
  {
    // not used
  }
>();
export default { loadTags, addTag, deleteTag, updateTag };
