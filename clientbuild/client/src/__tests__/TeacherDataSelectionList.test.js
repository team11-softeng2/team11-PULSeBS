import React from 'react';
import TeacherDataSelectionList from '../TeacherDataSelectionList';
import TestRenderer from 'react-test-renderer';
import { render, fireEvent } from '@testing-library/react';

test('renders correctly', () => {
  const tree = TestRenderer.create(<TeacherDataSelectionList 
                                      options={['Lecture', 'Week', 'Month']} 
                                      currentActive={'Lecture'}
                                      handleClick={() => {;}}/>).toJSON();
                                      
  expect(tree).toMatchSnapshot();
});

const handleClickMock = jest.fn();
test("item click", () => {
  const {queryByPlaceholderText, queryByTestId} = render(<TeacherDataSelectionList 
                                                          options={['Lecture', 'Week', 'Month']} 
                                                          currentActive={'Lecture'}
                                                          handleClick={handleClickMock}/>);
  const item = queryByTestId("testLecture");
  fireEvent.click(item);
  expect(handleClickMock).toHaveBeenCalledTimes(1);
})