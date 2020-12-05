import React from 'react';
import TeacherDataSelectionList from '../TeacherDataSelectionList';
import TestRenderer from 'react-test-renderer';

test('renders correctly', () => {
  const tree = TestRenderer.create(<TeacherDataSelectionList 
                                      options={['Lecture', 'Week', 'Month']} 
                                      currentActive={'Lecture'}
                                      handleClick={() => {;}}/>).toJSON();
                                      
  expect(tree).toMatchSnapshot();
});