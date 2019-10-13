import { connect } from 'react-redux';
import { RootState } from 'redux/types';
import { UpdateIcon } from './UpdateIcon';
import { Dispatch } from 'redux';
import { selectTag } from 'redux/Tag/tag.actions';

const mapStateToProps = (state: RootState) => ({});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  selectTag: (tagId: number | null) => dispatch(selectTag.request({ tagId })),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UpdateIcon);
