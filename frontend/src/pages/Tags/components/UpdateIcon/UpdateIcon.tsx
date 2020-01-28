import React from 'react';
import { GoPencil } from 'react-icons/go';
import { HoverButtonContainer } from 'components/HoverButtonContainer';

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
  return (
    <HoverButtonContainer>
      <GoPencil onClick={onClick} />
    </HoverButtonContainer>
  );
};
