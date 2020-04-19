import styled from 'styled-components';

export const RootContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;
RootContainer.displayName = 'RootContainer';

export const PageContent = styled.main`
  flex-grow: 1;
`;
PageContent.displayName = 'PageContent';
