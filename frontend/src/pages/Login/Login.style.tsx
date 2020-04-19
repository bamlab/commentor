import styled from 'styled-components';
import { fontStyles, getSpacing, colorUsage } from 'stylesheet';

export const Logo = styled.img`
  width: ${getSpacing(60)};
  margin-bottom: ${getSpacing(4)};
`;

export const WelcomeMessage = styled.div`
  font-family: ${fontStyles.title.fontFamily};
  font-weight: ${fontStyles.title.fontWeight};
  font-size: ${fontStyles.title.fontSize};
  margin-bottom: ${getSpacing(12)};
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

export const GitHubAuthentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: ${getSpacing(10)};
`;
GitHubAuthentContainer.displayName = 'GitHubAuthentContainer';

Logo.displayName = 'Logo';
