import { connect } from 'react-redux';
import Home from './Home';
import { loadRepositories } from 'redux/Repository/repository.actions';
import { isAuthenticated } from 'redux/Authentication/authentication.selectors';
import { login } from 'redux/Authentication/authentication.actions';
import { RootState } from 'redux/types';
import { Dispatch } from 'react';
import { getTags } from 'redux/Tag/tag.selectors';
import { loadComments } from 'redux/Comment/comment.actions';
import { loadTags } from 'redux/Tag/tag.actions';
import { getComments, isCommentLoading } from 'redux/Comment/comment.selectors';
import {
  getSelectedRepositoryIds,
  getSelectedRequesterIds,
  getSelectedCommentords,
} from 'redux/Filters';

const mapStateToProps = (state: RootState) => ({
  isAuthenticated: isAuthenticated(state),
  comments: getComments(state),
  tags: getTags(state),
  isCommentLoading: isCommentLoading(state),
  repositoryIds: getSelectedRepositoryIds(state),
  selectedRequesterIds: getSelectedRequesterIds(state),
  selectedCommentorIds: getSelectedCommentords(state),
});

// @ts-ignore Generic type 'Dispatch' requires 1 type argument(s)
const mapDispatchToProps = (dispatch: Dispatch) => ({
  loadRepositories: () => dispatch(loadRepositories.request({})),
  loadTags: () => dispatch(loadTags.request({})),
  login: (code: string) => dispatch(login.request({ code })),
  loadComments: (filters: {
    repositoryIds: number[];
  }) =>
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
