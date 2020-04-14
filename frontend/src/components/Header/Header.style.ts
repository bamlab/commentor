import styled from 'styled-components';
import { fontSize, getSpacing } from 'stylesheet';

const HEADER_HEIGHT = 80;

export const HeaderContainer = styled.header`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: ${HEADER_HEIGHT}px;
  padding: 0 ${getSpacing(1)};
  font-size: ${fontSize.large};
`;

HeaderContainer.displayName = 'HeaderContainer';

export const Logo = styled.img`
  padding: 0 ${getSpacing(4)};
  height: 40px;
`;

Logo.displayName = 'Logo';
