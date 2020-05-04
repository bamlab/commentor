import { RootState } from '../types';
import { RequesterType, CommentorType, PieChartData } from './comment.types';

export const getComments = (store: RootState) => store.comment.comments || [];

export const isCommentLoading = (store: RootState) => store.comment.isLoading;

export const getAvailableRequestersFromComments = (store: RootState): RequesterType[] =>
  store.comment.availableRequesters || [];

export const getAvailableCommentorsFromComments = (store: RootState): CommentorType[] =>
  store.comment.availableCommentors || [];

export const getPieChartData = (store: RootState): PieChartData[] =>
  store.comment.pieChartData || [];
