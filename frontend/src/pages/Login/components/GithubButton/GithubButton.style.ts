import styled from 'styled-components';
import { fontStyles, getSpacing, borderRadius } from 'stylesheet';

const VERSIONNING_PLATFORMS_LOGO_HEIGHT = 30;

export const GithubAuthentButton = styled.div`
  justify-content: center;
  align-items: center;
  flex-direction: row;
  display: flex;
  width: 100%;
  margin: ${getSpacing(1.5)} 0 ${getSpacing(1.5)} 0;
  background-color: #25292e;
  padding: ${getSpacing(1)} 0 ${getSpacing(1)} 0;
  cursor: pointer;
  border-radius: ${borderRadius};
`;

export const GithubLogo = styled.img`
  height: ${VERSIONNING_PLATFORMS_LOGO_HEIGHT}px;
  width: ${VERSIONNING_PLATFORMS_LOGO_HEIGHT}px;
  margin: 0 ${getSpacing(1)} 0 0;
`;

export const GithubAuthentButtonText = styled.p`
  text-transform: uppercase;
  font-family: ${fontStyles.buttons.fontFamily};
  font-weight: ${fontStyles.buttons.fontWeight};
  font-size: ${fontStyles.buttons.fontSize};
  margin: 0 ${getSpacing(1)} 0 ${getSpacing(1)};
  color: white;
`;
