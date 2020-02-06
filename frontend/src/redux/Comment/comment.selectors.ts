import { RootState } from 'redux/types';
import { RequesterType } from './comment.types';

export const getComments = (store: RootState) => store.comment.comments;

export const isCommentLoading = (store: RootState) => store.comment.isLoading;

export const getAvailableDevsFromComments = (store: RootState): RequesterType[] =>
  store.comment.availableRequesters;
