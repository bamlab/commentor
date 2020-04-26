import { connect } from 'react-redux';
import { compose, withProps } from 'recompose';
import Home from './Home';
import { loadRepositories } from 'redux/Repository/repository.actions';
import { isAuthenticated } from 'redux/Authentication/authentication.selectors';
import { RootState } from 'redux/types';
import { Dispatch } from 'react';
import { getTags } from 'redux/Tag/tag.selectors';
import { loadComments } from 'redux/Comment/comment.actions';
import { loadTags } from 'redux/Tag/tag.actions';
import { getComments, isCommentLoading } from 'redux/Comment/comment.selectors';
import { getFilters } from 'redux/Filters';
import { HomePropsType } from './Home.type';
import { filterTags } from '../../redux/Tag/tag.adapter';

const mapStateToProps = (state: RootState) => ({
  isAuthenticated: isAuthenticated(state),
  comments: getComments(state),
  tags: getTags(state),
  isCommentLoading: isCommentLoading(state),
  filters: getFilters(state),
});

// @ts-ignore Generic type 'Dispatch' requires 1 type argument(s)
const mapDispatchToProps = (dispatch: Dispatch) => ({
  loadRepositories: () => dispatch(loadRepositories.request({})),
  loadTags: () => dispatch(loadTags.request({})),
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
