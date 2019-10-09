import { connect } from 'react-redux';
import { RootState } from 'redux/types';
import Tags from './Tags';
import { Dispatch } from 'redux';
import { loadTags } from 'redux/Tag/tag.actions';
import { getTags, isTagLoading } from 'redux/Tag/tag.selectors';

const mapStateToProps = (state: RootState) => ({
  tags: getTags(state),
  isTagLoading: isTagLoading(state),
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  loadTags: () => dispatch(loadTags.request({})),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Tags);
