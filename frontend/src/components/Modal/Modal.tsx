import React, { ReactNode } from 'react';
import ReactModal from 'react-modal';

interface PropsType {
  id?: string;
  contentLabel: string;
  isOpen: boolean;
  children: ReactNode;
  onRequestClose: () => void;
  style?: Record<string, any>;
  className?: string;
}

export const Modal = React.memo<PropsType>(props => (
  <ReactModal
    isOpen={props.isOpen}
    contentLabel={props.contentLabel}
    onRequestClose={props.onRequestClose}
    style={props.style}
    portalClassName={`${props.className}`}
    className={`${props.className}_content`}
    overlayClassName={`${props.className}_overlay`}
    ariaHideApp={false}
  >
    {props.children}
  </ReactModal>
));
