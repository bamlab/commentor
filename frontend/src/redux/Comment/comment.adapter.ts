import { CommentType } from './comment.types';
import { FetchedCommentType } from '../../services/networking/client.interface';
import { formatStringOrDateToDate } from '../../services/date/dateFormatter';

export const formatFetchedCommentForAppType = (comments: FetchedCommentType[]): CommentType[] => {
  return comments.map(comment => ({
    ...comment,
    creationDate: formatStringOrDateToDate(comment.creationDate),
  }));
};
