import { RootState } from 'redux/types';

export const getTags = (store: RootState) => store.tag.tags;
export const getSelectedTagId = (store: RootState) => store.tag.selectedTagId;

export const isTagLoading = (store: RootState) => store.tag.isLoading;
