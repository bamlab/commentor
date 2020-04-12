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
  }: {
    repositoriesIds: number[];
    startingDate: Date;
    endingDate: Date;
  }): Promise<Comment[]> => {
    const filteredComments = await this.commentRepository.find({
      where: {
        repositoryId: repositoriesIds.length > 0 ? In(repositoriesIds) : null,
        creationDate: Between(startingDate, endingDate),
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
