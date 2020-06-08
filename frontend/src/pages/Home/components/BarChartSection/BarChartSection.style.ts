import styled from 'styled-components';
import { getSpacing, colorUsage } from '../../../../stylesheet';
import { GRAPHS_HEADER_HEIGHT } from '../../Home.style';

export const BarChartSectionWrap = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  border-radius: 5px;
  height: ${GRAPHS_HEADER_HEIGHT}px;
  margin: ${getSpacing(1.5)};
  flex: 3;
  box-shadow: 0px 0px 6px ${colorUsage.shadow};
  background-color: white;
`;

export const BarChartAndTitleContainer = styled.div`
  margin: ${getSpacing(3)};
`;

export const BarChartHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
