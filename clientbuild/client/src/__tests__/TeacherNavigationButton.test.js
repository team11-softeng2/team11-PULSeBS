import TestRenderer from 'react-test-renderer';
import React from 'react';
import TeacherNavigationButton from '../TeacherNavigationButton';
import { shallow } from 'enzyme';
import {BrowserRouter as Router} from 'react-router-dom';

import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

test('renders learn react link', () => {
    const tree = TestRenderer.create(<Router><TeacherNavigationButton/></Router>).toJSON();
    expect(tree).toMatchSnapshot();
  });


test('handleClick', async () => {
  const component = shallow(<TeacherNavigationButton/>);
  const instance = component.instance();
  expect(instance.state.onCalendar).toBe(true);
  await instance.handleClick();
  expect(instance.state.onCalendar).toBe(false);
});