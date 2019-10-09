import React, { useEffect } from 'react';
import { FormattedMessage } from 'react-intl';
import Loader from 'components/Loader';
import StyledComments, { LoaderContainer, ButtonContainer } from './Comments.style';
import { CommentType } from 'redux/Comment';
import { GenericTable } from 'components/GenericTable/GenericTable';
import Button from 'components/Button';
import { fixedColumnCount, columnsConfig } from './columnsConfig';
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
      <GenericTable
        values={props.comments}
        fixedColumnCount={fixedColumnCount}
        columnsConfig={columnsConfig}
      />
      <ButtonContainer>
        <Button disabled={props.isCommentLoading} onClick={props.loadComments}>
          Refresh Comments
        </Button>
      </ButtonContainer>
    </StyledComments>
  );
});

export default Comments;
