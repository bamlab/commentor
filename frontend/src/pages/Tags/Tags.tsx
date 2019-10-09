import React, { useState, useEffect } from 'react';
import { FormattedMessage } from 'react-intl';
import { LoaderContainer } from './Tags.style';
import Loader from 'components/Loader';
import { GenericTable } from 'components/GenericTable/GenericTable';
import StyledTags from './Tags.style';
import { TagType } from 'redux/Tag';
import { columnsConfig, fixedColumnCount } from './columnsConfig';
import Button from 'components/Button';
import { Modal } from 'components/Modal/Modal';
import InputRow from 'components/InputRow';

interface IProps {
  tags: TagType[];
  loadTags: () => void;
  isTagLoading: boolean;
  addTag: (code: string, description: string) => void;
}

const Tags = React.memo<IProps>(props => {
  const [isAddTagModalOpen, setAddTagModalValue] = useState(false);
  const [newCode, setNewCode] = useState('');
  const [newDescription, setNewDescription] = useState('');

  const addTag = async () => {
    props.addTag(newCode, newDescription);
    setAddTagModalValue(false);
    setNewCode('');
    setNewDescription('');
  };
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
      <Modal isOpen={isAddTagModalOpen} contentLabel="Add Tag Modal">
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
    </StyledTags>
  );
});

export default Tags;
