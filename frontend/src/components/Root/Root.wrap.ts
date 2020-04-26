import { connect } from 'react-redux';
import Root from './Root';
import { isAuthenticated } from 'redux/Authentication/authentication.selectors';
import { RootState } from 'redux/types';
import { Dispatch } from 'react';
import { isCommentLoading } from '../../redux/Comment';
import { isTagsOverTimeLoading } from '../../redux/GraphData';
import { loadComments } from '../../redux/Comment/comment.actions';

const mapStateToProps = (state: RootState) => ({
  isAuthenticated: isAuthenticated(state),
  isCommentLoading: isCommentLoading(state),
  isTagsOverTimeLoading: isTagsOverTimeLoading(state),
});

// @ts-ignore Generic type 'Dispatch' requires 1 type argument(s)
const mapDispatchToProps = (dispatch: Dispatch) => ({
  loadComments: () => dispatch(loadComments.request({})),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Root);
