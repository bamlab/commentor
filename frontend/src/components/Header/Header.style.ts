import styled from 'styled-components';
import { fontStyles, getSpacing, colorUsage } from 'stylesheet';
import Lottie from 'react-lottie';

const HEADER_HEIGHT = 68;
const ANIMATION_HORIZONTAL_OFFSET = 18;
export const ANIMATION_SPEED = 1.4;
export const LOGO_SIZE = 55;

export const HeaderContainer = styled.header`
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: white;
  height: ${HEADER_HEIGHT}px;
  padding: 0 ${getSpacing(1)};
  font-size: ${fontStyles.title.fontSize};
  font-weight: ${fontStyles.title.fontWeight};
  font-size: ${fontStyles.title.fontSize};
  box-shadow: 0px 0px 6px ${colorUsage.shadow};
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
