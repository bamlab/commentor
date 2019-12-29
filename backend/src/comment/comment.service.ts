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

  getCommentsFilteredByRepositoriesIds = async (repositoriesIds: number[]): Promise<Comment[]> => {
    const filteredComments = await this.commentRepository.find({
      where: {
        repositoryId: repositoriesIds.length > 0 ? In(repositoriesIds) : null,
      },
    });

    return filteredComments;
  };

  checkIfCommentsExistForRepository = async (repositoryId: number): Promise<boolean> => {
    const commentForRepository = await this.commentRepository.findOne({
      where: { repositoryId },
    });
    return !!commentForRepository;
  };
}
