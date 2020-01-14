import React, { useEffect } from 'react';
import Loader from 'components/Loader';
import StyledComments, { LoaderContainer, FloatingButtonContainer } from './Comments.style';
import { CommentType } from 'redux/Comment';
import { GenericTable } from 'components/GenericTable/GenericTable';
import Button from 'components/Button';
import {
  fixedColumnCount,
  columnsConfig,
  lineHeight,
  CommentTableOptionsType,
} from './columnsConfig';

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
      <GenericTable<CommentTableOptionsType>
        values={props.comments}
        fixedColumnCount={fixedColumnCount}
        columnsConfig={columnsConfig}
        options={{}}
        defaultLineHeight={lineHeight}
      />
      {props.isCommentLoading && (
        <LoaderContainer>
          <Loader />
        </LoaderContainer>
      )}
      <FloatingButtonContainer>
        <Button disabled={props.isCommentLoading} onClick={loadComments}>
          Refresh Comments
        </Button>
      </FloatingButtonContainer>
    </StyledComments>
  );
});

export default Comments;
