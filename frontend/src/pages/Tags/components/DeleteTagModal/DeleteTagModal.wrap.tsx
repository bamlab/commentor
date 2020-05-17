import { connect } from 'react-redux';
import { RootState } from 'redux/types';
import { DeleteTagModal } from './DeleteTagModal';
import { Dispatch } from 'redux';
import { deleteTag } from 'redux/Tag/tag.actions';
import { isTagLoading, getSelectedTagId, getSelectedTag } from 'redux/Tag/tag.selectors';

const mapStateToProps = (state: RootState) => ({
  isTagLoading: isTagLoading(state),
  selectedTagId: getSelectedTagId(state),
  selectedTag: getSelectedTag(state),
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  deleteTag: (tagId: number) => dispatch(deleteTag.request({ tagId })),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DeleteTagModal);
