import React, { useState } from 'react';
import { Modal } from 'components/Modal/Modal';
import InputRow from 'components/InputRow';
import Button from 'components/Button';
import { FormattedMessage } from 'react-intl';

type PropsType = {
  id: string;
  isOpen: boolean;
  setAddTagModalValue: (value: boolean) => void;
  addTag: (code: string, description: string) => void;
  isTagLoading: boolean;
};

export const AddTagModal = (props: PropsType) => {
  const [newCode, setNewCode] = useState('');
  const [newDescription, setNewDescription] = useState('');

  const addTag = async () => {
    props.addTag(newCode, newDescription);
    props.setAddTagModalValue(false);
    setNewCode('');
    setNewDescription('');
  };

  return (
    <Modal
      id={props.id}
      isOpen={props.isOpen}
      contentLabel="Add Tag Modal"
      onRequestClose={() => props.setAddTagModalValue(false)}
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
      <Button onClick={addTag} disabled={props.isTagLoading}>
        <FormattedMessage id="tags.add-tag" />
      </Button>
    </Modal>
  );
};
