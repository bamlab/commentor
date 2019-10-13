import React, { useState } from 'react';
import { Modal } from 'components/Modal/Modal';
import InputRow from 'components/InputRow';
import Button from 'components/Button';
import { FormattedMessage } from 'react-intl';

type PropsType = {
  id: string;
  isOpen: boolean;
  setUpdateTagModalValue: (value: boolean) => void;
  updateTag: (tagId: number, code: string, description: string) => void;
  isTagLoading: boolean;
  selectedTagId: number | null;
};

export const UpdateTagModal = (props: PropsType) => {
  const [newCode, setNewCode] = useState('');
  const [newDescription, setNewDescription] = useState('');

  const updateTag = async () => {
    props.selectedTagId && props.updateTag(props.selectedTagId, newCode, newDescription);
    props.setUpdateTagModalValue(false);
  };

  return (
    <Modal
      id={props.id}
      isOpen={props.isOpen}
      contentLabel="Add Tag Modal"
      onRequestClose={() => props.setUpdateTagModalValue(false)}
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
      <Button onClick={updateTag} disabled={props.isTagLoading}>
        <FormattedMessage id="tags.update-tag" />
      </Button>
    </Modal>
  );
};
