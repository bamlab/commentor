import React, { useEffect } from 'react';
import { FormattedMessage } from 'react-intl';
import { LoaderContainer } from './Tags.style';
import Loader from 'components/Loader';
import { GenericTable } from 'components/GenericTable/GenericTable';
import StyledTags from './Tags.style';
import { TagType } from 'redux/Tag';
import { columnsConfig, fixedColumnCount } from './columnsConfig';
import Button from 'components/Button';

interface IProps {
  tags: TagType[];
  loadTags: () => void;
  isTagLoading: boolean;
}

const Tags = React.memo<IProps>(props => {
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
      <Button onClick={() => {}}>
        <FormattedMessage id="tags.add-tag" />
      </Button>

      <GenericTable
        columnsConfig={columnsConfig}
        values={props.tags}
        fixedColumnCount={fixedColumnCount}
      />
    </StyledTags>
  );
});

export default Tags;
