import React, { useEffect } from 'react';
import { FormattedMessage } from 'react-intl';
import Loader from 'components/Loader';
import StyledComments, { LoaderContainer, ButtonContainer } from './Comments.style';
import { CommentType } from 'redux/Comment';
import { CommentsTable } from 'components/CommentsTable';
import Button from 'components/Button';
interface IProps {
  comments: CommentType[];
  loadComments: () => void;
  isCommentLoading: boolean;
}

const Comments = React.memo<IProps>(props => {
  useEffect(() => {
    props.loadComments();
  }, []);

  return (
    <StyledComments>
      {props.isCommentLoading && (
        <LoaderContainer>
          <Loader />
        </LoaderContainer>
      )}
      <FormattedMessage id="comments.tmp" />
      <CommentsTable comments={props.comments} />
      <ButtonContainer>
        <Button disabled={props.isCommentLoading} onClick={props.loadComments}>
          Refresh Comments
        </Button>
      </ButtonContainer>
    </StyledComments>
  );
});

export default Comments;
