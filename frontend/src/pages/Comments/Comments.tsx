import React from 'react';
import { FormattedMessage } from 'react-intl';

import StyledComments from './Comments.style';

interface IProps {}

const Comments = React.memo<IProps>(props => {
  return (
    <StyledComments>
      <FormattedMessage id="please.change.me" />
    </StyledComments>
  );
});

export default Comments;
