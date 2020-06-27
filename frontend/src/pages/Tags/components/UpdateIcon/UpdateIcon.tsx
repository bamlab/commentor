import React from 'react';
import { GoPencil } from 'react-icons/go';
import { HoverButtonContainer } from 'components/HoverButtonContainer';

interface PropsType {
  objectId: number;
  onIconClick: () => void;
  selectTag: (value: number | null) => void;
}

export const UpdateIcon: React.FunctionComponent<PropsType> = props => {
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
