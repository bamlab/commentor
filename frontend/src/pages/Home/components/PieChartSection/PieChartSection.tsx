import React from 'react';

import { PieChartSectionPropsType } from './PieChartSection.type';
import {
  PieChartSectionWrap,
  PieChartAndTitleContainer,
  TagsLegendContainer,
} from './PieChartSection.style';
import { ChartTitle } from '../../Home.style';
import PieChart from 'components/PieChart';
import TagsLegend from 'components/TagsLegend';

export const PieChartSection = React.memo<PieChartSectionPropsType>(props => {
  return (
    <PieChartSectionWrap>
      <PieChartAndTitleContainer>
        <ChartTitle>Total over the period</ChartTitle>
        <PieChart data={props.pieChartData} />
      </PieChartAndTitleContainer>
      <TagsLegendContainer>
        <TagsLegend tags={props.tags} />
      </TagsLegendContainer>
    </PieChartSectionWrap>
  );
});
