import { connect } from 'react-redux';
import Comments from './Comments';
import { getComments } from 'redux/Comment';
import { RootState } from 'redux/types';

const mapStateToProps = (state: RootState) => ({
  comments: getComments(state),
});

function mapDispatchToProps() {
  return {};
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Comments);
