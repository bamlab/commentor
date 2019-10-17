import { connect } from 'react-redux';
import { RootState } from 'redux/types';
import { DeleteIcon } from './DeleteIcon';
import { Dispatch } from 'redux';
import { selectTag } from 'redux/Tag/tag.actions';

const mapStateToProps = (state: RootState) => ({});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  selectTag: (tagId: number | null) => dispatch(selectTag.request({ tagId })),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DeleteIcon);
