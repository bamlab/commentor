import React from 'react';
import {
  ChartPlaceholderContainer,
  OverChartBasicText,
  OverChartLegendImage,
  OverChartTitle,
  OverChartWraper,
} from './ChartPlaceholder.style';
import { ChartPlaceholderPropsType } from './ChartPlaceholder.type';

export const ChartPlaceholder = React.memo<ChartPlaceholderPropsType>(props => {
  return (
    <ChartPlaceholderContainer backgroundImage={props.backgroundImage}>
      <OverChartWraper>
        <OverChartLegendImage src={props.legendImage} />
        <OverChartTitle>{props.title}</OverChartTitle>
        <OverChartBasicText>{props.text}</OverChartBasicText>
      </OverChartWraper>
    </ChartPlaceholderContainer>
  );
});
