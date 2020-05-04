import React from 'react';
import BarChart from 'components/BarChart';
import { map, chain } from 'lodash';

import { BarChartSectionWrap, BarChartAndTitleContainer } from './BarChartSection.style';
import { ChartTitle } from '../../Home.style';
import { CommentType } from '../../../../redux/Comment';
import { TagType } from '../../../../redux/Tag';
import { BarChartSectionPropsType } from './BarChartSection.type';

export const BarChartSection = React.memo<BarChartSectionPropsType>(props => {
  const barChartFormattedData = chain(props.comments)
    .groupBy((comment: CommentType) => {
      comment.creationDate.setHours(0, 0, 0, 0);
      return comment.creationDate;
    })
    .map((comments: CommentType[], date: Date) =>
      map(comments, (comment: CommentType) =>
        chain(props.tags)
          .filter((tag: TagType) => !!comment.body.match(tag.code))
          .map((tag: TagType) => {
            comment.creationDate.setHours(0, 0, 0, 0);
            return [{ x: comment.creationDate, y: 1, y0: 0, tag }];
          })
          .value(),
      ),
    )
    .flattenDeep()
    .sortBy('x')
    .value();

  return (
    <BarChartSectionWrap>
      <BarChartAndTitleContainer>
        <ChartTitle># Tag over time</ChartTitle>
        <BarChart
          // @ts-ignore
          data={barChartFormattedData}
        />
      </BarChartAndTitleContainer>
    </BarChartSectionWrap>
  );
});
