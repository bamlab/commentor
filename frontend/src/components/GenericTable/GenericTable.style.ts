import styled from 'styled-components';

export const Cell = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid #eee;
  border-right: 1px solid #eee;
  &:hover {
    background-color: orange;
  }
`;

export const STYLE = {
  border: '1px solid #ddd',
};

export const Wrapper = styled.div`
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
`;
