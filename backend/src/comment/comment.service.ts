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

  getAvailableProjectIdsFromComments = async (): Promise<number[]> => {
    const availableProjectsId = await this.commentRepository
      .createQueryBuilder()
      .select('DISTINCT "repositoryId"')
      .getRawMany();

    return availableProjectsId;
  };

  getFilteredProjects = async (filters: { projectIds: number[] }): Promise<Comment[]> => {
    const filteredComments = await this.commentRepository.find({
      where: {
        repositoryId: filters.projectIds.length > 0 ? In(filters.projectIds) : null,
      },
    });

    return filteredComments;
  };
}
