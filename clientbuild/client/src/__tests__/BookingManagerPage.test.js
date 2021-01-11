import TestRenderer from 'react-test-renderer';
import BookingManagerPage from '../BookingManagerPage';
import React from 'react';
import API from '../API';
import { shallow } from 'enzyme';
import { render, fireEvent } from '@testing-library/react';

import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

test('renders learn react link', () => {
    const tree = TestRenderer.create(<BookingManagerPage/>).toJSON();
    expect(tree).toMatchSnapshot();
  });

test('handleBookingFilterChange', async () => {
  API.getAllCourses = jest.fn(() => Promise.resolve([]));
  const component = shallow(<BookingManagerPage/>);
  const instance = component.instance();
  API.getBookingStatisticsByMonth = jest.fn(() => Promise.resolve([{average: 10, monthOfYear: 10, year: 10}, {average: 20, monthOfYear: 20, year: 20}]));
  API.getBookingStatisticsByWeek = jest.fn(() => Promise.resolve([{average: 10, weekOfYear: 10, year: 10}, {average: 20, weekOfYear: 20, year: 20}]));
  API.getBookingStatisticsByLesson = jest.fn(() => Promise.resolve([{numberBookings: 10, dateLecture: 10}, {numberBookings: 20, dateLecture: 20}]));
  await instance.handleBookingFilterChange("Month");
  expect(instance.state.currentBookingFilter).toBe(1);
  await instance.handleBookingFilterChange("Week");
  expect(instance.state.currentBookingFilter).toBe(2);
  await instance.handleBookingFilterChange("Lecture");
  expect(instance.state.currentBookingFilter).toBe(3);
});

test('handleCancellationFilterChangee', async () => {
  API.getAllCourses = jest.fn(() => Promise.resolve([]));
  const component = shallow(<BookingManagerPage/>);
  const instance = component.instance();
  API.getCancellationsStatisticsByMonth = jest.fn(() => Promise.resolve([{average: 10, monthOfYear: 10, year: 10}, {average: 20, monthOfYear: 20, year: 20}]));
  API.getCancellationsStatisticsByWeek = jest.fn(() => Promise.resolve([{average: 10, weekOfYear: 10, year: 10}, {average: 20, weekOfYear: 20, year: 20}]));
  API.getCancellationsStatisticsByLesson = jest.fn(() => Promise.resolve([{numberBookings: 10, dateLecture: 10}, {numberBookings: 20, dateLecture: 20}]));
  await instance.handleCancellationFilterChange("Month");
  expect(instance.state.currentCancellationFilter).toBe(4);
  await instance.handleCancellationFilterChange("Week");
  expect(instance.state.currentCancellationFilter).toBe(5);
  await instance.handleCancellationFilterChange("Lecture");
  expect(instance.state.currentCancellationFilter).toBe(6);
});

test('handleSelectionChange', async () => {
  API.getAllCourses = jest.fn(() => Promise.resolve([]));
  const component = shallow(<BookingManagerPage/>);
  const instance = component.instance();
  API.getBookingStatisticsByMonth = jest.fn(() => Promise.resolve([{average: 10, monthOfYear: 10, year: 10}, {average: 20, monthOfYear: 20, year: 20}]));
  API.getCancellationsStatisticsByMonth = jest.fn(() => Promise.resolve([{average: 10, monthOfYear: 10, year: 10}, {average: 20, monthOfYear: 20, year: 20}]));
  await instance.handleSelectionChange(3);
  expect(API.getBookingStatisticsByMonth).toHaveBeenCalledTimes(2);
  expect(API.getCancellationsStatisticsByMonth).toHaveBeenCalledTimes(1);
});

test('updateBookingGraphData', async () => {
  const component = shallow(<BookingManagerPage/>);
  const instance = component.instance();
  const xArray = [0, 0.4444444444444444, 0.5];
  const yArray = [0, 0.4444444444444444, 0.5];
  expect(instance.state.bookingSeries).toBe(undefined);
  await instance.updateBookingGraphData("test", xArray, yArray, "test");
  expect(instance.state.bookingSeries).not.toBe(undefined);
});