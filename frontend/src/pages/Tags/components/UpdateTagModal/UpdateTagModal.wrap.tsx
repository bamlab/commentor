import { connect } from 'react-redux';
import { RootState } from 'redux/types';
import { UpdateTagModal } from './UpdateTagModal';
import { Dispatch } from 'redux';
import { updateTag, selectTag } from 'redux/Tag/tag.actions';
import { isTagLoading, getSelectedTagId } from 'redux/Tag/tag.selectors';

const mapStateToProps = (state: RootState) => ({
  isTagLoading: isTagLoading(state),
  selectedTagId: getSelectedTagId(state),
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  updateTag: (tagId: number, code: string, description: string) =>
    dispatch(updateTag.request({ tagId, code, description })),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UpdateTagModal);
