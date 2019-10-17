import { RootState } from 'redux/types';

export const getTags = (store: RootState) => store.tag.tags;
export const getSelectedTagId = (store: RootState) => store.tag.selectedTagId;
export const getErrorMessage = (store: RootState) => store.tag.tagError;
export const isTagLoading = (store: RootState) => store.tag.isLoading;
