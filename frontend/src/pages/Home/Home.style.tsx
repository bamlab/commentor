import styled from 'styled-components';
import { fontFamily, fontSize, fontWeight, getSpacing, lineHeight, colorUsage } from 'stylesheet';

export const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
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
  font-weight: ${fontWeight.bold};
  font-family: ${fontFamily.main};
  font-size: ${fontSize.large};
  line-height: ${lineHeight.medium};
  margin-bottom: ${getSpacing(12)};
`;

export const GithubAuthentButton = styled.div`
  justify-content: center;
  align-items: center;
  flex-direction: row;
  display: flex;
  background-color: ${colorUsage.primaryTextColor};
  :hover {
    background-color: ${colorUsage.black};
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
  font-weight: ${fontWeight.bold};
  font-family: ${fontFamily.main};
  font-size: ${fontSize.large};
  line-height: ${lineHeight.medium};
  color: ${colorUsage.white};
`;

export const FloatingButtonContainer = styled.div`
  position: fixed;
  right: 2%;
  bottom: 2%;
`;

export const SelectRepositoryWrapper = styled.div``;
