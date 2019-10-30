import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';

import { Comment } from './comment.entity';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';

@Injectable()
export class CommentService extends TypeOrmCrudService<Comment> {
  constructor(@InjectRepository(Comment) private readonly commentRepository: Repository<Comment>) {
    super(commentRepository);
  }

  createComment = async (
    comment: Pick<
      Comment,
      'body' | 'filePath' | 'url' | 'commentor' | 'requester' | 'pullRequestUrl' | 'repositoryId'
    >,
  ) => {
    const createdComment = await this.commentRepository.save(comment);
    return createdComment;
  };

  getFilteredComments = async (filters: { repositoryIds: number[] }): Promise<Comment[]> => {
    const filteredComments = await this.commentRepository.find({
      where: {
        repositoryId: filters.repositoryIds.length > 0 ? In(filters.repositoryIds) : null,
      },
    });

    return filteredComments;
  };
}
