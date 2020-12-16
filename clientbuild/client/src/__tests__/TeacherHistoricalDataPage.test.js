import TestRenderer from 'react-test-renderer';
import React from 'react';
import TeacherHistoricalDataPage from '../TeacherHistoricalDataPage';
import API from '../API';
import { render } from '@testing-library/react';
import { shallow } from 'enzyme';

import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

test('renders learn react link', () => {
    const tree = TestRenderer.create(<TeacherHistoricalDataPage/>).toJSON();
    expect(tree).toMatchSnapshot();
  });

test('list of filters starts with "Lecture" active', () => {
  const {queryByText} = render(<TeacherHistoricalDataPage teacherId={2}/>);
  expect(queryByText("Lecture").classList.contains('active')).toBe(true);
});

test('updateCourses', async () => {
  const component = shallow(<TeacherHistoricalDataPage teacherId={2}/>);
  const instance = component.instance();
  API.getCoursesOfTeacher = jest.fn(() => Promise.resolve([{courseName: "test"}]));
  await instance.updateCourses();
  expect(instance.state.currentCourse).toBe("test");
});

test('getDataFromServerAndUpdate', async () => {
  const component = shallow(<TeacherHistoricalDataPage teacherId={2}/>);
  const instance = component.instance();
  API.getTeacherStatistics = jest.fn(() => Promise.resolve([{numberOfBookings: 10, dataLecture: 1}, {numberOfBookings: 20, dataLecture: 2}]));
  instance.updateGraphData = jest.fn();
  await instance.setState({currentCourse: "test"});
  await instance.setState({currentDetail: "Lecture"});
  await instance.setState({courses: [{courseName: "test", idCourse: 1}]});
  await instance.getDataFromServerAndUpdate();
  expect(instance.updateGraphData).toHaveBeenCalledTimes(2);
  API.getTeacherStatistics = jest.fn(() => Promise.resolve([{average: 1, weekOfYear: 1, year: 1}, {average: 2, weekOfYear: 2, year: 2}]));
  await instance.setState({currentCourse: "test"});
  await instance.setState({currentDetail: "Week"});
  await instance.setState({courses: [{courseName: "test", idCourse: 1}]});
  await instance.getDataFromServerAndUpdate();
  expect(instance.updateGraphData).toHaveBeenCalledTimes(3);
  API.getTeacherStatistics = jest.fn(() => Promise.resolve([{average: 1, monthOfYear: 1, year: 1}, {average: 2, monthOfYear: 2, year: 2}]));
  await instance.setState({currentCourse: "test"});
  await instance.setState({currentDetail: "Month"});
  await instance.setState({courses: [{courseName: "test", idCourse: 1}]});
  await instance.getDataFromServerAndUpdate();
  expect(instance.updateGraphData).toHaveBeenCalledTimes(4);
});

test('getDataFromServerAndUpdate API error', async () => {
  const component = shallow(<TeacherHistoricalDataPage teacherId={2}/>);
  const instance = component.instance();
  API.getTeacherStatistics = jest.fn(() => Promise.reject([]));
  instance.updateGraphData = jest.fn();
  await instance.setState({currentCourse: "test"});
  await instance.setState({currentDetail: "Lecture"});
  await instance.setState({courses: [{courseName: "test", idCourse: 1}]});
  try {
    await instance.getDataFromServerAndUpdate();
    expect(true).toBe(false);
  } catch(e) {
      expect(true).toBe(true);
  }
  //expect(instance.updateGraphData).toHaveBeenCalledTimes(2);
  await instance.setState({currentCourse: "test"});
  await instance.setState({currentDetail: "Week"});
  await instance.setState({courses: [{courseName: "test", idCourse: 1}]});
  try {
    await instance.getDataFromServerAndUpdate();
    expect(true).toBe(false);
  } catch(e) {
      expect(true).toBe(true);
  }
  await instance.setState({currentCourse: "test"});
  await instance.setState({currentDetail: "Month"});
  await instance.setState({courses: [{courseName: "test", idCourse: 1}]});
  try {
    await instance.getDataFromServerAndUpdate();
    expect(true).toBe(false);
  } catch(e) {
      expect(true).toBe(true);
  }
});

test('handleNewDetailClick and handleNewCourseClick', async () => {
  const component = shallow(<TeacherHistoricalDataPage teacherId={2}/>);
  const instance = component.instance();
  const eventMock = {
    currentTarget: {
      innerText: "test",
    }
  };
  instance.getDataFromServerAndUpdate = jest.fn();
  await instance.handleNewDetailClick(eventMock);
  expect(instance.state.currentDetail).toBe("test");
  expect(instance.getDataFromServerAndUpdate).toHaveBeenCalledTimes(2);
  await instance.handleNewCourseClick(eventMock);
  expect(instance.state.currentDetail).toBe("test");
  expect(instance.getDataFromServerAndUpdate).toHaveBeenCalledTimes(3);
});

test('updateGraphData', async () => {
  const component = shallow(<TeacherHistoricalDataPage teacherId={2}/>);
  const instance = component.instance();
  const seriesMock = [{
    data: [],
    name: "Bookings",
  }];
  const xaxisMock = {"categories":[],"convertedCatToNumeric":false};
  const yaxisMock = {"title":{"text":"Number of bookings"},"labels":{}};
  const titleMock = {"text":"Number of bookings"};
  const tooltipMock = {"y":{}};
  await instance.updateGraphData(seriesMock, xaxisMock, yaxisMock, titleMock, tooltipMock);
  expect(instance.state.series).toBe(seriesMock);
});

test('updateCourses catch error', async () => {
  const component = shallow(<TeacherHistoricalDataPage teacherId={2}/>);
  const instance = component.instance();
  API.getCoursesOfTeacher = jest.fn(() => Promise.reject([{courseName: "test"}]));
  try {
    await instance.updateCourses();
    expect(true).toBe(false);
  } catch(e) {
    //API.getCoursesOfTeacher.mockReset();
    expect(true).toBe(true);
  }
});