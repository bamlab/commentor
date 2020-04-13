import { Controller, Body, Post } from '@nestjs/common';
import { isNil } from 'lodash';

import { CommentEvent, FiltersType } from './interfaces/comment.dto';
import { Comment } from './comment.entity';
import { CommentService } from './comment.service';
import { Crud, CrudController, Override } from '@nestjsx/crud';
import { GithubRepositoriesFilter } from '../auth/decorators/githubRepositoriesFilter.decorator';

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
    filters: FiltersType,
    @GithubRepositoriesFilter() filteredGithubRepositoriesIds: number[],
  ): Promise<Comment[]> {
    if (filteredGithubRepositoriesIds && filteredGithubRepositoriesIds.length > 0) {
      const startingDateFilter = isNil(filters.startingDate)
        ? FIRST_COMMENT_DATE
        : filters.startingDate;
      const endingDateFilter = isNil(filters.endingDate) ? new Date() : filters.endingDate;

      return this.service.getCommentsWithFilters({
        repositoriesIds: filteredGithubRepositoriesIds,
        startingDate: startingDateFilter,
        endingDate: endingDateFilter,
        requesterIds: filters.requesterIds,
        commentorIds: filters.commentorIds,
      });
    } else {
      return [];
    }
  }

  @Override()
  createOne(@Body() commentEvent: CommentEvent) {
    return this.service.receiveCommentEvent({
      action: commentEvent.action,
      comment: {
        body: commentEvent.comment.body,
        filePath: commentEvent.comment.path,
        url: commentEvent.comment.html_url,
        commentor: commentEvent.comment.user.login,
        requester: commentEvent.pull_request.user.login,
        pullRequestUrl: commentEvent.pull_request.html_url,
        repositoryId: commentEvent.repository.id,
      },
    });
  }
}
