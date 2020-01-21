import React from 'react';
import { Wrapper } from './LinkCellIcon.style';

type propsType = {
  onIconClick: () => void;
};

export const LinkCellIcon: React.FunctionComponent<propsType> = props => {
  const onClick = () => {
    props.onIconClick();
  };
  return <Wrapper onClick={onClick} />;
};
