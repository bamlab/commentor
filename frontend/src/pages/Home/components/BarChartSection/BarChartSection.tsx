import React from 'react';
import BarChart from 'components/BarChart';

import { BarChartSectionWrap, BarChartAndTitleContainer } from './BarChartSection.style';
import { ChartTitle } from '../../Home.style';
import { BarChartSectionPropsType } from './BarChartSection.type';
import { OverChartMessage } from 'components/OverChartMessage';
import noDataBarChartLogo from 'assets/no-data-bar-chart.png';

export const BarChartSection = React.memo<BarChartSectionPropsType>(props => {
  return (
    <BarChartSectionWrap>
      <BarChartAndTitleContainer>
        <ChartTitle># Tag over time</ChartTitle>
        <BarChart data={props.barChartData} />
      </BarChartAndTitleContainer>
      {props.barChartData.length === 0 && (
        <OverChartMessage
          legendImage={noDataBarChartLogo}
          backgroundImage={'To complete'}
          title="Ooops"
          text={'It seems that none of your comments have tags yet!'}
        />
      )}
    </BarChartSectionWrap>
  );
});
