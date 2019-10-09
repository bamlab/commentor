import React from 'react';
import { shallow } from 'enzyme';

import Tags from '../Tags';

describe('[Component] <Tags />', () => {
  const props = {
    tags: [],
    loadTags: jest.fn(),
    isTagLoading: true,
    addTag: jest.fn(),
  };

  it('should call addTag on button click', () => {
    const wrapper = shallow(<Tags {...props} />);
    wrapper.find('Button').simulate('click');
    expect(props.addTag).toHaveBeenCalledWith();
  });
});
