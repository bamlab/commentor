import { Controller, Body, Post } from '@nestjs/common';
import { intersection } from 'lodash';

import { CommentEvent } from './interfaces/comment.dto';
import { Comment } from './comment.entity';
import { CommentService } from './comment.service';
import { Crud, CrudController, Override } from '@nestjsx/crud';
import { GithubRepositories } from 'src/repository/decorators/githubRepositories.decorator';
import { GithubRepository } from 'src/repository/interfaces/GithubRepositoriesAnswer';

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
    @Body() filters: { repositoryIds: number[] },
    @GithubRepositories() githubRepositories: GithubRepository[],
  ): Promise<Comment[]> {
    const githubRepositoriesIds = githubRepositories.map(repository => repository.databaseId);
    const authorizedRepositoriesIds = intersection(githubRepositoriesIds, filters.repositoryIds);
    return this.service.getCommentsFilteredByRepositoriesIds(authorizedRepositoriesIds);
  }

  @Override()
  createOne(@Body() commentEvent: CommentEvent) {
    return this.service.createComment({
      body: commentEvent.comment.body,
      filePath: commentEvent.comment.path,
      url: commentEvent.comment.url,
      commentor: commentEvent.comment.user.login,
      requester: commentEvent.pull_request.user.login,
      pullRequestUrl: commentEvent.pull_request.url,
      repositoryId: commentEvent.repository.id,
    });
  }
}
