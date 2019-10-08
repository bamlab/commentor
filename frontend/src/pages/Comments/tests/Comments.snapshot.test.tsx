import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import Comments from '../Comments';

/*
Snapshot tests allow you to easily lock the comportment of a component.
Given props, it renders the component and compares it to the saved snapshot.
*/
describe('[Snapshot] <Comments />', () => {
  it('should comments page', () => {
    const props = {
      comments: [],
      loadComments: jest.fn(),
      isCommentLoading: true,
    };
    const wrapper = shallow(<Comments {...props} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
