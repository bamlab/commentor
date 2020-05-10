import React, { useState } from 'react';
import {
  Modal,
  Button,
  ButtonContainer,
  HeaderTitle,
  InputContainer,
  TextInputsContainer,
  ColorPickerContainer,
  TagInput,
  DescriptionInput,
  colorBase,
  CircleColorContainer,
} from './AddTagModal.style';
import { CircledColor } from 'components/CircledColor';
import { FormattedMessage } from 'react-intl';

type PropsType = {
  id: string;
  isOpen: boolean;
  closeAddTagModal: () => void;
  addTag: (code: string, description: string, color: string) => void;
  isTagLoading: boolean;
};

export const AddTagModal = (props: PropsType) => {
  const [newCode, setNewCode] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newColorIndex, setNewColorIndex] = useState(0);

  const addTag = async () => {
    props.addTag(newCode, newDescription, colorBase[newColorIndex]);
    props.closeAddTagModal();
    setNewCode('');
    setNewDescription('');
    setNewColorIndex(0);
  };

  return (
    <Modal
      id={props.id}
      isOpen={props.isOpen}
      contentLabel="Add Tag Modal"
      onRequestClose={props.closeAddTagModal}
      className="AddTagModal"
    >
      <HeaderTitle>
        <FormattedMessage id="tags.title" />
      </HeaderTitle>
      <InputContainer>
        <TextInputsContainer>
          <TagInput
            type="Text"
            placeholder="Enter your tag here"
            onChange={event => {
              setNewCode(event.target.value);
            }}
          />
          <DescriptionInput
            placeholder="Description"
            rows={3}
            onChange={event => {
              setNewDescription(event.target.value);
            }}
          />
        </TextInputsContainer>
        <ColorPickerContainer>
          {colorBase.map((color, index) => (
            <CircleColorContainer key={index}>
              <CircledColor
                onClick={() => setNewColorIndex(index)}
                color={color}
                isSelected={index === newColorIndex}
              />
            </CircleColorContainer>
          ))}
        </ColorPickerContainer>
      </InputContainer>
      <ButtonContainer>
        <Button onClick={addTag} disabled={props.isTagLoading}>
          <FormattedMessage id="tags.add-tag" />
        </Button>
      </ButtonContainer>
    </Modal>
  );
};
