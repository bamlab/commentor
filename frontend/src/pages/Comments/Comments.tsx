import React from 'react';
import { FormattedMessage } from 'react-intl';

import StyledComments from './Comments.style';
import { CommentType } from 'redux/Comment';

interface IProps {
  comments: CommentType[];
}

const Comments = React.memo<IProps>(props => {
  return (
    <StyledComments>
      <FormattedMessage id="comments.tmp" />
      <div>{JSON.stringify(props.comments)}</div>
    </StyledComments>
  );
});

export default Comments;
