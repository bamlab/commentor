import styled from 'styled-components';
import { fontStyles, getSpacing, colorUsage } from 'stylesheet';

const HEADER_HEIGHT = 68;

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
  padding: 0 ${getSpacing(4)};
  height: 40px;
`;

Logo.displayName = 'Logo';
