import { Brackets, SelectQueryBuilder } from 'typeorm';
import { Comment } from './comment.entity';

export const tagCodesCommentQueryDecorator = (
  query: SelectQueryBuilder<Comment>,
  tagCodes: string[],
) => {
  if (tagCodes.length > 0) {
    query.andWhere(
      new Brackets(qb => {
        qb.where(`Comments.body ILIKE '%${tagCodes[0]}%'`);
        if (tagCodes.length > 1) {
          tagCodes.shift();
          tagCodes.forEach(item => {
            qb.orWhere(`Comments.body ILIKE '%${item}%'`);
          });
        }
      }),
    );
  }
};

export const requesterIdsCommentQueryDecorator = (
  query: SelectQueryBuilder<Comment>,
  requesterIds: string[],
) => {
  if (requesterIds.length > 0) {
    query.andWhere('comments.requester IN (:...requesters)', { requesters: requesterIds });
  }
};

export const commentorIdsCommentQueryDecorator = (
  query: SelectQueryBuilder<Comment>,
  commentorIds: string[],
) => {
  if (commentorIds.length > 0) {
    query.andWhere('comments.commentor IN (:...commentors)', { commentors: commentorIds });
  }
};

export const dateFilterCommentQueryDecorator = (
  query: SelectQueryBuilder<Comment>,
  startingDate: Date,
  endingDate: Date,
) => {
  query.andWhere('comments.creationDate BETWEEN :startingDate AND :endingDate', {
    startingDate,
    endingDate,
  });
};

export const repositoriesIdsFilterCommentQueryDecorator = (
  query: SelectQueryBuilder<Comment>,
  repositoriesIds: number[],
) => {
  query.andWhere('comments.repositoryId IN (:...arr)', { arr: repositoriesIds });
};
