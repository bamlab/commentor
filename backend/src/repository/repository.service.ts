import { Injectable } from '@nestjs/common';

import { GithubRepository } from '../auth/interfaces/GithubRepositoriesAnswer';
import { CommentService } from '../comment/comment.service';
import { RepositoryDto } from './interfaces/Repository.dto';

@Injectable()
export class RepositoryService {
  constructor(private readonly commentService: CommentService) {}
  getUserCommentedRepositories = async (
    githubRepositories: GithubRepository[],
  ): Promise<RepositoryDto[]> => {
    const promiseList = githubRepositories.map(async repository => {
      const isRepositoryLinkedToExistingComment = await this.commentService.checkIfCommentsExistForRepository(
        repository.databaseId,
      );
      if (isRepositoryLinkedToExistingComment) {
        return { id: repository.databaseId, name: repository.name };
      }
      return;
    });
    const checksAnswers = await Promise.all(promiseList);
    const repositoriesWithComments = checksAnswers.filter(repository => repository);
    return repositoriesWithComments;
  };
}
