import TestRenderer from 'react-test-renderer';
import React from 'react';
import ContactTracingPage from '../ContactTracingPage';
import API from '../API';
import { render } from '@testing-library/react';
import { shallow } from 'enzyme';
import { fireEvent } from '@testing-library/react';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import jsPDF from 'jspdf';
import FileSaver from 'file-saver';

configure({ adapter: new Adapter() });

test('renders learn react link', () => {
    const tree = TestRenderer.create(<ContactTracingPage/>).toJSON();
    expect(tree).toMatchSnapshot();
  });

test('student name input box', () => {
  API.getAllStudents = jest.fn(() => Promise.resolve([{name: "test1", idStudent: 1}, {name: "test2", idStudent: 2}, {name: "student3", idStudent: 3}]));
  const {queryByTestId} = render(<ContactTracingPage/>);
  const studentNameInput = queryByTestId("studentName-test");
  fireEvent.change(studentNameInput, {target: {value: "te"}});
  expect(studentNameInput.value).toBe("te");
});

test("studentMatchesInput", () => {
  API.getAllStudents = jest.fn(() => Promise.resolve([{name: "test1", idStudent: 1}, {name: "test2", idStudent: 2}, {name: "student3", idStudent: 3}]));
  const component = shallow(<ContactTracingPage/>);
  const instance = component.instance();
  const res1 = instance.studentMatchesInput({name: "test1"}, "pos");
  expect(res1).toBe(false);
  const res2 = instance.studentMatchesInput({name: "test1"}, "tes");
  expect(res2).toBe(true);
});

test("createStudentTableRow", () => {
  API.getAllStudents = jest.fn(() => Promise.resolve([{name: "test1", idStudent: 1}, {name: "test2", idStudent: 2}, {name: "student3", idStudent: 3}]));
  const component = shallow(<ContactTracingPage/>);
  const instance = component.instance();
  const res = instance.createStudentTableRow({name: "testName", email: "testEmail", idStudent: "testID"});
  expect(res).not.toBe(undefined);
});

test("handleStudentButtonClick", () => {
  API.getStudentContacts = jest.fn(() => Promise.resolve([{name: "test1", idStudent: 1}, {name: "test2", idStudent: 2}, {name: "student3", idStudent: 3}]));
  jsPDF.save = jest.fn();
  const component = shallow(<ContactTracingPage/>);
  const instance = component.instance();
  instance.handleStudentButtonClick({name: "testName", email: "testEmail", idStudent: "testID"});
  expect(API.getStudentContacts).toHaveBeenCalledTimes(1);
});

test("different legth of search result", async () => {
  API.getAllStudents = jest.fn(() => Promise.resolve([{name: "test1", idStudent: 1}, {name: "test2", idStudent: 2}, {name: "student3", idStudent: 3}]));
  const component = await shallow(<ContactTracingPage/>);
  const instance = await component.instance();
  instance.setState({maxStudentsToShow: 1});

  //More than maxStudentsToShow
  await instance.handleOnChangeText({target: {value: "te"}});
  expect(instance.state.filteredStudents.length).toBe(2);
  expect(instance.state.alwaysShowStudents).toBe(false);
  await component.find("#manyButton-test").simulate("click");
  expect(instance.state.alwaysShowStudents).toBe(true);
  await component.find("#restrictButton-test").simulate("click");
  expect(instance.state.alwaysShowStudents).toBe(false);

  //Less than maxStudentsToShow
  instance.setState({maxStudentsToShow: 3});
  await instance.handleOnChangeText({target: {value: "te"}});
  expect(instance.state.filteredStudents.length).toBe(2);
  expect(instance.state.maxStudentsToShow).toBe(3);
});

test("click on generate report button", async () => {
  API.getAllStudents = jest.fn(() => Promise.resolve([{name: "test1", idStudent: 1}, {name: "test2", idStudent: 2}, {name: "student3", idStudent: 3}]));
  API.getStudentContacts = jest.fn(() => Promise.resolve([{name: "test1", role: "student", email: "test1@test.com"}, {name: "test2", role: "student", email: "test2@test.com"}]));
  FileSaver.saveAs = jest.fn();
  jsPDF.save = jest.fn();
  const component = await shallow(<ContactTracingPage/>);
  const instance = await component.instance();
  instance.setState({maxStudentsToShow: 10});
  await instance.handleOnChangeText({target: {value: "te"}});
  instance.handleStudentButtonClick = jest.fn();
  await component.find("#reportButton-test1").simulate("click");
  expect(component.find("#reportButton-test1").text()).toBe("Generate report from this student");
  expect(instance.handleStudentButtonClick).toHaveBeenCalledTimes(1);
});