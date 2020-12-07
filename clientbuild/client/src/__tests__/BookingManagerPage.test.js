import TestRenderer from 'react-test-renderer';
import BookingManagerPage from '../BookingManagerPage';
import React from 'react';
import API from '../API';
import { shallow } from 'enzyme';

import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

test('renders learn react link', () => {
    const tree = TestRenderer.create(<BookingManagerPage/>).toJSON();
    expect(tree).toMatchSnapshot();
  });

test('handleBookingFilterChange', async () => {
  const component = shallow(<BookingManagerPage/>);
  const instance = component.instance();
  API.getBookingStatisticsByMonth = jest.fn(() => Promise.resolve([]));
  API.getBookingStatisticsByWeek = jest.fn(() => Promise.resolve([]));
  API.getBookingStatisticsByLesson = jest.fn(() => Promise.resolve([]));
  await instance.handleBookingFilterChange("Month");
  expect(instance.state.currentBookingFilter).toBe(1);
  await instance.handleBookingFilterChange("Week");
  expect(instance.state.currentBookingFilter).toBe(2);
  await instance.handleBookingFilterChange("Lecture");
  expect(instance.state.currentBookingFilter).toBe(3);
});

test('handleCancellationFilterChangee', async () => {
  const component = shallow(<BookingManagerPage/>);
  const instance = component.instance();
  API.getCancellationsStatisticsByMonth = jest.fn(() => Promise.resolve([]));
  API.getCancellationsStatisticsByWeek = jest.fn(() => Promise.resolve([]));
  API.getCancellationsStatisticsByLesson = jest.fn(() => Promise.resolve([]));
  await instance.handleCancellationFilterChange("Month");
  expect(instance.state.currentCancellationFilter).toBe(4);
  await instance.handleCancellationFilterChange("Week");
  expect(instance.state.currentCancellationFilter).toBe(5);
  await instance.handleCancellationFilterChange("Lecture");
  expect(instance.state.currentCancellationFilter).toBe(6);
});

test('handleSelectionChange', async () => {
  const component = shallow(<BookingManagerPage/>);
  const instance = component.instance();
  API.getBookingStatisticsByMonth = jest.fn(() => Promise.resolve([]));
  API.getCancellationsStatisticsByMonth = jest.fn(() => Promise.resolve([]));
  await instance.handleSelectionChange(3);
  expect(API.getBookingStatisticsByMonth).toHaveBeenCalledTimes(1);
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

/*
test('updateCancellationGraphData', async () => {
  const component = shallow(<BookingManagerPage/>);
  const instance = component.instance();
  const xArray = [0, 0.4444444444444444, 0.5];
  const yArray = [0, 0.4444444444444444, 0.5];
  expect(instance.state.cancellationSeries).toBe(undefined);
  await instance.updateCancellationGraphData("test", xArray, yArray);
  expect(instance.state.cancellationSeries).not.toBe(undefined);
});
*/