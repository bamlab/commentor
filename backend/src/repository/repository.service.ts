import { Injectable } from '@nestjs/common';

import { CommentService } from '../comment/comment.service';
import { RepositoryDto } from './interfaces/Repository.dto';

@Injectable()
export class RepositoryService {
  constructor(private readonly commentService: CommentService) {}
  getUserCommentedRepositories = async (githubRepositories: any[]): Promise<RepositoryDto[]> => {
    console.log('HAHAHA', githubRepositories);
    const promiseList = githubRepositories
      ? githubRepositories.map(async repository => {
          const isRepositoryLinkedToExistingComment = await this.commentService.checkIfCommentsExistForRepository(
            repository.id,
          );
          if (true) {
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
