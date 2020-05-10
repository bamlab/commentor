import { connect } from 'react-redux';
import Root from './Root';
import { isAuthenticated } from 'redux/Authentication/authentication.selectors';
import { RootState } from 'redux/types';
import { Dispatch } from 'react';
import { isCommentLoading } from '../../redux/Comment';
import { loadComments } from '../../redux/Comment/comment.actions';
import { isTagLoading } from '../../redux/Tag';
import { isRepositoriesLoading } from '../../redux/Repository';

const mapStateToProps = (state: RootState) => ({
  isAuthenticated: isAuthenticated(state),
  isCommentLoading: isCommentLoading(state),
  isTagLoading: isTagLoading(state),
  isRepositoriesLoading: isRepositoriesLoading(state),
});

// @ts-ignore Generic type 'Dispatch' requires 1 type argument(s)
const mapDispatchToProps = (dispatch: Dispatch) => ({
  loadComments: () => dispatch(loadComments.request({})),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Root);
