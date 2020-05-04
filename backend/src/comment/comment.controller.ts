import { Controller, Body, Post, Logger } from '@nestjs/common';
import { isNil, chain } from 'lodash';

import { CommentEvent, FiltersType, GetFilteredCommentsAnswer } from './interfaces/comment.dto';
import { Comment } from './comment.entity';
import { CommentService } from './comment.service';
import { GithubRepositoriesFilter } from '../auth/decorators/githubRepositoriesFilter.decorator';
import { Tag } from '../tag/tag.entity';
import { TagService } from '../tag/tag.service';
import { GithubLogin } from '../auth/decorators/githubLogin.decorator';

const FIRST_COMMENT_DATE = new Date('November 03, 1994 09:24:00');

@Controller('comments')
export class CommentController {
  constructor(public readonly service: CommentService, public readonly tagService: TagService) {}

  /**
   * @deprecated not used anymore
   */
  @Post('filtered')
  async getFilteredComments(
    @Body()
    filters: FiltersType,
    @GithubRepositoriesFilter() filteredGithubRepositoriesIds: number[],
  ): Promise<Comment[]> {
    if (filteredGithubRepositoriesIds && filteredGithubRepositoriesIds.length > 0) {
      return this.service.getCommentsWithFilters({
        repositoriesIds: filteredGithubRepositoriesIds,
        startingDate: isNil(filters.startingDate) ? FIRST_COMMENT_DATE : filters.startingDate,
        endingDate: isNil(filters.endingDate) ? new Date() : filters.endingDate,
        requesterIds: filters.requesterIds,
        commentorIds: filters.commentorIds,
        tagCodes: filters.tagCodes,
      });
    } else {
      return [];
    }
  }

  /**
   * Need to be improved by improving design
   *  2 github call -> login + github repository check
   *  could be resolved with one db query
   */
  @Post('filteredData')
  async getPieChartFormattedComments(
    @Body()
    filters: FiltersType,
    @GithubRepositoriesFilter() filteredGithubRepositoriesIds: number[],
    @GithubLogin() githubLogin: string,
  ): Promise<GetFilteredCommentsAnswer> {
    try {
      if (filteredGithubRepositoriesIds && filteredGithubRepositoriesIds.length > 0) {
        const comments = await this.service.getCommentsWithFilters({
          repositoriesIds: filteredGithubRepositoriesIds,
          startingDate: isNil(filters.startingDate) ? FIRST_COMMENT_DATE : filters.startingDate,
          endingDate: isNil(filters.endingDate) ? new Date() : filters.endingDate,
          requesterIds: filters.requesterIds,
          commentorIds: filters.commentorIds,
          tagCodes: filters.tagCodes,
        });
        const userTags = await this.tagService.getByGithubLogin(githubLogin);
        const pieChartFormattedData = chain(userTags)
          .map((tag: Tag) => ({
            x: tag.code,
            y: comments.filter((comment: Comment) => !!comment.body.match(tag.code)).length,
            tag,
          }))
          .filter(chartDatum => chartDatum.y > 0)
          .value();

        return {
          pieChartData: pieChartFormattedData,
          comments,
        };
      } else {
        return {
          pieChartData: [],
          comments: [],
        };
      }
    } catch (error) {
      Logger.error(error, `Error on getPieChartFormattedComments`);
      throw error;
    }
  }

  @Post()
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
