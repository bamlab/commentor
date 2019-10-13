import { connect } from 'react-redux';
import { RootState } from 'redux/types';
import { AddTagModal } from './AddTagModal';
import { Dispatch } from 'redux';
import { addTag } from 'redux/Tag/tag.actions';
import { isTagLoading } from 'redux/Tag/tag.selectors';

const mapStateToProps = (state: RootState) => ({
  isTagLoading: isTagLoading(state),
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  addTag: (code: string, description: string) => dispatch(addTag.request({ code, description })),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AddTagModal);
