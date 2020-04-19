import { connect } from 'react-redux';
import { compose } from 'recompose';
import { RootState } from 'redux/types';
import { Dispatch } from 'react';
import Login from './Login';

const mapStateToProps = (state: RootState) => ({});

// @ts-ignore Generic type 'Dispatch' requires 1 type argument(s)
const mapDispatchToProps = (dispatch: Dispatch) => ({});

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
)(Login);
