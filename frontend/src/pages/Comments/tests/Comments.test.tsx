import React from 'react';
import { shallow } from 'enzyme';

import Comments from '../Comments';

/*
This file contains all unit tests. The standard is:
  - The name of the test is explicit.
  - The test file contains tests for each of the function use cases.
  - The test is testing one action only.
  - The test can fail.
*/
describe('[Component] <Comments />', () => {
  const props = {
    comments: [],
    loadComments: jest.fn(),
    isCommentLoading: true,
  };
  it('should call loadComment on button click', () => {
    const wrapper = shallow(<Comments {...props} />);
    wrapper.find('Button').simulate('click');
    expect(props.loadComments).toHaveBeenCalledWith();
  });
});
