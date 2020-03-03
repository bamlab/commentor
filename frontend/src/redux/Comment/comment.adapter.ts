import { chain } from 'lodash';
import { CommentType } from './comment.types';
import { FiltersState } from '../Filters';

export const filterComments = (comments: CommentType[], filters: FiltersState): CommentType[] =>
  chain(comments)
    .filter(
      comment =>
        filters.requesterIds.includes(comment.requester) || !(filters.requesterIds.length > 0),
    )
    .filter(
      comment =>
        filters.commentorIds.includes(comment.commentor) || !(filters.commentorIds.length > 0),
    )
    .orderBy('creationDate', 'desc')
    .value();
