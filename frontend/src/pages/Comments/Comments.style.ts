import styled from 'styled-components';

const StyledComments = styled.div`
  display: flex;
  flex-direction: column;
`;

export const LoaderContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
`;

export const ButtonContainer = styled.div`
  position: fixed;
  bottom: 5px;
  width: 50em;
  left: 50%;
`;

export const GenericTableContainer = styled.div`
  flex: 1;
  height: 30px;
`;
export default StyledComments;
