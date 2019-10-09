import React from 'react';
import { FormattedMessage } from 'react-intl';

import StyledTags from './Tags.style';

interface IProps {}

const Tags = React.memo<IProps>(props => {
  return (
    <StyledTags>
      <FormattedMessage id="tags.text" />
    </StyledTags>
  );
});

export default Tags;
