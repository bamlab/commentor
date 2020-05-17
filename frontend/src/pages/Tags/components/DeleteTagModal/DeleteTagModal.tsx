import React from 'react';
import { Modal } from './DeleteTagModal.style';
import Button from 'components/Button';
import { FormattedMessage } from 'react-intl';

type PropsType = {
  id: string;
  isOpen: boolean;
  closeRemoveTageModal: () => void;
  deleteTag: (tagId: number) => void;
  isTagLoading: boolean;
  selectedTagId: number | null;
};

export const DeleteTagModal = (props: PropsType) => {
  const confirmDeletion = async () => {
    props.selectedTagId && props.deleteTag(props.selectedTagId);
    props.closeRemoveTageModal();
  };

  return (
    <Modal
      id={props.id}
      isOpen={props.isOpen}
      contentLabel="Delete Tag Modal"
      onRequestClose={props.closeRemoveTageModal}
    >
      Confirmer suppression ?
      <Button onClick={confirmDeletion} disabled={props.isTagLoading}>
        <FormattedMessage id="tags.delete-tag" />
      </Button>
      -
      <Button onClick={props.closeRemoveTageModal} disabled={props.isTagLoading}>
        Non
      </Button>
    </Modal>
  );
};
