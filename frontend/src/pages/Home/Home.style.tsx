import styled from 'styled-components';
import { fontStyles, getSpacing, colorUsage } from 'stylesheet';

const GRAPHS_HEADER_HEIGHT = 386;

export const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: ${getSpacing(1.5)} ${getSpacing(3.5)} ${getSpacing(1.5)} ${getSpacing(3.5)};
`;
HomeContainer.displayName = 'HomeContainer';

export const GitHubAuthentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: ${getSpacing(10)};
`;
GitHubAuthentContainer.displayName = 'GitHubAuthentContainer';

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

export const Logo = styled.img`
  width: ${getSpacing(60)};
  margin-bottom: ${getSpacing(4)};
`;

Logo.displayName = 'Logo';

export const WelcomeMessage = styled.div`
  font-family: ${fontStyles.title.fontFamily};
  font-weight: ${fontStyles.title.fontWeight};
  font-size: ${fontStyles.title.fontSize};
  margin-bottom: ${getSpacing(12)};
`;

export const GithubAuthentButton = styled.div`
  justify-content: center;
  align-items: center;
  flex-direction: row;
  display: flex;
  background-color: ${colorUsage.text};
  :hover {
    background-color: black;
  }
  padding: ${getSpacing(4)};
  cursor: pointer;
  box-shadow: 1px 2px 2px 1px ${colorUsage.shadow};
  border-radius: 10px;
`;

export const GithubLogo = styled.img`
  height: ${getSpacing(8)};
  width: ${getSpacing(8)};
  margin: ${getSpacing(2)};
`;

export const GithubAuthentButtonText = styled.p`
  font-family: ${fontStyles.title.fontFamily};
  font-weight: ${fontStyles.title.fontWeight};
  font-size: ${fontStyles.title.fontSize};
  color: white;
`;

export const FloatingButtonContainer = styled.div`
  position: fixed;
  right: 2%;
  bottom: 2%;
`;

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
  align-items: center;
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
  margin: ${getSpacing(1.5)};
  flex-direction: column;
`;

export const ChartTitle = styled.p`
  font-family: ${fontStyles.subTitle.fontFamily};
  font-weight: ${fontStyles.subTitle.fontWeight};
  font-size: ${fontStyles.subTitle.fontSize};
`;

export const BarChartContainer = styled.div`
  display: flex;
  align-items: center;
  border-radius: 5px;
  height: ${GRAPHS_HEADER_HEIGHT}px;
  margin: ${getSpacing(1.5)};
  flex: 3;
  box-shadow: 0px 0px 6px ${colorUsage.shadow};
  background-color: white;
`;

export const SelectRepositoryWrapper = styled.div``;
