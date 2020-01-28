import React from 'react';
import { GoLinkExternal } from 'react-icons/go';
import styled from 'styled-components';
import { colorUsage } from 'stylesheet';

const HOVER_SQUARE_SIZE = 30;
type propsType = {
  onIconClick: () => void;
};

const GoLinkExternalButton = styled(GoLinkExternal)`
  cursor: pointer;
  :hover {
    background-color: ${colorUsage.primaryButtonBackgroundHover};
    border-radius: 5px;
    width: ${HOVER_SQUARE_SIZE}px;
    height: ${HOVER_SQUARE_SIZE}px;
  }
`;

export const LinkCellIcon: React.FunctionComponent<propsType> = props => {
  const onClick = () => {
    props.onIconClick();
  };
  return <GoLinkExternalButton onClick={onClick} />;
};
