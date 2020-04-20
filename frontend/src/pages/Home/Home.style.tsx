import styled from 'styled-components';
import { fontStyles, getSpacing } from 'stylesheet';

export const GRAPHS_HEADER_HEIGHT = 386;

export const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  padding: ${getSpacing(1.5)} ${getSpacing(3.5)} ${getSpacing(1.5)} ${getSpacing(3.5)};
`;
HomeContainer.displayName = 'HomeContainer';

export const CommentTableContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: ${getSpacing(1.5)};
`;
CommentTableContainer.displayName = 'CommentTableContainer';

export const ChartsContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
ChartsContainer.displayName = 'ChartsContainer';

export const AuthenticatedPageContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
AuthenticatedPageContainer.displayName = 'AuthenticatedPageContainer';

export const FiltersHeader = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: ${getSpacing(1.5)};
`;

export const FiltersContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: white;
  margin: 0 ${getSpacing(1.5)} 0 ${getSpacing(1.5)};
  padding: ${getSpacing(1)};
  border: 1px solid #ddd;
  border-radius: 4px;
`;

export const FiltersPrefix = styled.p`
  font-family: ${fontStyles.regular.fontFamily};
  font-weight: ${fontStyles.regular.fontWeight};
  font-size: ${fontStyles.regular.fontSize};
  margin-right: ${getSpacing(1.5)};
`;

export const FilterSpacer = styled.div`
  margin: ${getSpacing(1.5)};
`;

export const PieChartAndLegendCard = styled.div`
  display: flex;
  flex-direction: row;
  border-radius: 5px;
  height: ${GRAPHS_HEADER_HEIGHT}px;
  margin: ${getSpacing(1.5)};
  flex: 2;
  box-shadow: 0px 0px 6px ${colorUsage.shadow};
  background-color: white;
`;

export const PieChartAndTitleContainer = styled.div`
  display: flex;
  margin: ${getSpacing(3)};
  flex-direction: column;
`;

export const BarChartAndTitleContainer = styled.div`
  margin: ${getSpacing(3)};
`;

export const TagsLegendContainer = styled.div`
  margin: ${getSpacing(3)};
`;

export const ChartTitle = styled.p`
  font-family: ${fontStyles.bold.fontFamily};
  font-weight: ${fontStyles.bold.fontWeight};
  font-size: ${fontStyles.bold.fontSize};
`;
