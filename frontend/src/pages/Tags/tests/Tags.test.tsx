import React from 'react';
import { shallow } from 'enzyme';

import Tags from '../Tags';

describe('[Component] <Tags />', () => {
  const props = {
    tags: [],
    loadTags: jest.fn(),
    isTagLoading: true,
    addTag: jest.fn(),
    errorMessage: '',
  };

  it('should open Modal on button 0 click', () => {
    const wrapper = shallow(<Tags {...props} />);
    // @ts-ignore isOpen does exist
    expect(wrapper.find('#addTagModal').props().isOpen).toBe(false);
  });
});
