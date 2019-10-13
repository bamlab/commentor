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

interface IProps {
  tags: TagType[];
  loadTags: () => void;
  isTagLoading: boolean;
}

const Tags = React.memo<IProps>(props => {
  const [isAddTagModalOpen, setAddTagModalValue] = useState(false);

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
      />
      <AddTagModal
        id="addTagModal"
        isOpen={isAddTagModalOpen}
        setAddTagModalValue={setAddTagModalValue}
      />
    </StyledTags>
  );
});

export default Tags;
