import { Controller, Body, Post } from '@nestjs/common';
import { intersection, isNil } from 'lodash';

import { CommentEvent } from './interfaces/comment.dto';
import { Comment } from './comment.entity';
import { CommentService } from './comment.service';
import { Crud, CrudController, Override } from '@nestjsx/crud';
import { GithubRepositories } from '../auth/decorators/githubRepositories.decorator';
import { GithubRepository } from '../auth/interfaces/GithubRepositoriesAnswer';

const FIRST_COMMENT_DATE = new Date('November 03, 1994 09:24:00');

@Crud({
  model: {
    type: Comment,
  },
})
@Controller('comments')
export class CommentController implements CrudController<Comment> {
  constructor(public readonly service: CommentService) {}

  get base(): CrudController<Comment> {
    return this;
  }

  @Post('filtered')
  async getFilteredComments(
    @Body()
    filters: { repositoryIds: number[]; startingDate: Date | null; endingDate: Date | null },
    @GithubRepositories() githubRepositories: GithubRepository[],
  ): Promise<Comment[]> {
    if (githubRepositories) {
      const githubRepositoriesIds = githubRepositories.map(repository => repository.databaseId);
      const authorizedRepositoriesIds = intersection(githubRepositoriesIds, filters.repositoryIds);

      const startingDateFilter = isNil(filters.startingDate)
        ? FIRST_COMMENT_DATE
        : filters.startingDate;
      const endingDateFilter = isNil(filters.endingDate) ? new Date() : filters.endingDate;

      return this.service.getCommentsWithFilters({
        repositoriesIds: authorizedRepositoriesIds,
        startingDate: startingDateFilter,
        endingDate: endingDateFilter,
      });
    } else {
      return [];
    }
  }

  @Override()
  createOne(@Body() commentEvent: CommentEvent) {
    return this.service.createComment({
      body: commentEvent.comment.body,
      filePath: commentEvent.comment.path,
      url: commentEvent.comment.html_url,
      commentor: commentEvent.comment.user.login,
      requester: commentEvent.pull_request.user.login,
      pullRequestUrl: commentEvent.pull_request.html_url,
      repositoryId: commentEvent.repository.id,
    });
  }
}
