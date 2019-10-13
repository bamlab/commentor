import { RootState } from 'redux/types';

export const getTags = (store: RootState) => store.tag.tags;
export const getTagById = (store: RootState, id: number) =>
  store.tag.tags.find(tag => tag.id === id);

export const isTagLoading = (store: RootState) => store.tag.isLoading;
