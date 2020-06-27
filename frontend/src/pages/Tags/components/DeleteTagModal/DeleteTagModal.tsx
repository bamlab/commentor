import React from 'react';
import {
  Modal,
  ContentContainer,
  HeaderTitle,
  TagContainer,
  Code,
  Description,
  Color,
  ButtonContainer,
  CancelButton,
} from './DeleteTagModal.style';
import Button from 'components/Button';
import { FormattedMessage } from 'react-intl';
import { TagType } from '../../../../redux/Tag';
import { GoTrashcan } from 'react-icons/go';
import { Background } from 'components/Background';

interface PropsType {
  id: string;
  isOpen: boolean;
  closeRemoveTageModal: () => void;
  deleteTag: (tagId: number) => void;
  isTagLoading: boolean;
  selectedTagId: number | null;
  selectedTag: TagType;
}

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
      <Background />
      <ContentContainer>
        <HeaderTitle>
          <FormattedMessage id="tags.delete-tag-confirmation" />
        </HeaderTitle>
        <TagContainer>
          <Code>{props.selectedTag.code}</Code>
          <Description>{props.selectedTag.description}</Description>
          <Color color={props.selectedTag.color} />
        </TagContainer>
        <ButtonContainer>
          <Button onClick={confirmDeletion} disabled={props.isTagLoading} hoverColor="green">
            <GoTrashcan /> <FormattedMessage id="tags.delete-tag" />
          </Button>
          <CancelButton onClick={props.closeRemoveTageModal}>
            <FormattedMessage id="tags.delete-tag-cancel" />
          </CancelButton>
        </ButtonContainer>
      </ContentContainer>
    </Modal>
  );
};
