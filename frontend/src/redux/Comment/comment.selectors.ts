import { RootState } from 'redux/types';

export const getComments = (store: RootState) => store.comment.comments;

export const isCommentLoading = (store: RootState) => store.comment.isLoading;
