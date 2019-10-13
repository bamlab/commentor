import { connect } from 'react-redux';
import { RootState } from 'redux/types';
import { DeleteIcon } from './DeleteIcon';
import { Dispatch } from 'redux';
import { deleteTag } from 'redux/Tag/tag.actions';

const mapStateToProps = (state: RootState) => ({});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  deleteObject: (tagId: number) => dispatch(deleteTag.request({ tagId })),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DeleteIcon);
