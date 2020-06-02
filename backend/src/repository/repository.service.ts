import { Injectable } from '@nestjs/common';

import { CommentService } from '../comment/comment.service';
import { RepositoryDto } from './interfaces/Repository.dto';

@Injectable()
export class RepositoryService {
  constructor(private readonly commentService: CommentService) {}
  getUserCommentedRepositories = async (providerRepositories: any[]): Promise<RepositoryDto[]> => {
    const promiseList = providerRepositories
      ? providerRepositories.map(async repository => {
          const isRepositoryLinkedToExistingComment = await this.commentService.checkIfCommentsExistForRepository(
            repository.id,
          );
          if (isRepositoryLinkedToExistingComment) {
            return { id: repository.id, name: repository.name };
          }
          return;
        })
      : [];
    const checksAnswers = await Promise.all(promiseList);
    const repositoriesWithComments = checksAnswers.filter(repository => repository);

    return repositoriesWithComments;
  };
}
