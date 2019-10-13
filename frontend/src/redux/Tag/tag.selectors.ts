import { RootState } from 'redux/types';
import { TagType } from './tag.types';

export const getTags = (store: RootState) => store.tag.tags;
export const getSelectedTagId = (store: RootState) => store.tag.selectedTagId;
export const getErrorMessage = (store: RootState) => store.tag.tagError;
export const isTagLoading = (store: RootState) => store.tag.isLoading;

export const getSelectedTag = (store: RootState): TagType =>
  store.tag.tags.find(tag => tag.id === store.tag.selectedTagId) || {
    id: -1,
    color: '#000000',
    code: 'error',
    description: 'error',
    creationDate: new Date(),
  };
