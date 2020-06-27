import React from 'react';
import { GoTrashcan } from 'react-icons/go';
import { HoverButtonContainer } from 'components/HoverButtonContainer';

interface PropsType {
  objectId: number;
  onIconClick: () => void;
  selectTag: (value: number | null) => void;
}

export const DeleteIcon: React.FunctionComponent<PropsType> = props => {
  const onClick = () => {
    props.selectTag(props.objectId);
    props.onIconClick();
  };
  return (
    <HoverButtonContainer>
      <GoTrashcan onClick={onClick} />
    </HoverButtonContainer>
  );
};
