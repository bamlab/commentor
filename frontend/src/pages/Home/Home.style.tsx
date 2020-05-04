import styled from 'styled-components';
import { fontStyles, getSpacing } from 'stylesheet';

export const GRAPHS_HEADER_HEIGHT = 386;

export const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  padding: ${getSpacing(1.5)} ${getSpacing(3.5)} ${getSpacing(1.5)} ${getSpacing(3.5)};
`;
HomeContainer.displayName = 'HomeContainer';

export const CommentTableContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: ${getSpacing(1.5)};
`;
CommentTableContainer.displayName = 'CommentTableContainer';

export const ChartsContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
ChartsContainer.displayName = 'ChartsContainer';

export const AuthenticatedPageContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
AuthenticatedPageContainer.displayName = 'AuthenticatedPageContainer';

export const FloatingButtonContainer = styled.div`
  position: fixed;
  right: 2%;
  bottom: 2%;
`;
export const ChartTitle = styled.p`
  font-family: ${fontStyles.bold.fontFamily};
  font-weight: ${fontStyles.bold.fontWeight};
  font-size: ${fontStyles.bold.fontSize};
`;
