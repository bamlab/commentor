import React from 'react';
import { GoLinkExternal } from 'react-icons/go';

type propsType = {
  onIconClick: () => void;
};

export const LinkCellIcon: React.FunctionComponent<propsType> = props => {
  const onClick = () => {
    props.onIconClick();
  };
  return <GoLinkExternal onClick={onClick} />;
};
