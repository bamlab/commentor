import { connect } from 'react-redux';
import { RootState } from 'redux/types';
import { UpdateTagModal } from './UpdateTagModal';
import { Dispatch } from 'redux';
import { updateTag } from 'redux/Tag/tag.actions';
import { isTagLoading, getSelectedTagId } from 'redux/Tag/tag.selectors';

const mapStateToProps = (state: RootState) => ({
  isTagLoading: isTagLoading(state),
  selectedTagId: getSelectedTagId(state),
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  updateTag: (tagId: number, code: string, description: string, color: string) =>
    dispatch(updateTag.request({ tagId, code, description, color })),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UpdateTagModal);
