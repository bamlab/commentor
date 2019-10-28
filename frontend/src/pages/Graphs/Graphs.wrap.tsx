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

import { getSelectedRepositoryIds } from 'redux/Filters';

const mapStateToProps = (state: RootState) => ({
  tags: getTags(state),
  comments: getComments(state),
  repositoryIds: getSelectedRepositoryIds(state),
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  loadTags: () => dispatch(loadTags.request({})),
  loadComments: (filters: { repositoryIds: number[] }) =>
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
