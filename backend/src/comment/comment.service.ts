import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Comment } from './comment.entity';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import {
  tagCodesCommentQueryDecorator,
  requesterIdsCommentQueryDecorator,
  commentorIdsCommentQueryDecorator,
  dateFilterCommentQueryDecorator,
  repositoriesIdsFilterCommentQueryDecorator,
} from './comment.decorator';

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
    repositoriesIdsFilterCommentQueryDecorator(query, repositoriesIds);
    dateFilterCommentQueryDecorator(query, startingDate, endingDate);
    requesterIdsCommentQueryDecorator(query, requesterIds);
    commentorIdsCommentQueryDecorator(query, commentorIds);
    tagCodesCommentQueryDecorator(query, tagCodes);
    query.orderBy('comments.creationDate', 'DESC');

    const sql = query.getSql();
    console.log('SQL', sql);
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
