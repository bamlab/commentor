import { Controller, Body, Post, Logger } from '@nestjs/common';
import { isNil, chain, map } from 'lodash';

import {
  CommentEvent,
  FiltersType,
  GetFilteredCommentsAnswer,
  BarChartData,
} from './interfaces/comment.dto';
import { Comment } from './comment.entity';
import { CommentService } from './comment.service';
import { GithubRepositoriesFilter } from '../auth/decorators/githubRepositoriesFilter.decorator';
import { Tag } from '../tag/tag.entity';
import { TagService } from '../tag/tag.service';
import { filterTagsWithCodes } from './comment.utils';

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
   *  could be resolved with one db query
   */
  @Post('filteredData')
  async getPieChartFormattedComments(
    @Body()
    filters: FiltersType,
    @GithubRepositoriesFilter() filteredGithubRepositoriesIds: number[],
  ): Promise<GetFilteredCommentsAnswer> {
    try {
      if (
        filteredGithubRepositoriesIds &&
        filteredGithubRepositoriesIds.length > 0 &&
        !isNil(filters.githubLogin)
      ) {
        const fetchedComments = await this.service.getCommentsWithFilters({
          repositoriesIds: filteredGithubRepositoriesIds,
          startingDate: isNil(filters.startingDate) ? FIRST_COMMENT_DATE : filters.startingDate,
          endingDate: isNil(filters.endingDate) ? new Date() : filters.endingDate,
          requesterIds: filters.requesterIds,
          commentorIds: filters.commentorIds,
          tagCodes: filters.tagCodes,
        });
        const userTags = await this.tagService.getByGithubLogin(filters.githubLogin);
        const filteredTags = filters.tagCodes.length
          ? userTags.filter((tag: Tag) => filters.tagCodes.includes(tag.code))
          : userTags;
        const pieChartFormattedData = chain(filteredTags)
          .map((tag: Tag) => ({
            x: tag.code,
            y: fetchedComments.filter((comment: Comment) => !!comment.body.match(tag.code)).length,
            tag,
          }))
          .filter(chartDatum => chartDatum.y > 0)
          .value();

        // @ts-ignore well looks like lodash typing failed on this
        const barChartFormattedData: BarChartData[] = chain(fetchedComments)
          .groupBy((comment: Comment) => {
            comment.creationDate.setHours(0, 0, 0, 0);
            return comment.creationDate;
          })
          .map((comments: Comment[]) =>
            map(comments, (comment: Comment) =>
              chain(filteredTags)
                .filter((tag: Tag) => !!comment.body.match(tag.code))
                .map((tag: Tag) => {
                  comment.creationDate.setHours(0, 0, 0, 0);
                  return [{ x: comment.creationDate, y: 1, y0: 0, tag }];
                })
                .value(),
            ),
          )
          .flattenDeep()
          .sortBy('x')
          .value();

        return {
          barChartData: barChartFormattedData,
          pieChartData: pieChartFormattedData,
          comments: fetchedComments,
        };
      } else {
        return {
          barChartData: [],
          pieChartData: [],
          comments: [],
        };
      }
    } catch (error) {
      Logger.error(error, `Error on getting filtered data`);
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
