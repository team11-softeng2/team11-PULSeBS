import TestRenderer from 'react-test-renderer';
import React from 'react';
import SupportOfficerSchedulePage from '../SupportOfficer/SupportOfficerSchedulePage';
import API from '../API';
import { render } from '@testing-library/react';
import { shallow } from 'enzyme';
import { fireEvent } from '@testing-library/react';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

API.getAllCourses = jest.fn(() => Promise.resolve([{courseName: "test", idCourse: 1, teacherName: "Test Test"}]));
test('renders SupportOfficerSchedulePage page', () => {
    const tree = TestRenderer.create(<SupportOfficerSchedulePage/>).toJSON();
    expect(tree).toMatchSnapshot();
  });

test('courseMatchesInputId', async () => {
    const component = await shallow(<SupportOfficerSchedulePage/>);
    const instance = await component.instance();
    let res1 = instance.courseMatchesInputId({idCourse: "test"}, "re");
    expect(res1).toBe(false);
    let res2 = instance.courseMatchesInputId({idCourse: "test"}, "te");
    expect(res2).toBe(true);
});

test('courseMatchesInputName', async () => {
    const component = await shallow(<SupportOfficerSchedulePage/>);
    const instance = await component.instance();
    let res1 = instance.courseMatchesInputName({courseName: "test"}, "re");
    expect(res1).toBe(false);
    let res2 = instance.courseMatchesInputName({courseName: "test"}, "te");
    expect(res2).toBe(true);
});

test('courseMatchesInputTeacher', async () => {
    const component = await shallow(<SupportOfficerSchedulePage/>);
    const instance = await component.instance();
    let res1 = instance.courseMatchesInputTeacher({teacherName: "test"}, "re");
    expect(res1).toBe(false);
    let res2 = instance.courseMatchesInputTeacher({teacherName: "test"}, "te");
    expect(res2).toBe(true);
});
/*
test('handleOnChangeText', async () => {
    const component = await shallow(<SupportOfficerSchedulePage/>);
    const instance = await component.instance();
    await instance.handleOnChangeText({target: {value: "test sample"}});
    expect(instance.state.filteredCourses).toBe(false);
});
*/