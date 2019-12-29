import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as request from 'request-promise';

import { Repository as RepositoryEntity } from './repository.entity';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { GithubRepository } from './interfaces/repository.dto';
import { CommentService } from '../comment/comment.service';

@Injectable()
export class RepositoryService extends TypeOrmCrudService<RepositoryEntity> {
  constructor(
    @InjectRepository(RepositoryEntity)
    private readonly repositoryRepository: Repository<RepositoryEntity>,
    private readonly commentService: CommentService,
  ) {
    super(repositoryRepository);
  }
  getUserCommentedRepositories = async (
    githubRepositories: GithubRepository[],
  ): Promise<RepositoryEntity[]> => {
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
