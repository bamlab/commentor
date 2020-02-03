import { connect } from 'react-redux';
import Home from './Home';
import { loadRepositories } from 'redux/Repository/repository.actions';
import { isAuthenticated } from 'redux/Authentication/authentication.selectors';
import { login } from 'redux/Authentication/authentication.actions';
import { RootState } from 'redux/types';
import { Dispatch } from 'react';
import { loadComments } from 'redux/Comment/comment.actions';
import { getComments, isCommentLoading } from 'redux/Comment/comment.selectors';
import { getSelectedRepositoryIds } from 'redux/Filters';

const mapStateToProps = (state: RootState) => ({
  isAuthenticated: isAuthenticated(state),
  comments: getComments(state),
  isCommentLoading: isCommentLoading(state),
  repositoryIds: getSelectedRepositoryIds(state),
});

// @ts-ignore Generic type 'Dispatch' requires 1 type argument(s)
const mapDispatchToProps = (dispatch: Dispatch) => ({
  loadRepositories: () => dispatch(loadRepositories.request({})),
  login: (code: string) => dispatch(login.request({ code })),
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
)(Home);
