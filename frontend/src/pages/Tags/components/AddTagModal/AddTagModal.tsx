import React, { useState } from 'react';
import {
  Modal,
  Button,
  HeaderTitle,
  InputContainer,
  TextInputsContainer,
  ColorPickerContainer,
  TagInput,
  DescriptionInput,
} from './AddTagModal.style';
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
  const [newColor, setNewColor] = useState('#000000');

  const addTag = async () => {
    props.addTag(newCode, newDescription, newColor);
    props.closeAddTagModal();
    setNewCode('');
    setNewDescription('');
    setNewColor('#000000');
  };

  return (
    <Modal
      id={props.id}
      isOpen={true}
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
        <ColorPickerContainer>345</ColorPickerContainer>
      </InputContainer>
      <Button onClick={addTag} disabled={props.isTagLoading}>
        <FormattedMessage id="tags.add-tag" />
      </Button>
    </Modal>
  );
};
