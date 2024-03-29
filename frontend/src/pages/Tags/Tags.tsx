import React, { useState, useEffect } from 'react';
import { FloatingButtonContainer } from './Tags.style';
import Loader from 'components/Loader';
import { GenericTable } from 'components/GenericTable/GenericTable';
import { Container, ErrorMessage } from './Tags.style';
import { TagType } from 'redux/Tag';
import { columnsConfig, fixedColumnCount, lineHeight, TagTableOptionsType } from './columnsConfig';
import Button from 'components/Button';
import { GoPlus } from 'react-icons/go';
import AddTagModal from './components/AddTagModal';
import UpdateTagModal from './components/UpdateTagModal';
import DeleteTagModal from './components/DeleteTagModal';

interface IProps {
  tags: TagType[];
  loadTags: () => void;
  isTagLoading: boolean;
  errorMessage: string | null;
}

const Tags = React.memo<IProps>(props => {
  const [isAddTagModalOpen, setAddTagModalValue] = useState(false);
  const [isUpdateTagModalOpen, setUpdateTagModalValue] = useState(false);
  const [isDeleteTagModalOpen, setDeleteTagModalValue] = useState(false);

  useEffect(() => {
    props.loadTags();
    // eslint-disable-next-line
  }, []);

  return (
    <Container>
      <ErrorMessage>{props.errorMessage || ''}</ErrorMessage>
      <GenericTable<TagTableOptionsType, TagType>
        columnsConfig={columnsConfig}
        values={props.tags}
        fixedColumnCount={fixedColumnCount}
        defaultLineHeight={lineHeight}
        options={{
          openUpdateTagModal: () => setUpdateTagModalValue(true),
          openDeleteTagModal: () => setDeleteTagModalValue(true),
        }}
      />
      <FloatingButtonContainer>
        <Button onClick={() => setAddTagModalValue(true)} disabled={props.isTagLoading}>
          {/* to refacto with Icon component */}
          {props.isTagLoading ? <Loader /> : <GoPlus size={25} />}
        </Button>
      </FloatingButtonContainer>
      <AddTagModal
        id="addTagModal"
        isOpen={isAddTagModalOpen}
        closeModal={() => setAddTagModalValue(false)}
      />
      <UpdateTagModal
        id="updateTagModal"
        isOpen={isUpdateTagModalOpen}
        closeUpdateModal={() => setUpdateTagModalValue(false)}
      />
      <DeleteTagModal
        id="deleteTagModal"
        isOpen={isDeleteTagModalOpen}
        closeRemoveTageModal={() => setDeleteTagModalValue(false)}
      />
    </Container>
  );
});

export default Tags;
