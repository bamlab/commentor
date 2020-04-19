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

  getCommentsWithFilters = async ({
    repositoriesIds,
    startingDate,
    endingDate,
    requesterIds,
    commentorIds,
    tagCodes,
  }: {
    repositoriesIds: number[];
    startingDate: Date;
    endingDate: Date;
    requesterIds: string[];
    commentorIds: string[];
    tagCodes: string[];
  }): Promise<Comment[]> => {
    const query = this.commentRepository.createQueryBuilder('comments');
    query
      .where('comments.repositoryId IN (:...arr)', { arr: repositoriesIds })
      .where('comments.creationDate BETWEEN :startingDate AND :endingDate', {
        startingDate,
        endingDate,
      });

    if (requesterIds.length > 0) {
      query.where('comments.requester IN (:...requesters)', { requesters: requesterIds });
    }
    if (commentorIds.length > 0) {
      query.where('comments.commentor IN (:...commentors)', { commentors: commentorIds });
    }
    if (tagCodes.length > 0) {
      query.andWhere(`comments.body ILIKE '%${tagCodes[0]}%'`);
      if (tagCodes.length > 1) {
        tagCodes.shift();
        tagCodes.forEach(item => {
          query.orWhere(`comments.body ILIKE '%${item}%'`);
        });
      }
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
