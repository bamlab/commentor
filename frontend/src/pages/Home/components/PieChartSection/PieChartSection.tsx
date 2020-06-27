import React from 'react';

import { PieChartSectionPropsType } from './PieChartSection.type';
import {
  PieChartSectionWrap,
  PieChartAndTitleContainer,
  TagsLegendContainer,
  PieChartSectionContainer,
} from './PieChartSection.style';
import { ChartTitle } from '../../Home.style';
import PieChart from 'components/PieChart';
import TagsLegend from 'components/TagsLegend';
import { ChartPlaceholder } from 'components/ChartPlaceholder';
import noDataPieChartIcon from 'assets/noDataPieChartIcon.png';
import noDataPieChartPlaceholder from 'assets/noDataPieChartPlaceholder.png';

export const PieChartSection = React.memo<PieChartSectionPropsType>(props => {
  return (
    <PieChartSectionWrap>
      <PieChartSectionContainer>
        <PieChartAndTitleContainer>
          <ChartTitle>Total over the period</ChartTitle>
          <PieChart data={props.pieChartData} />
        </PieChartAndTitleContainer>
        <TagsLegendContainer>
          <TagsLegend />
        </TagsLegendContainer>
      </PieChartSectionContainer>
      {props.pieChartData.length === 0 && (
        <ChartPlaceholder
          legendImage={noDataPieChartIcon}
          backgroundImage={noDataPieChartPlaceholder}
          title="To add tag to your comments:"
          text={`1. Open your comment in Github (comment URL in the table below)
            2. Add the tag directly in the comment
            3. It will be automatically recognized in Commentor`}
        />
      )}
    </PieChartSectionWrap>
  );
});
