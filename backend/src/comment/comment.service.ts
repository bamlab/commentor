import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

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

  getAvailableProjectIdsFromComments = async (): Promise<number[]> => {
    const availableProjectsId = await this.commentRepository
      .createQueryBuilder()
      .select('DISTINCT "repositoryId"')
      .getRawMany();

    return availableProjectsId.map(project => project.repositoryId);
  };
}
