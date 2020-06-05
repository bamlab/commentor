import styled from 'styled-components';
import { fontStyles, getSpacing } from 'stylesheet';
import { OverChartMessageContainerProps } from './OverChartMessage.type';

export const OverChartMessageContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  position: absolute;
  align-items: center;
  justify-content: center;

  background-color: white;
  /*background-image: url(${(props: OverChartMessageContainerProps) => props.backgroundImage});*/
`;

export const OverChartWraper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 300px;
`;

export const OverChartTitle = styled.p`
  font-family: ${fontStyles.bold.fontFamily};
  font-weight: ${fontStyles.bold.fontWeight};
  font-size: ${fontStyles.bold.fontSize};
  text-align: justify;
  margin: ${getSpacing(3)};
`;

export const OverChartBasicText = styled.p`
  font-family: ${fontStyles.regular.fontFamily};
  font-weight: ${fontStyles.regular.fontWeight};
  font-size: ${fontStyles.regular.fontSize};
  text-align: justify;
  white-space: pre-line;
`;

export const OverChartLegendImage = styled.img``;
