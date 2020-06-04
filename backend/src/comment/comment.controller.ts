import { Controller, Body, Post } from '@nestjs/common';
import { isNil } from 'lodash';
import { CommentEvent, FiltersType, GetFilteredCommentsAnswer } from './interfaces/comment.dto';
import { Comment } from './comment.entity';
import { CommentService, FIRST_COMMENT_DATE } from './comment.service';
import { ProviderRepositoriesFilter } from '../auth/decorators/providerRepositoriesFilter.decorator';
import { TagService } from '../tag/tag.service';
import { formatComment as formatGitlabComment } from '../auth/authenticationProviders/gitlab';
import { formatComment as formatGithubComment } from '../auth/authenticationProviders/github';

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
    @ProviderRepositoriesFilter() filteredGithubRepositoriesIds: number[],
  ): Promise<GetFilteredCommentsAnswer> {
    const userTags = await this.tagService.getByLogin(filters.oAuthLogin);
    return await this.service.getChartData(userTags, filters, filteredGithubRepositoriesIds);
  }

  @Post()
  createOne(@Body() commentEvent: CommentEvent & { object_kind: string }) {
    let comment: Pick<
      Comment,
      'body' | 'filePath' | 'url' | 'commentor' | 'requester' | 'pullRequestUrl' | 'repositoryId'
    >;
    if (commentEvent.object_kind && commentEvent.object_kind === 'note') {
      comment = formatGitlabComment(commentEvent);
    } else {
      comment = formatGithubComment(commentEvent);
    }
    return this.service.receiveCommentEvent({
      action: commentEvent.action ? commentEvent.action : 'created',
      comment,
    });
  }
}
