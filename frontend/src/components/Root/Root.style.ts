import styled from 'styled-components';
import { colorUsage, getSpacing } from 'stylesheet';

export const RootContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 0 ${getSpacing(2)};
`;
RootContainer.displayName = 'RootContainer';

export const PageContent = styled.main`
  flex-grow: 1;
  box-shadow: 0.5em -0.3em 10em ${colorUsage.headerBackground};
`;
PageContent.displayName = 'PageContent';
