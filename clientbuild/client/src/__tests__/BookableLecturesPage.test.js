import React from 'react';
import TestRenderer from 'react-test-renderer';
import API from '../API';
import BookableLecturesPage from '../SupportOfficer/BookableLecturesPage';
import { shallow } from 'enzyme';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

test('renders BookableLecturesPage', () => {
    const tree = TestRenderer.create(<BookableLecturesPage/>).toJSON();
    expect(tree).toMatchSnapshot();
  });

test("onChangeValue", async () => {
  const component = shallow(<BookableLecturesPage/>);
  const instance = component.instance();
  const eventMock = {target: {value: "test"}};
  await instance.onChangeValue(eventMock);
  expect(instance.state.year).toBe("test");
});

test("buttonClickOnline", async () => {
    const component = shallow(<BookableLecturesPage/>);
    const instance = component.instance();
    API.changeToOnlineByYear = jest.fn(() => Promise.resolve([]));
    await instance.buttonClickOnline();
    expect(API.changeToOnlineByYear).toHaveBeenCalledTimes(1);
    expect(instance.state.success).toBe(true);
    API.changeToOnlineByYear = jest.fn(() => Promise.reject([]));
    try {
      await instance.buttonClickOnline();
      expect(true).toBe(false);
    } catch(e) {
        expect(true).toBe(true);
    }
});

test("buttonClickPresence", async () => {
  const component = shallow(<BookableLecturesPage/>);
  const instance = component.instance();
  API.changeToPresenceByYear = jest.fn(() => Promise.resolve([]));
  await instance.buttonClickPresence();
  expect(API.changeToOnlineByYear).toHaveBeenCalledTimes(1);
  expect(instance.state.success).toBe(true);
  API.changeToPresenceByYear = jest.fn(() => Promise.reject([]));
  try {
    await instance.buttonClickPresence();
    expect(true).toBe(false);
  } catch(e) {
      expect(true).toBe(true);
  }
});