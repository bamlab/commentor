import React from 'react';
import { Wrapper } from './UpdateIcon.style';

type propsType = {
  objectId: number;
  onIconClick: () => void;
  selectTag: (value: number | null) => void;
};

export const UpdateIcon: React.FunctionComponent<propsType> = props => {
  const onClick = () => {
    props.selectTag(props.objectId);
    props.onIconClick();
  };
  return <Wrapper onClick={onClick} />;
};
