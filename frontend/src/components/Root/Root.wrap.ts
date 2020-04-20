import { connect } from 'react-redux';
import Root from './Root';
import { isAuthenticated } from 'redux/Authentication/authentication.selectors';
import { RootState } from 'redux/types';
import { Dispatch } from 'react';
import { isCommentLoading } from '../../redux/Comment';

const mapStateToProps = (state: RootState) => ({
  isAuthenticated: isAuthenticated(state),
  isCommentLoading: isCommentLoading(state),
});

// @ts-ignore Generic type 'Dispatch' requires 1 type argument(s)
const mapDispatchToProps = (dispatch: Dispatch) => ({});
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Root);
