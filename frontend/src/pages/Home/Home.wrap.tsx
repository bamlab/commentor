import { connect } from 'react-redux';
import { compose, withProps } from 'recompose';
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
  getFilters,
  getSelectedStartingDate,
  getSelectedEndingDate,
  getSelectedRequesterIds,
  getSelectedCommentords,
  getSelectedTagCodes,
} from 'redux/Filters';
import { HomePropsType } from './Home.type';
import { filterTags } from '../../redux/Tag/tag.adapter';

const mapStateToProps = (state: RootState) => ({
  isAuthenticated: isAuthenticated(state),
  comments: getComments(state),
  tags: getTags(state),
  isCommentLoading: isCommentLoading(state),
  repositoryIds: getSelectedRepositoryIds(state),
  requesterIds: getSelectedRequesterIds(state),
  commentorIds: getSelectedCommentords(state),
  tagCodes: getSelectedTagCodes(state),
  filters: getFilters(state),
  startingDate: getSelectedStartingDate(state),
  endingDate: getSelectedEndingDate(state),
});

// @ts-ignore Generic type 'Dispatch' requires 1 type argument(s)
const mapDispatchToProps = (dispatch: Dispatch) => ({
  loadRepositories: () => dispatch(loadRepositories.request({})),
  loadTags: () => dispatch(loadTags.request({})),
  login: (code: string) => dispatch(login.request({ code })),
  loadComments: (filters: {
    repositoryIds: number[];
    startingDate: Date | null;
    endingDate: Date | null;
    requesterIds: string[];
    commentorIds: string[];
    tagCodes: string[];
  }) =>
    dispatch(
      loadComments.request({
        ...filters,
      }),
    ),
});

const withFilteredTags = withProps(
  (ownerProps: HomePropsType): HomePropsType => {
    const filteredTags = filterTags(ownerProps.tags, ownerProps.filters);

    return {
      ...ownerProps,
      tags: filteredTags,
    };
  },
);

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
  withFilteredTags,
  // @ts-ignore
)(Home);
