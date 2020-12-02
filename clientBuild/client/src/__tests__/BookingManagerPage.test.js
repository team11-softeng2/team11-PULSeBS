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
  await instance.handleBookingFilterChange("Week");
  await instance.handleBookingFilterChange("Lecture");
  expect();
});

test('handleCancellationFilterChangee', async () => {
  const component = shallow(<BookingManagerPage/>);
  const instance = component.instance();
  API.getCancellationsStatisticsByMonth = jest.fn(() => Promise.resolve([]));
  API.getCancellationsStatisticsByWeek = jest.fn(() => Promise.resolve([]));
  API.getCancellationsStatisticsByLesson = jest.fn(() => Promise.resolve([]));
  await instance.handleCancellationFilterChange("Month");
  await instance.handleCancellationFilterChange("Week");
  await instance.handleCancellationFilterChange("Lecture");
  expect();
});