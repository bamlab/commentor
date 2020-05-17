import React, { useState, useEffect } from 'react';
import InputRow from 'components/InputRow';
import Button from 'components/Button';
import { FormattedMessage } from 'react-intl';
import { TagType } from 'redux/Tag';
import { Modal, Container } from './UpdateTagModal.style';
import { Background } from 'components/Background';

type PropsType = {
  id: string;
  isOpen: boolean;
  closeUpdateModal: () => void;
  updateTag: (tagId: number, code: string, description: string, color: string) => void;
  isTagLoading: boolean;
  selectedTag: TagType;
};

export const UpdateTagModal = (props: PropsType) => {
  const [newCode, setNewCode] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newColor, setNewColor] = useState('#000000');

  useEffect(
    () => {
      setNewCode(props.selectedTag.code);
      setNewDescription(props.selectedTag.description);
      setNewColor(props.selectedTag.color);
    },
    [props.selectedTag],
  );

  const updateTag = async () => {
    props.updateTag(props.selectedTag.id, newCode, newDescription, newColor);
    props.closeUpdateModal();
  };

  return (
    <Modal
      id={props.id}
      isOpen={props.isOpen}
      contentLabel="Update Tag Modal"
      onRequestClose={props.closeUpdateModal}
    >
      <Background />
      <Container>
        <InputRow
          label="Code:"
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
          label="Description:"
          type="area"
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
          label="Color:"
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
        <Button onClick={updateTag} disabled={props.isTagLoading} hoverColor="green">
          <FormattedMessage id="tags.update-tag" />
        </Button>
      </Container>
    </Modal>
  );
};
