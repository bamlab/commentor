import React from 'react';
import { GoLinkExternal } from 'react-icons/go';
import { HoverButtonContainer } from 'components/HoverButtonContainer';

interface PropsType {
  onIconClick: () => void;
}

export const LinkCellIcon: React.FunctionComponent<PropsType> = props => {
  const onClick = () => {
    props.onIconClick();
  };
  return (
    <HoverButtonContainer>
      <GoLinkExternal onClick={onClick} />
    </HoverButtonContainer>
  );
};
