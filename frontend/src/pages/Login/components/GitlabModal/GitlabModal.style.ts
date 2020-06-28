import styled from 'styled-components';
import { Modal as ModalComponent } from 'components/Modal/Modal';
import Input from 'components/Input';
import { borderRadius } from 'stylesheet';

export const GitlabAuthentModal = styled(ModalComponent)`
  &_overlay {
    position: fixed;
    top: 0px;
    left: 0px;
    right: 0px;
    bottom: 0px;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &_content {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: white;
    z-index: -2;
    overflow: auto;
    border-radius: ${borderRadius};
    outline: none;
    -webkit-overflow-scrolling: touch;
  }
`;

export const GitlabAuthentModalContainer = styled.div`
  display: flex;
  flex-direction: row;
  min-height: 500px;
  min-width: 800px;
  justify-content: space-around;
  align-items: center;
  @media (max-width: 1200px) {
    flex-direction: column;
    align-items: center;
    min-width: 400px;
  }
  margin: 30px;
`;

export const GitlabPublicAuthentContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 300px;
`;

export const GitlabOnPremiseAutentInput = styled(Input)`
  width: 100%;
`;

export const GitlabOnPremiseAuthentContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 300px;
`;
