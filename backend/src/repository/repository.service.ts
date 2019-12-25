import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as request from 'request-promise';

import { Repository as RepositoryEntity } from './repository.entity';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { GithubAnswer, GithubRepository } from './interfaces/repository.dto';
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
  getUserRepositories = async (
    userToken: string = '0235579edc0b7ac8086647a14a2b6a3bbb4c7532',
    previousPageUserRepositories: GithubRepository[] = [],
    previousPageCursor?: string,
  ): Promise<RepositoryEntity[]> => {
    const query = `
      query {
        viewer {
          repositories(first: 100, ownerAffiliations: [OWNER, COLLABORATOR, ORGANIZATION_MEMBER] ${
            previousPageCursor ? `, after:"${previousPageCursor}"` : ''
          }) {
            totalCount
            pageInfo {
              endCursor
              hasNextPage
            }
            nodes {
              databaseId,
              name
            }
          }
        }
      }
    `;
    const githubAnswer: GithubAnswer = await request({
      uri: 'https://api.github.com/graphql',
      headers: {
        Authorization: `bearer ${userToken}`,
        'User-Agent': 'Request-Promise',
      },
      method: 'POST',
      json: true,
      body: {
        query,
      },
    });

    const repositoriesList = previousPageUserRepositories.concat(
      githubAnswer.data.viewer.repositories.nodes,
    );
    const pageInfo = githubAnswer.data.viewer.repositories.pageInfo;
    if (pageInfo.hasNextPage) {
      return this.getUserRepositories(userToken, repositoriesList, pageInfo.endCursor);
    }

    const promiseList = repositoriesList.map(async repository => {
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
