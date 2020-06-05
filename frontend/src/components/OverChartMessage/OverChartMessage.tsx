import React from 'react';
import {
  OverChartMessageContainer,
  OverChartBasicText,
  OverChartLegendImage,
  OverChartTitle,
  OverChartWraper,
} from './OverChartMessage.style';
import { OverChartMessagePropsType } from './OverChartMessage.type';

export const OverChartMessage = React.memo<OverChartMessagePropsType>(props => {
  return (
    <OverChartMessageContainer backgroundImage={props.backgroundImage}>
      <OverChartWraper>
        <OverChartLegendImage src={props.legendImage} />
        <OverChartTitle>{props.title}</OverChartTitle>
        <OverChartBasicText>{props.text}</OverChartBasicText>
      </OverChartWraper>
    </OverChartMessageContainer>
  );
});
