import React, { useEffect } from 'react';
import { FormattedMessage } from 'react-intl';

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
  }, []);

  return (
    <StyledTags>
      <FormattedMessage id="tags.text" />
      {JSON.stringify(props.tags)}
    </StyledTags>
  );
});

export default Tags;
