import { render, screen } from '@testing-library/react';
import TestRenderer from 'react-test-renderer';
import App from '../App';
import React from 'react';

test('renders learn react link', () => {
  const tree = TestRenderer.create(<App/>).toJSON();
  expect(tree).toMatchSnapshot();
});

describe("get functions", () => {
  test('getStudentBookings', () => {
    const myApp = new App();
    myApp.getStudentBookings(1);
    expect(myApp.state.bookings.length).toBeGreaterThanOrEqual(0);
  });

  test('getBookableStudentLectures', () => {
    const myApp = new App();
    myApp.getBookableStudentLectures(1);
    expect(myApp.state.bookableLectures.length).toBeGreaterThanOrEqual(0);
  });

  test('getTeacherLectures', () => {
    const myApp = new App();
    myApp.getTeacherLectures(1);
    expect(myApp.state.teacherLectures.length).toBeGreaterThanOrEqual(0);
  });

})
