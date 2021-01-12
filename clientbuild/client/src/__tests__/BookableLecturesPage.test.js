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

test("buttonClick", async () => {
    const component = shallow(<BookableLecturesPage/>);
    const instance = component.instance();
    API.changeToOnlineByYear = jest.fn(() => Promise.resolve([]));
    await instance.buttonClick();
    expect(API.changeToOnlineByYear).toHaveBeenCalledTimes(1);
});