import { connect } from 'react-redux';
import { RootState } from 'redux/types';
import Graphs from './Graphs';
import { Dispatch } from 'redux';
import { loadTags } from 'redux/Tag/tag.actions';
import { getTags } from 'redux/Tag/tag.selectors';
import { getComments } from 'redux/Comment/comment.selectors';
import { loadComments } from 'redux/Comment/comment.actions';

const mapStateToProps = (state: RootState) => ({
  tags: getTags(state),
  comments: getComments(state),
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  loadTags: () => dispatch(loadTags.request({})),
  loadComments: () => dispatch(loadComments.request({})),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Graphs);
