import React, { useEffect } from 'react';
import { FormattedMessage } from 'react-intl';
import { LoaderContainer } from './Tags.style';
import Loader from 'components/Loader';
import StyledTags from './Tags.style';
import { TagType } from 'redux/Tag';

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
      <FormattedMessage id="tags.text" />
      {JSON.stringify(props.tags)}
    </StyledTags>
  );
});

export default Tags;
