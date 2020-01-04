import styled from 'styled-components';
import { borderRadius, colorUsage, getSpacing } from 'stylesheet';

export const RootContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 200%;
  padding: 0 ${getSpacing(6)};
`;
RootContainer.displayName = 'RootContainer';

export const PageContent = styled.main`
  background-color: ${colorUsage.contentBackground};
  border-radius: ${borderRadius.large};
  padding: ${getSpacing(6)};
  box-shadow: 0.5em -0.3em 10em rgb(242, 42, 51, 0.24);
  flex-grow: 10;
`;
PageContent.displayName = 'PageContent';
