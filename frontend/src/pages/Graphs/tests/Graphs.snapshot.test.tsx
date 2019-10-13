import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import Graphs from '../Graphs';

/*
Snapshot tests allow you to easily lock the comportment of a component.
Given props, it renders the component and compares it to the saved snapshot.
*/
describe('[Snapshot] <Tags />', () => {
  const props = {};
  it('should render Graphs page', () => {
    const wrapper = shallow(<Graphs {...props} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
