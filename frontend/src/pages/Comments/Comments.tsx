import React, { useEffect } from 'react';
import Loader from 'components/Loader';
import StyledComments, { FloatingButtonContainer } from './Comments.style';
import { CommentType } from 'redux/Comment';
import { GenericTable } from 'components/GenericTable/GenericTable';
import Button from 'components/Button';
import { GoSync } from 'react-icons/go';
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

      <FloatingButtonContainer>
        <Button disabled={props.isCommentLoading} onClick={loadComments}>
          {/* to refacto with Icon component */}
          {props.isCommentLoading ? <Loader /> : <GoSync size={25} />}
        </Button>
      </FloatingButtonContainer>
    </StyledComments>
  );
});

export default Comments;
