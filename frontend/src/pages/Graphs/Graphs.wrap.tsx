import { connect } from 'react-redux';
import { RootState } from 'redux/types';
import Graphs from './Graphs';
import { Dispatch } from 'redux';
import { loadTags } from 'redux/Tag/tag.actions';
import { getTags } from 'redux/Tag/tag.selectors';
import { getComments } from 'redux/Comment/comment.selectors';
import { loadComments } from 'redux/Comment/comment.actions';
import { TagType } from 'redux/Tag';
import { CommentType } from 'redux/Comment';

import { getSelectedProjectIds } from 'redux/Filters';

const mapStateToProps = (state: RootState) => ({
  tags: getTags(state),
  comments: getComments(state),
  selectedProjectIds: getSelectedProjectIds(state),
});

const mapDispatchToProps = (
  dispatch: Dispatch,
  ownProps: { tags: TagType[]; comments: CommentType[]; selectedProjectIds: number[] },
) => ({
  loadTags: () => dispatch(loadTags.request({})),
  loadComments: (filters: { projectIds: number[] }) =>
    dispatch(
      loadComments.request({
        ...filters,
      }),
    ),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Graphs);
