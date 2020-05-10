import styled from 'styled-components';
import { fontStyles, getSpacing, colorUsage } from 'stylesheet';
import Lottie from 'react-lottie';

const HEADER_HEIGHT = 68;
export const ANIMATION_SPEED = 1.4;
export const LOGO_SIZE = 55;

export const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
  background-color: white;
  height: ${HEADER_HEIGHT}px;
  padding: 0 ${getSpacing(1)};
  font-weight: ${fontStyles.bold.fontWeight};
  font-family: ${fontStyles.bold.fontFamily};
  font-size: ${fontStyles.bold.fontSize};
  box-shadow: 0px 0px 6px ${colorUsage.shadow};
`;

export const LeftContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: white;
`;

export const RightContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  background-color: white;
`;

export const LogoutButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-right: ${getSpacing(4)};
  color: ${colorUsage.placeHolderText};
  cursor: pointer;
  :hover {
    color: ${colorUsage.text};
  }
`;

HeaderContainer.displayName = 'HeaderContainer';

export const LogoContainer = styled.div`
  padding: 0 ${getSpacing(1)};
  cursor: pointer;
`;

export const AnimatedLogoContainer = styled.div`
  margin-bottom: ${getSpacing(1)};
`;
export const AnimatedLogo = styled(Lottie)``;

AnimatedLogo.displayName = 'AnimatedLogo';
