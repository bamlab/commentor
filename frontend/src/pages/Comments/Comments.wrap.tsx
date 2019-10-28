import { connect } from 'react-redux';
import Comments from './Comments';
import { getComments, isCommentLoading } from 'redux/Comment/comment.selectors';
import { loadComments } from 'redux/Comment/comment.actions';
import { Dispatch } from 'redux';
import { RootState } from 'redux/types';
import { getSelectedRepositoryIds } from 'redux/Filters';

const mapStateToProps = (state: RootState) => ({
  comments: getComments(state),
  isCommentLoading: isCommentLoading(state),
  repositoryIds: getSelectedRepositoryIds(state),
});

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    loadComments: (filters: { repositoryIds: number[] }) =>
      dispatch(
        loadComments.request({
          ...filters,
        }),
      ),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Comments);
