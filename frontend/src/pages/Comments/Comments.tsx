import React, { useEffect } from 'react';
import { FormattedMessage } from 'react-intl';

import StyledComments from './Comments.style';
import { CommentType } from 'redux/Comment';

interface IProps {
  comments: CommentType[];
  loadComments: () => void;
}

const Comments = React.memo<IProps>(props => {
  useEffect(() => {
    props.loadComments();
    // eslint-disable-next-line
  }, []);

  return (
    <StyledComments>
      <FormattedMessage id="comments.tmp" />
      <div>{JSON.stringify(props.comments)}</div>
    </StyledComments>
  );
});

export default Comments;
