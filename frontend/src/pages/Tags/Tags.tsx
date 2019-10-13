import React, { useState, useEffect } from 'react';
import { LoaderContainer } from './Tags.style';
import Loader from 'components/Loader';
import { GenericTable } from 'components/GenericTable/GenericTable';
import StyledTags from './Tags.style';
import { TagType } from 'redux/Tag';
import { columnsConfig, fixedColumnCount } from './columnsConfig';
import Button from 'components/Button';
import { FormattedMessage } from 'react-intl';
import AddTagModal from './components/AddTagModal';
import UpdateTagModal from './components/UpdateTagModal';
import DeleteTagModal from './components/DeleteTagModal';

interface IProps {
  tags: TagType[];
  loadTags: () => void;
  isTagLoading: boolean;
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
      {props.isTagLoading && (
        <LoaderContainer>
          <Loader />
        </LoaderContainer>
      )}
      <Button onClick={() => setAddTagModalValue(true)} disabled={props.isTagLoading}>
        <FormattedMessage id="tags.add-tag" />
      </Button>

      <GenericTable
        columnsConfig={columnsConfig}
        values={props.tags}
        fixedColumnCount={fixedColumnCount}
        options={{
          openUpdateTagModal: () => setUpdateTagModalValue(true),
          openDeleteTagModal: () => setDeleteTagModalValue(true),
        }}
      />
      <AddTagModal
        id="addTagModal"
        isOpen={isAddTagModalOpen}
        setAddTagModalValue={setAddTagModalValue}
      />
      <UpdateTagModal
        id="updateTagModal"
        isOpen={isUpdateTagModalOpen}
        setUpdateTagModalValue={setUpdateTagModalValue}
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
