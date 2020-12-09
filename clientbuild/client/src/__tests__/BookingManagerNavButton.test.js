import TestRenderer from 'react-test-renderer';
import React from 'react';
import BookingManagerNavButton from '../BookingManagerNavButton';
import { shallow } from 'enzyme';
import {BrowserRouter as Router} from 'react-router-dom';

import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

test('render button', () => {
    const tree = TestRenderer.create(<Router><BookingManagerNavButton/></Router>).toJSON();
    expect(tree).toMatchSnapshot();
  });


test('handleClick', async () => {
  const component = shallow(<BookingManagerNavButton/>);
  const instance = component.instance();
  expect(instance.state.onStatisticsPage).toBe(true);
  await instance.handleClick();
  expect(instance.state.onStatisticsPage).toBe(false);
});