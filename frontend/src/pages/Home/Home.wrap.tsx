import { connect } from 'react-redux';
import Home from './Home';
import { loadRepositories } from 'redux/Repository/repository.actions';
import { isAuthenticated } from 'redux/Authentication/authentication.selectors';
import { RootState } from 'redux/types';
import { Dispatch } from 'react';
import { loadComments } from 'redux/Comment/comment.actions';
import { loadTags } from 'redux/Tag/tag.actions';
import { getComments, isCommentLoading } from 'redux/Comment/comment.selectors';

const mapStateToProps = (state: RootState) => ({
  isAuthenticated: isAuthenticated(state),
  comments: getComments(state),
  isCommentLoading: isCommentLoading(state),
});

// @ts-ignore Generic type 'Dispatch' requires 1 type argument(s)
const mapDispatchToProps = (dispatch: Dispatch) => ({
  loadRepositories: () => dispatch(loadRepositories.request({})),
  loadTags: () => dispatch(loadTags.request({})),
  loadComments: () => dispatch(loadComments.request({})),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Home);
