import React, { ReactNode } from 'react';
import ReactModal from 'react-modal';

interface PropsType {
  id?: string;
  contentLabel: string;
  isOpen: boolean;
  children: ReactNode;
  onRequestClose: () => void;
}

export const Modal = React.memo<PropsType>(props => (
  <ReactModal
    isOpen={props.isOpen}
    contentLabel={props.contentLabel}
    onRequestClose={props.onRequestClose}
  >
    {props.children}
  </ReactModal>
));
