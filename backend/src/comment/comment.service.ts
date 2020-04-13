import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In, Between } from 'typeorm';

import { Comment } from './comment.entity';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';

@Injectable()
export class CommentService extends TypeOrmCrudService<Comment> {
  constructor(@InjectRepository(Comment) private readonly commentRepository: Repository<Comment>) {
    super(commentRepository);
  }

  receiveCommentEvent = async ({
    action,
    comment,
  }: {
    action: 'created' | 'edited' | 'deleted';
    comment: Pick<
      Comment,
      'body' | 'filePath' | 'url' | 'commentor' | 'requester' | 'pullRequestUrl' | 'repositoryId'
    >;
  }) => {
    if (action === 'edited') {
      await this.commentRepository.update({ url: comment.url }, { body: comment.body });
      return;
    } else if (action === 'deleted') {
      await this.commentRepository.delete({ url: comment.url });
      return;
    } else {
      await this.commentRepository.save(comment);
      return;
    }
  };

  /**
   * @deprecated
   */
  getCommentsWithFiltersv2 = async ({
    repositoriesIds,
    startingDate,
    endingDate,
    requestersIds,
  }: {
    repositoriesIds: number[];
    startingDate: Date;
    endingDate: Date;
    requestersIds: string[];
  }): Promise<Comment[]> => {
    const filteredComments = await this.commentRepository.find({
      where: {
        repositoryId: repositoriesIds.length > 0 ? In(repositoriesIds) : null,
        creationDate: Between(startingDate, endingDate),
        requesterId: requestersIds.length > 0 ? In(requestersIds) : undefined,
      },
    });
    return filteredComments;
  };

  getCommentsWithFilters = async ({
    repositoriesIds,
    startingDate,
    endingDate,
    requestersIds,
  }: {
    repositoriesIds: number[];
    startingDate: Date;
    endingDate: Date;
    requestersIds: string[];
  }): Promise<Comment[]> => {
    const query = this.commentRepository.createQueryBuilder('comments');
    query
      .where('comments.repositoryId IN (:...arr)', { arr: repositoriesIds })
      .andWhere('comments.creationDate BETWEEN :startingDate AND :endingDate', {
        startingDate,
        endingDate,
      });

    if (requestersIds.length > 0) {
      query.andWhere('comments.requester IN (:...requesters)', { requesters: requestersIds });
    }
    const filteredComments = await query.getMany();
    return filteredComments;
  };

  checkIfCommentsExistForRepository = async (repositoryId: number): Promise<boolean> => {
    const commentForRepository = await this.commentRepository.findOne({
      where: { repositoryId },
    });
    return !!commentForRepository;
  };
}
