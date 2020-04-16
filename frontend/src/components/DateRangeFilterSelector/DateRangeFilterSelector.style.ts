import styled from 'styled-components';
import { getSpacing } from 'stylesheet';

export const Container = styled.div`
  display: flex;
  align-items: center;
  margin: 0 ${getSpacing(1)} 0 ${getSpacing(1)};
`;
