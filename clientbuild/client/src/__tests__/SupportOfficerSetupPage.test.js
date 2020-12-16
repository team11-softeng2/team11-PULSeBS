import TestRenderer from 'react-test-renderer';
import React from 'react';
import SupportOfficerSetupPage from '../SupportOfficer/SupportOfficerSetupPage';
import API from '../API';
import { render } from '@testing-library/react';
import { shallow } from 'enzyme';
import { fireEvent } from '@testing-library/react';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Papa from 'papaparse';

configure({ adapter: new Adapter() });

test('renders SupportOfficerPage page', () => {
    const tree = TestRenderer.create(<SupportOfficerSetupPage/>).toJSON();
    expect(tree).toMatchSnapshot();
  });

test("handleNext", async () => {
    const component = await shallow(<SupportOfficerSetupPage/>);
    const instance = await component.instance();
    instance.handleFinish = jest.fn();
    expect(instance.state.activeStep).toBe(0);
    await instance.handleNext();
    expect(instance.state.activeStep).toBe(1);
    await instance.handleNext();
    await instance.handleNext();
    await instance.handleNext();
    await instance.handleNext();
    await instance.handleNext();
    expect(instance.state.activeStep).toBe(6);
    expect(instance.handleFinish).toHaveBeenCalledTimes(1);
});

test("handleBack and handleReset", async () => {
    const component = await shallow(<SupportOfficerSetupPage/>);
    const instance = await component.instance();
    expect(instance.state.activeStep).toBe(0);
    await instance.handleNext();
    expect(instance.state.activeStep).toBe(1);
    await instance.handleBack();
    expect(instance.state.activeStep).toBe(0);
    await instance.handleNext();
    await instance.handleNext();
    expect(instance.state.activeStep).toBe(2);
    await instance.handleReset();
    expect(instance.state.activeStep).toBe(0);
});

test("getStepContent", async () => {
    const component = await shallow(<SupportOfficerSetupPage/>);
    const instance = await component.instance();
    let res = instance.getStepContent(0);
    expect(res).toBe(`upload the students csv file.`);
    res = instance.getStepContent(1);
    expect(res).toBe(`upload the professors csv file.`);
    res = instance.getStepContent(2);
    expect(res).toBe(`upload the courses csv file.`);
    res = instance.getStepContent(3);
    expect(res).toBe(`upload the schedule csv file.`);
    res = instance.getStepContent(4);
    expect(res).toBe(`upload the enrollment csv file.`);
    res = instance.getStepContent(5);
    expect(res).toBe(`check the files and submit.`);
    res = instance.getStepContent(6);
    expect(res.props.children).toBe("Unknown stepIndex");
});

test("onFileAdded", async () => {
    const component = await shallow(<SupportOfficerSetupPage/>);
    const instance = await component.instance();
    await instance.onFileAdded({name: "testFile"});
    expect(instance.state.files[0].name).toBe("testFile");
    expect(instance.state.files.length).toBe(1);
    await instance.handleNext();
    await instance.onFileAdded({name: "testFile"});
    expect(instance.state.files[0].name).toBe("testFile");
    expect(instance.state.files.length).toBe(1);
    await instance.onFileAdded({name: "testFile2"});
    expect(instance.state.files.length).toBe(2);
});

test("csvDataToJSON", async () => {
    const component = await shallow(<SupportOfficerSetupPage/>);
    const instance = await component.instance();
    const csvTest = [["field1", "field2"], ["data11", "data12"], ["data21", "data22"]];
    const expectedRes = [{field1: "data11", field2: "data12"}, {field1: "data21", field2: "data22"}];
    const res = await instance.csvDataToJSON(csvTest);
    expect(res).toStrictEqual(expectedRes);
});

test("handleFinish", async () => {
    const component = await shallow(<SupportOfficerSetupPage/>);
    const instance = await component.instance();
    instance.convertAndSendClasses = jest.fn();
    instance.convertAndSendStudents = jest.fn();
    instance.convertAndSendTeachers = jest.fn();
    instance.convertAndSendLectures = jest.fn();
    instance.convertAndSendCourses = jest.fn();
    await instance.handleFinish();
    expect(instance.convertAndSendClasses).toHaveBeenCalledTimes(1);
    expect(instance.convertAndSendStudents).toHaveBeenCalledTimes(1);
    expect(instance.convertAndSendTeachers).toHaveBeenCalledTimes(1);
    expect(instance.convertAndSendCourses).toHaveBeenCalledTimes(1);
    expect(instance.convertAndSendLectures).toHaveBeenCalledTimes(1);
    expect(instance.state.showResultModal).toBe(true);
    expect(instance.state.setupResult).toBe(true);
});

