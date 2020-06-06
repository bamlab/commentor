import React from 'react';
import BarChart from 'components/BarChart';

import { BarChartSectionWrap, BarChartAndTitleContainer } from './BarChartSection.style';
import { ChartTitle } from '../../Home.style';
import { BarChartSectionPropsType } from './BarChartSection.type';
import { ChartPlaceholder } from 'components/ChartPlaceholder';
import noDataBarChartIcon from 'assets/noDataBarChartIcon.png';
import noDataBarChartPlaceholder from 'assets/noDataBarChartPlaceholder.png';

export const BarChartSection = React.memo<BarChartSectionPropsType>(props => {
  return (
    <BarChartSectionWrap>
      <BarChartAndTitleContainer>
        <ChartTitle># Tag over time</ChartTitle>
        <BarChart data={props.barChartData} />
      </BarChartAndTitleContainer>
      {props.barChartData.length === 0 && (
        <ChartPlaceholder
          legendImage={noDataBarChartIcon}
          backgroundImage={noDataBarChartPlaceholder}
          title="Ooops"
          text={'It seems that none of your comments have tags yet!'}
        />
      )}
    </BarChartSectionWrap>
  );
});
