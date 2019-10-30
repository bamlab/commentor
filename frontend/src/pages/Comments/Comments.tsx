import React, { useEffect } from 'react';
import { FormattedMessage } from 'react-intl';
import Loader from 'components/Loader';
import StyledComments, { LoaderContainer, ButtonContainer } from './Comments.style';
import { CommentType } from 'redux/Comment';
import { GenericTable } from 'components/GenericTable/GenericTable';
import Button from 'components/Button';
import { fixedColumnCount, columnsConfig, CommentTableOptionsType } from './columnsConfig';

interface IProps {
  comments: CommentType[];
  loadComments: (filters: { repositoryIds: number[] }) => void;
  isCommentLoading: boolean;
  repositoryIds: number[];
}

const Comments = React.memo<IProps>(props => {
  const loadComments = () => {
    props.loadComments({ repositoryIds: props.repositoryIds });
  };

  useEffect(() => {
    loadComments();
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
      <GenericTable<CommentTableOptionsType>
        values={props.comments}
        fixedColumnCount={fixedColumnCount}
        columnsConfig={columnsConfig}
        options={{}}
      />
      <ButtonContainer>
        <Button disabled={props.isCommentLoading} onClick={loadComments}>
          Refresh Comments
        </Button>
      </ButtonContainer>
    </StyledComments>
  );
});

export default Comments;
