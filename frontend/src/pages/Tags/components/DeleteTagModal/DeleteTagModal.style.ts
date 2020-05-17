import styled from 'styled-components';
import { Modal as ModalComponent } from 'components/Modal/Modal';
import { borderRadius } from '../../../../stylesheet';

export const Modal = styled(ModalComponent)`
  &_overlay {
    position: fixed;
    top: 0px;
    left: 0px;
    right: 0px;
    bottom: 0px;
    background-color: rgba(0, 0, 0, 0.5);
  }

  &_content {
    position: absolute;
    left: 20rem;
    right: 20rem;
    top: 10rem;
    bottom: 10rem;
    padding: 20px;
    background-color: white;
    overflow: auto;
    border-radius: ${borderRadius};
    outline: none;
    -webkit-overflow-scrolling: touch;
  }
`;
