import React, { useState, useEffect } from 'react';
import { LoaderContainer, ButtonContainer } from './Tags.style';
import Loader from 'components/Loader';
import { GenericTable } from 'components/GenericTable/GenericTable';
import { StyledTags, ErrorMessage } from './Tags.style';
import { TagType } from 'redux/Tag';
import { columnsConfig, fixedColumnCount, lineHeight, TagTableOptionsType } from './columnsConfig';
import Button from 'components/Button';
import { FormattedMessage } from 'react-intl';
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
    <StyledTags>
      <ErrorMessage>{props.errorMessage || ''}</ErrorMessage>
      <GenericTable<TagTableOptionsType>
        columnsConfig={columnsConfig}
        values={props.tags}
        fixedColumnCount={fixedColumnCount}
        defaultLineHeight={lineHeight}
        options={{
          openUpdateTagModal: () => setUpdateTagModalValue(true),
          openDeleteTagModal: () => setDeleteTagModalValue(true),
        }}
      />
      {props.isTagLoading && (
        <LoaderContainer>
          <Loader />
        </LoaderContainer>
      )}
      <ButtonContainer>
        <Button onClick={() => setAddTagModalValue(true)} disabled={props.isTagLoading}>
          <FormattedMessage id="tags.add-tag" />
        </Button>
      </ButtonContainer>
      <AddTagModal
        id="addTagModal"
        isOpen={isAddTagModalOpen}
        closeAddTagModal={() => setAddTagModalValue(false)}
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
    </StyledTags>
  );
});

export default Tags;
