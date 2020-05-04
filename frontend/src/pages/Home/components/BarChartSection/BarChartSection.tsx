import React from 'react';
import BarChart from 'components/BarChart';

import { BarChartSectionWrap, BarChartAndTitleContainer } from './BarChartSection.style';
import { ChartTitle } from '../../Home.style';
import { BarChartSectionPropsType } from './BarChartSection.type';

export const BarChartSection = React.memo<BarChartSectionPropsType>(props => {
  console.log('renderBar Chart', props);
  return (
    <BarChartSectionWrap>
      <BarChartAndTitleContainer>
        <ChartTitle># Tag over time</ChartTitle>
        <BarChart data={props.barChartData} />
      </BarChartAndTitleContainer>
    </BarChartSectionWrap>
  );
});
