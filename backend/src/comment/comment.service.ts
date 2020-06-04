import { Injectable, Logger } from '@nestjs/common';
import { isNil, chain, map } from 'lodash';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Repository } from 'typeorm';
import { BarChartData, FiltersType } from './interfaces/comment.dto';
import { Comment } from './comment.entity';
import {
  tagCodesCommentQueryDecorator,
  requesterIdsCommentQueryDecorator,
  commentorIdsCommentQueryDecorator,
  dateFilterCommentQueryDecorator,
  repositoriesIdsFilterCommentQueryDecorator,
} from './comment.decorator';
import { filterTagsWithCodes } from './comment.utils';
import { Tag } from '../tag/tag.entity';

export const FIRST_COMMENT_DATE = new Date('November 03, 1994 09:24:00');

@Injectable()
export class CommentService extends TypeOrmCrudService<Comment> {
  constructor(@InjectRepository(Comment) private readonly commentRepository: Repository<Comment>) {
    super(commentRepository);
  }

  receiveCommentEvent = async ({
    action,
    comment,
  }: {
    action: 'created' | 'edited' | 'deleted';
    comment: Pick<
      Comment,
      'body' | 'filePath' | 'url' | 'commentor' | 'requester' | 'pullRequestUrl' | 'repositoryId'
    >;
  }) => {
    if (action === 'edited') {
      await this.commentRepository.update({ url: comment.url }, { body: comment.body });
      return;
    } else if (action === 'deleted') {
      await this.commentRepository.delete({ url: comment.url });
      return;
    } else {
      await this.commentRepository.save(comment);
      return;
    }
  };

  getChartData = async (
    userTags: Tag[],
    filters: FiltersType,
    filteredGithubRepositoriesIds: number[],
  ) => {
    try {
      if (
        filteredGithubRepositoriesIds &&
        filteredGithubRepositoriesIds.length > 0 &&
        !isNil(filters.oAuthLogin)
      ) {
        // Make a copy of filters.tagCode to avoid shiftin reference array in children
        const TagCodeFilters = filters.tagCodes.filter(() => true);
        const fetchedComments = await this.getCommentsWithFilters({
          repositoriesIds: filteredGithubRepositoriesIds,
          startingDate: isNil(filters.startingDate) ? FIRST_COMMENT_DATE : filters.startingDate,
          endingDate: isNil(filters.endingDate) ? new Date() : filters.endingDate,
          requesterIds: filters.requesterIds,
          commentorIds: filters.commentorIds,
          tagCodes: TagCodeFilters,
        });

        const filteredTags = filterTagsWithCodes(userTags, filters.tagCodes);

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
          .sortBy('tag.code')
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
  };

  getCommentsWithFilters = async ({
    repositoriesIds,
    startingDate,
    endingDate,
    requesterIds,
    commentorIds,
    tagCodes,
  }: {
    repositoriesIds: number[];
    startingDate: Date;
    endingDate: Date;
    requesterIds: string[];
    commentorIds: string[];
    tagCodes: string[];
  }): Promise<Comment[]> => {
    const query = this.commentRepository.createQueryBuilder('comments');
    repositoriesIdsFilterCommentQueryDecorator(query, repositoriesIds);
    dateFilterCommentQueryDecorator(query, startingDate, endingDate);
    requesterIdsCommentQueryDecorator(query, requesterIds);
    commentorIdsCommentQueryDecorator(query, commentorIds);
    tagCodesCommentQueryDecorator(query, tagCodes);
    query.orderBy('comments.creationDate', 'DESC');

    const filteredComments = await query.getMany();
    return filteredComments;
  };

  checkIfCommentsExistForRepository = async (repositoryId: number): Promise<boolean> => {
    const commentForRepository = await this.commentRepository.findOne({
      where: { repositoryId },
    });
    return !!commentForRepository;
  };
}
