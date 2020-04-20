import styled from 'styled-components';
import { fontStyles, getSpacing, colorUsage } from 'stylesheet';
import Lottie from 'react-lottie';

const HEADER_HEIGHT = 68;
const ANIMATION_HORIZONTAL_OFFSET = 18;

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

export const Logo = styled.img`
  height: 22px;
  width: 80px;
  margin-bottom: -4px;
`;

Logo.displayName = 'Logo';

export const LogoContainer = styled.div`
  padding: 0 ${getSpacing(1)};
`;

export const AnimatedLogoContainer = styled.div`
  padding: 0 ${ANIMATION_HORIZONTAL_OFFSET}px;
`;
export const AnimatedLogo = styled(Lottie)``;

AnimatedLogo.displayName = 'AnimatedLogo';
