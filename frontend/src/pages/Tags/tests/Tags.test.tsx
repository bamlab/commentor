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

  it('should open Modal on button 0 click', () => {
    const wrapper = shallow(<Tags {...props} />);
    expect(wrapper.find('#addTagModal').props().isOpen).toBe(false);
  });

  it('should call addTag on button1  click', () => {
    const wrapper = shallow(<Tags {...props} />);
    wrapper
      .find('Button')
      .at(1)
      .simulate('click');
    expect(props.addTag).toHaveBeenCalledWith('', '');
  });
});
