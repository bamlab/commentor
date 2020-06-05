import { chain, map } from 'lodash';
import { Tag } from '../tag/tag.entity';
import { Comment } from './comment.entity';
import { BarChartData } from './interfaces/comment.dto';

export const filterTagsWithCodes = (tags: Tag[], codes: string[]): Tag[] => {
  const result = !!codes.length ? tags.filter((tag: Tag) => codes.includes(tag.code)) : tags;
  return result;
};

export const getPieChartFormattedData = (
  fetchedComments: Comment[],
  filteredTags: Tag[],
): {
  x: string;
  y: number;
  tag: Tag;
}[] =>
  chain(filteredTags)
    .map((tag: Tag) => ({
      x: tag.code,
      y: fetchedComments.filter((comment: Comment) => !!comment.body.match(tag.code)).length,
      tag,
    }))
    .filter(chartDatum => chartDatum.y > 0)
    .value();

export const getBarChartFormattedData = (
  fetchedComments: Comment[],
  filteredTags: Tag[],
): BarChartData[] =>
  // @ts-ignore well looks like lodash typing failed on this
  chain(fetchedComments)
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
