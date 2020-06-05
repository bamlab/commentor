import styled from 'styled-components';
import { colorUsage, getSpacing } from '../../../../stylesheet';
import { GRAPHS_HEADER_HEIGHT } from '../../Home.style';

export const PieChartSectionWrap = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  border-radius: 5px;
  height: ${GRAPHS_HEADER_HEIGHT}px;
  margin: ${getSpacing(1.5)};
  flex: 2;
  box-shadow: 0px 0px 6px ${colorUsage.shadow};
  background-color: white;
`;

export const PieChartSectionContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

export const PieChartAndTitleContainer = styled.div`
  display: flex;
  margin: ${getSpacing(3)};
  flex-direction: column;
`;

export const TagsLegendContainer = styled.div`
  margin: ${getSpacing(3)};
`;
