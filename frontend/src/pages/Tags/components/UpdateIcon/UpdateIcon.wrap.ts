import { connect } from 'react-redux';
import { RootState } from 'redux/types';
import { UpdateIcon } from './UpdateIcon';
import { Dispatch } from 'redux';
import { updateTag } from 'redux/Tag/tag.actions';

const mapStateToProps = (state: RootState) => ({});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  updateTag: (tagId: number, code: string, description: string) =>
    dispatch(updateTag.request({ tagId, code, description })),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UpdateIcon);
