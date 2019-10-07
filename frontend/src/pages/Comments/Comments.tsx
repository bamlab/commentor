import React, { useEffect } from 'react';
import { FormattedMessage } from 'react-intl';
import Loader from 'components/Loader';
import StyledComments, { LoaderContainer } from './Comments.style';
import { CommentType } from 'redux/Comment';
interface IProps {
  comments: CommentType[];
  loadComments: () => void;
  isCommentLoading: boolean;
}

const Comments = React.memo<IProps>(props => {
  useEffect(() => {
    props.loadComments();
    // eslint-disable-next-line
  }, []);

  return (
    <StyledComments>
      {props.isCommentLoading && (
        <LoaderContainer>
          <Loader />
        </LoaderContainer>
      )}
      <FormattedMessage id="comments.tmp" />
      <div>{JSON.stringify(props.comments)}</div>
    </StyledComments>
  );
});

export default Comments;
