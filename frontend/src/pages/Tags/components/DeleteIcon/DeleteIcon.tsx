import React from 'react';
import { Wrapper } from './DeleteIcon.style';

type propsType = {
  objectId: number;
  onIconClick: () => void;
  selectTag: (value: number | null) => void;
};

export const DeleteIcon: React.FunctionComponent<propsType> = props => {
  const onClick = () => {
    props.selectTag(props.objectId);
    props.onIconClick();
  };
  return <Wrapper onClick={onClick} />;
};
