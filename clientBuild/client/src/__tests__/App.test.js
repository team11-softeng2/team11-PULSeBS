import { render, screen } from '@testing-library/react';
import App from '../App';
import React from 'react';

test('renders learn react link', () => {
  const testRender = render(<App/>);
  expect(testRender).not.toBe(null);
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

  test('setLoggedIn', () => {
    const myApp = new App();
    myApp.setLoggedIn({role: "student", idUser: 999, name: "test"});
    expect(myApp.state.loggedin).toBe(false);
  });

  test('logout', () => {
    const myApp = new App();
    myApp.logout();
    expect(myApp.state.loggedin).toBe(false);
  });

})
