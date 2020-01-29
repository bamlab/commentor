import styled from 'styled-components';

export const Cell = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border-right: 1px solid #eee;
  background-color: white;
`;

export const StandardTextContainer = styled.div`
  padding: 10px;
`;

export const STYLE = {
  border: '1px solid #ddd',
  backgroundColor: 'white',
  borderRadius: '10px',
  overflow: 'hidden',
};

export const Wrapper = styled.div`
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
`;
