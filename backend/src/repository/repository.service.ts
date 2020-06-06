import { Injectable } from '@nestjs/common';

import { CommentService } from '../comment/comment.service';
import { RepositoryDto } from './interfaces/Repository.dto';

@Injectable()
export class RepositoryService {
  constructor(private readonly commentService: CommentService) {}
  getUserCommentedRepositories = async (
    providerRepositories?: RepositoryDto[],
  ): Promise<RepositoryDto[]> => {
    const promiseList = providerRepositories
      ? providerRepositories.map(async repository => {
          const isRepositoryLinkedToExistingComment = await this.commentService.checkIfCommentsExistForRepository(
            repository.id,
          );
          if (isRepositoryLinkedToExistingComment) {
            return repository;
          }
          return;
        })
      : [];
    const checksAnswers = await Promise.all(promiseList);
    const repositoriesWithComments = checksAnswers.filter(repository => repository);

    return repositoriesWithComments;
  };
}
