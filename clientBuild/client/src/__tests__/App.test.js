import { render, screen } from '@testing-library/react';
import TestRenderer from 'react-test-renderer';
import App from '../App';
import React from 'react';
import API from '../API';
import { shallow } from 'enzyme';

import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

test('renders learn react link', () => {
  const tree = TestRenderer.create(<App/>).toJSON();
  expect(tree).toMatchSnapshot();
});

describe("get functions", () => {
  test('getStudentBookings', async () => {
    const component = shallow(<App/>);
    const instance = component.instance();
    expect(instance.state.loggedin).toBe(false);
    API.getStudentBookings = jest.fn(() => Promise.resolve(["test"]));
    instance.setLoggedIn({role: "teacher", name:"Rocco", idUser: 2});
    expect(instance.state.loggedin).toBe(true);
    await instance.getStudentBookings(2);
    expect(instance.state.bookings.length).toBe(1);
  });

  test('getBookableStudentLectures', async () => {
    const component = shallow(<App/>);
    const instance = component.instance();
    expect(instance.state.loggedin).toBe(false);
    API.getBookableStudentLectures = jest.fn(() => Promise.resolve(["test"]));
    instance.setLoggedIn({role: "teacher", name:"Rocco", idUser: 2});
    expect(instance.state.loggedin).toBe(true);
    await instance.getBookableStudentLectures(2);
    expect(instance.state.bookableLectures.length).toBe(1);
  });

  test('getTeacherLectures', async () => {
    const component = shallow(<App/>);
    const instance = component.instance();
    expect(instance.state.loggedin).toBe(false);
    API.getTeacherLectures = jest.fn(() => Promise.resolve(["test"]));
    instance.setLoggedIn({role: "teacher", name:"Rocco", idUser: 2});
    expect(instance.state.loggedin).toBe(true);
    await instance.getTeacherLectures(2);
    expect(instance.state.teacherLectures.length).toBe(1);
  });

  test("setLoggedIn student", () => {
    const component = shallow(<App/>);
    const instance = component.instance();
    expect(instance.state.loggedin).toBe(false);
    expect(instance.state.userId).toBe(undefined);
    expect(instance.state.userName).toBe(undefined);
    instance.setLoggedIn({role: "student", name:"Test", idUser: 99});
    expect(instance.state.loggedin).toBe(true);
    expect(instance.state.userId).toBe(99);
    expect(instance.state.userName).toBe("Test");
    expect(instance.state.userRole).toBe("student");
  });

  test("setLoggedIn teacher", async () => {
    const component = shallow(<App/>);
    const instance = component.instance();
    expect(instance.state.loggedin).toBe(false);
    expect(instance.state.userId).toBe(undefined);
    expect(instance.state.userName).toBe(undefined);
    instance.getTeacherLectures = jest.fn();
    await instance.setLoggedIn({role: "teacher", name:"Rocco", idUser: 2});
    expect(instance.state.loggedin).toBe(true);
    expect(instance.state.userId).toBe(2);
    expect(instance.state.userName).toBe("Rocco");
    expect(instance.state.userRole).toBe("teacher");
    expect(instance.getTeacherLectures).toHaveBeenCalledTimes(1);
  });
  
  test("logout", async () => {
    const component = shallow(<App/>);
    const instance = component.instance();
    expect(instance.state.loggedin).toBe(false);
    API.logout = jest.fn(() => Promise.resolve());
    instance.setLoggedIn({role: "student", name:"Test", idUser: 99});
    expect(instance.state.loggedin).toBe(true);
    await instance.logout();
    expect(instance.state.loggedin).toBe(false);

    API.logout = jest.fn(() => Promise.reject());
    instance.setLoggedIn({role: "student", name:"Test", idUser: 99});
    expect(instance.state.loggedin).toBe(true);
    await instance.logout();
    expect(instance.state.loggedin).toBe(true);
  });

  test("bookASeat", async () => {
    const component = shallow(<App/>);
    const instance = component.instance();
    expect(instance.state.loggedin).toBe(false);
    API.bookASeat = jest.fn(() => Promise.resolve());
    instance.setLoggedIn({role: "student", name:"Calogero", idUser: 1});
    expect(instance.state.loggedin).toBe(true);
    instance.getStudentBookings = jest.fn();
    await instance.bookASeat(99, "2020-10-10", "10:00:00");
    expect(instance.getStudentBookings).toHaveBeenCalledTimes(1);

    API.bookASeat = jest.fn(() => Promise.reject());
    await instance.bookASeat(99, "2020-10-10", "10:00:00");
    expect(instance.getStudentBookings).toHaveBeenCalledTimes(1);
  });

  test("deleteBooking", async () => {
    const component = shallow(<App/>);
    const instance = component.instance();
    expect(instance.state.loggedin).toBe(false);
    API.deleteBooking = jest.fn(() => Promise.resolve());
    instance.setLoggedIn({role: "student", name:"Calogero", idUser: 1});
    expect(instance.state.loggedin).toBe(true);
    instance.getStudentBookings = jest.fn();
    await instance.deleteBooking(99);
    expect(instance.getStudentBookings).toHaveBeenCalledTimes(1);
  });

  test("deleteLecture", async () => {
    const component = shallow(<App/>);
    const instance = component.instance();
    expect(instance.state.loggedin).toBe(false);
    API.deleteLecture = jest.fn(() => Promise.resolve());
    instance.setLoggedIn({role: "student", name:"Calogero", idUser: 1});
    expect(instance.state.loggedin).toBe(true);
    instance.getTeacherLectures = jest.fn();
    await instance.deleteLecture(99);
    expect(instance.getTeacherLectures).toHaveBeenCalledTimes(1);
  });

  test("changeToOnline", async () => {
    const component = shallow(<App/>);
    const instance = component.instance();
    expect(instance.state.loggedin).toBe(false);
    API.changeToOnline = jest.fn(() => Promise.resolve());
    instance.setLoggedIn({role: "student", name:"Calogero", idUser: 1});
    expect(instance.state.loggedin).toBe(true);
    instance.getTeacherLectures = jest.fn();
    await instance.changeToOnline(99);
    expect(instance.getTeacherLectures).toHaveBeenCalledTimes(1);
  });

})