test("handleFinish error", async () => {
    const component = await shallow(<SupportOfficerSetupPage/>);
    const instance = await component.instance();
    //API.setUpProfessors = jest.fn(() => Promise.reject([]));
    instance.convertAndSendClasses = jest.fn(() => Promise.reject([]));
    instance.convertAndSendStudents = jest.fn();
    instance.convertAndSendTeachers = jest.fn();
    instance.convertAndSendLectures = jest.fn();
    instance.convertAndSendCourses = jest.fn();
    await instance.handleFinish();
    expect(instance.state.showResultModal).toBe(true);
    expect(instance.state.setupResult).toBe(false);
    expect(instance.convertAndSendStudents).toHaveBeenCalledTimes(1);
    expect(instance.convertAndSendTeachers).toHaveBeenCalledTimes(1);
    expect(instance.convertAndSendCourses).toHaveBeenCalledTimes(1);
    expect(instance.convertAndSendLectures).toHaveBeenCalledTimes(1);
});

test("convertAndSendTeachers", async () => {
    const component = await shallow(<SupportOfficerSetupPage/>);
    const instance = await component.instance();
    API.setUpProfessors = jest.fn(() => Promise.resolve([]));
    const blob=new Blob(['fieldA,fieldB,fieldC'],{type:'text/csv'});
    Object.assign(blob,{name:'dummy.txt'});
    Object.assign(blob,{lastModifiedDate :new Date()});
    const file = new File([blob], 'dummy.txt', { type: 'text/csv' });
    const res = await instance.convertAndSendTeachers(file);
    API.setUpProfessors = jest.fn(() => Promise.reject([]));
    try {
        const res2 = await instance.convertAndSendTeachers(file);
        expect(true).toBe(false);
    } catch(e) {
        expect(true).toBe(true);
    }
});

test("convertAndSendCourses", async () => {
    const component = await shallow(<SupportOfficerSetupPage/>);
    const instance = await component.instance();
    API.setUpCourses = jest.fn(() => Promise.resolve([]));
    const blob=new Blob(['fieldA,fieldB,fieldC'],{type:'text/csv'})
    Object.assign(blob,{name:'dummy.txt'})
    Object.assign(blob,{lastModifiedDate :new Date()})
    const file = new File([blob], 'dummy.txt', { type: 'text/csv' })
    const res = await instance.convertAndSendCourses(file);
    API.setUpCourses = jest.fn(() => Promise.reject([]));
    try {
        const res2 = await instance.convertAndSendCourses(file);
        expect(true).toBe(false);
    } catch(e) {
        expect(true).toBe(true);
    }
});

test("convertAndSendLectures", async () => {
    const component = await shallow(<SupportOfficerSetupPage/>);
    const instance = await component.instance();
    API.setUpLectures = jest.fn(() => Promise.resolve([]));
    const blob=new Blob(['fieldA,fieldB,fieldC'],{type:'text/csv'});
    Object.assign(blob,{name:'dummy.txt'});
    Object.assign(blob,{lastModifiedDate :new Date()});
    const file = new File([blob], 'dummy.txt', { type: 'text/csv' });
    const res = await instance.convertAndSendLectures(file);
    API.setUpLectures = jest.fn(() => Promise.reject([]));
    try {
        const res2 = await instance.convertAndSendLectures(file);
        expect(true).toBe(false);
    } catch(e) {
        expect(true).toBe(true);
    }
});

test("convertAndSendStudents", async () => {
    const component = await shallow(<SupportOfficerSetupPage/>);
    const instance = await component.instance();
    API.setUpStudents = jest.fn(() => Promise.resolve([]));
    const blob=new Blob(['fieldA,fieldB,fieldC'],{type:'text/csv'});
    Object.assign(blob,{name:'dummy.txt'});
    Object.assign(blob,{lastModifiedDate :new Date()});
    const file = new File([blob], 'dummy.txt', { type: 'text/csv' });
    const res = await instance.convertAndSendStudents(file);
    API.setUpStudents = jest.fn(() => Promise.reject([]));
    try {
        const res2 = await instance.convertAndSendStudents(file);
        expect(true).toBe(false);
    } catch(e) {
        expect(true).toBe(true);
    }
});

test("convertAndSendClasses", async () => {
    const component = await shallow(<SupportOfficerSetupPage/>);
    const instance = await component.instance();
    API.setUpClasses = jest.fn(() => Promise.resolve([]));
    const blob=new Blob(['fieldA,fieldB,fieldC'],{type:'text/csv'});
    Object.assign(blob,{name:'dummy.txt'});
    Object.assign(blob,{lastModifiedDate :new Date()});
    const file = new File([blob], 'dummy.txt', { type: 'text/csv' });
    const res = await instance.convertAndSendClasses(file);
    API.setUpClasses = jest.fn(() => Promise.reject([]));
    try {
        const res2 = await instance.convertAndSendClasses(file);
        expect(true).toBe(false);
    } catch(e) {
        expect(true).toBe(true);
    }
});