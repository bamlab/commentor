import React from 'react';
import { chain } from 'lodash';

import { PieChartSectionPropsType } from './PieChartSection.type';
import {
  PieChartSectionWrap,
  PieChartAndTitleContainer,
  TagsLegendContainer,
} from './PieChartSection.style';
import { ChartTitle } from '../../Home.style';
import PieChart from 'components/PieChart';
import TagsLegend from 'components/TagsLegend';
import { TagType } from '../../../../redux/Tag';
import { CommentType } from '../../../../redux/Comment';

export const PieChartSection = React.memo<PieChartSectionPropsType>(props => {
  const pieChartFormattedData = chain(props.tags)
    .map((tag: TagType) => ({
      x: tag.code,
      y: props.comments.filter((comment: CommentType) => !!comment.body.match(tag.code)).length,
      tag,
    }))
    .filter(chartDatum => chartDatum.y > 0)
    .value();

  return (
    <PieChartSectionWrap>
      <PieChartAndTitleContainer>
        <ChartTitle>Total over the period</ChartTitle>
        <PieChart data={pieChartFormattedData} />
      </PieChartAndTitleContainer>
      <TagsLegendContainer>
        <TagsLegend tags={props.tags} />
      </TagsLegendContainer>
    </PieChartSectionWrap>
  );
});
