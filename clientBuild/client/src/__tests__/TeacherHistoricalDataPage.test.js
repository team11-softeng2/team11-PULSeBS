import TestRenderer from 'react-test-renderer';
import React from 'react';
import TeacherHistoricalDataPage from '../TeacherHistoricalDataPage';

import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

test('renders learn react link', () => {
    const tree = TestRenderer.create(<TeacherHistoricalDataPage/>).toJSON();
    expect(tree).toMatchSnapshot();
  });