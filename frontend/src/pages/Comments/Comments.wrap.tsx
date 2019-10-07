import { connect } from 'react-redux';
import Comments from './Comments';
import { getComments } from 'redux/Comment/comment.selectors';
import { loadComments } from 'redux/Comment/comment.actions';
import { Dispatch } from 'redux';
import { RootState } from 'redux/types';

const mapStateToProps = (state: RootState) => ({
  comments: getComments(state),
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  loadComments: () => dispatch(loadComments.request({})),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Comments);
