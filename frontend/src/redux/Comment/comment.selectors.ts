import { RootState } from 'redux/types';

export const getComments = (store: RootState) => store.comment.comments;
