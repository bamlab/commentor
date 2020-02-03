import React from 'react';
import { GoLinkExternal } from 'react-icons/go';
import { HoverButtonContainer } from 'components/HoverButtonContainer';

type propsType = {
  onIconClick: () => void;
};

export const LinkCellIcon: React.FunctionComponent<propsType> = props => {
  const onClick = () => {
    props.onIconClick();
  };
  return (
    <HoverButtonContainer>
      <GoLinkExternal onClick={onClick} />
    </HoverButtonContainer>
  );
};
