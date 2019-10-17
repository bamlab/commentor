import React, { useState } from 'react';
import { Modal } from 'components/Modal/Modal';
import InputRow from 'components/InputRow';
import Button from 'components/Button';
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
      isOpen={props.isOpen}
      contentLabel="Add Tag Modal"
      onRequestClose={props.closeAddTagModal}
    >
      <InputRow
        label="code"
        type="text"
        placeholder="Code..."
        field={{
          name: 'code',
          value: newCode,
          onChange: event => {
            setNewCode(event.target.value);
          },
        }}
      />
      <InputRow
        label="description"
        type="text"
        placeholder="Description..."
        field={{
          name: 'description',
          value: newDescription,
          onChange: event => {
            setNewDescription(event.target.value);
          },
        }}
      />
      <InputRow
        label="color"
        type="color"
        placeholder="Color..."
        field={{
          name: 'color',
          value: newColor,
          onChange: event => {
            setNewColor(event.target.value);
          },
        }}
      />
      <Button onClick={addTag} disabled={props.isTagLoading}>
        <FormattedMessage id="tags.add-tag" />
      </Button>
    </Modal>
  );
};
