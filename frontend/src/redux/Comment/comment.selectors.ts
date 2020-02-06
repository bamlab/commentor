import { RootState } from 'redux/types';
import { DevType } from './comment.types';

export const getComments = (store: RootState) => store.comment.comments;

export const isCommentLoading = (store: RootState) => store.comment.isLoading;

export const getAvailableDevsFromComments = (store: RootState): DevType[] => store.comment.availableDevs;
