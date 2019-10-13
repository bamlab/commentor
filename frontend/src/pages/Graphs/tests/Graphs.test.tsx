import React from 'react';
import { shallow } from 'enzyme';

import Graphs from '../Graphs';

describe('[Component] <Graphs />', () => {
  const props = {};

  it('should do thing', () => {
    const wrapper = shallow(<Graphs {...props} />);
    expect(true).toBe(true);
  });
});
