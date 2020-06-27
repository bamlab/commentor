import { Controller, Body, Post, Logger } from '@nestjs/common';
import { isNil, chain, map } from 'lodash';

import {
  Comment,
  FiltersType,
  GetFilteredCommentsAnswer,
  BarChartData,
  GitlabCommentEvent,
  CommentEvent,
  GithubCommentEvent,
  CommentAction,
} from './interfaces/comment.dto';
import { Comment as CommentEntity } from './comment.entity';
import { CommentService } from './comment.service';
import { ProviderRepositoriesFilter } from '../auth/decorators/providerRepositoriesFilter.decorator';
import { Tag } from '../tag/tag.entity';
import { TagService } from '../tag/tag.service';
import { filterTagsWithCodes } from './comment.utils';
import { formatComment as formatGitlabComment } from '../auth/authenticationProviders/gitlab';
import { formatComment as formatGithubComment } from '../auth/authenticationProviders/github';

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
    @ProviderRepositoriesFilter() filteredGithubRepositoriesIds: number[],
  ): Promise<CommentEntity[]> {
    if (filteredGithubRepositoriesIds && filteredGithubRepositoriesIds.length > 0) {
      return this.service.getCommentsWithFilters({
        repositoriesIds: filteredGithubRepositoriesIds,
        startingDate: isNil(filters.startingDate)
          ? FIRST_COMMENT_DATE
          : new Date(filters.startingDate),
        endingDate: isNil(filters.endingDate) ? new Date() : new Date(filters.endingDate),
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
    @ProviderRepositoriesFilter() filteredGithubRepositoriesIds: number[],
  ): Promise<GetFilteredCommentsAnswer> {
    try {
      if (
        filteredGithubRepositoriesIds &&
        filteredGithubRepositoriesIds.length > 0 &&
        !isNil(filters.oAuthLogin)
      ) {
        // Make a copy of filters.tagCode to avoid shiftin reference array in children
        const TagCodeFilters = filters.tagCodes.filter(() => true);
        const fetchedComments = await this.service.getCommentsWithFilters({
          repositoriesIds: filteredGithubRepositoriesIds,
          startingDate: isNil(filters.startingDate)
            ? FIRST_COMMENT_DATE
            : new Date(filters.startingDate),
          endingDate: isNil(filters.endingDate) ? new Date() : new Date(filters.endingDate),
          requesterIds: filters.requesterIds,
          commentorIds: filters.commentorIds,
          tagCodes: TagCodeFilters,
        });

        const userTags = await this.tagService.getByLogin(filters.oAuthLogin);

        const filteredTags = filterTagsWithCodes(userTags, filters.tagCodes);

        const pieChartFormattedData = chain(filteredTags)
          .map((tag: Tag) => ({
            x: tag.code,
            y: fetchedComments.filter((comment: CommentEntity) => !!comment.body.match(tag.code))
              .length,
            tag,
          }))
          .filter(chartDatum => chartDatum.y > 0)
          .value();

        // @ts-ignore well looks like lodash typing failed on this
        const barChartFormattedData: BarChartData[] = chain(fetchedComments)
          .groupBy((comment: CommentEntity) => {
            comment.creationDate.setHours(0, 0, 0, 0);
            return comment.creationDate;
          })
          .map((comments: CommentEntity[]) =>
            map(comments, (comment: CommentEntity) =>
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
          .sortBy('tag.code')
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
    const isGitlabCommentEvent = (event: CommentEvent): event is GitlabCommentEvent =>
      (commentEvent as GitlabCommentEvent).object_kind !== undefined &&
      (commentEvent as GitlabCommentEvent).object_kind === 'note';

    let comment: Comment;
    let action: CommentAction;
    if (isGitlabCommentEvent(commentEvent)) {
      comment = formatGitlabComment(commentEvent);
      action = 'created';
    } else {
      comment = formatGithubComment(commentEvent);
      action = commentEvent.action;
    }
    return this.service.receiveCommentEvent({
      action,
      comment,
    });
  }
}
