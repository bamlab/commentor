import styled from 'styled-components';
import { fontFamily, fontSize, fontWeight, getSpacing, lineHeight, colorUsage } from 'stylesheet';

export const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: ${getSpacing(10)};
`;
HomeContainer.displayName = 'HomeContainer';

export const Logo = styled.img`
  width: ${getSpacing(60)};
  margin-bottom: ${getSpacing(4)};
`;

Logo.displayName = 'Logo';

export const WelcomeMessage = styled.text`
  font-weight: ${fontWeight.bold};
  font-family: ${fontFamily.main};
  font-size: ${fontSize.large};
  line-height: ${lineHeight.medium};
  margin-bottom: ${getSpacing(12)};
`;
