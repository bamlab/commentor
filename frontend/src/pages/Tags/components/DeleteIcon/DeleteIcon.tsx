import React from 'react';
import { Wrapper } from './DeleteIcon.style';

type propsType = {
  deleteObject: (id: number) => void;
  objectId: number;
};

export const DeleteIcon: React.FunctionComponent<propsType> = props => {
  return <Wrapper onClick={() => props.deleteObject(props.objectId)} />;
};
