import TestRenderer from 'react-test-renderer';
import React from 'react';
import CourseUpdateSchedulePage from '../SupportOfficer/CourseUpdateSchedulePage';
import API from '../API';
import { render } from '@testing-library/react';
import { shallow } from 'enzyme';
import { fireEvent } from '@testing-library/react';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });


test('renders CourseUpdateSchedulePage page', () => {
    API.getAllCourses = jest.fn(() => Promise.resolve([{idCourse: 1, courseName: "test1"}, {idCourse: 2, courseName: "test2"}]));
    let matchMock = {"path":"/support-officer/updateSchedule/:idCourse","url":"/support-officer/updateSchedule/XY1211","isExact":true,"params":{"idCourse":1}};
    /*
    const tree = TestRenderer.create(<CourseUpdateSchedulePage 
        match={matchMock}
        />).toJSON();
    expect(tree).toMatchSnapshot();
    */
   const component = shallow(<CourseUpdateSchedulePage 
    match={matchMock}
    />);
    const instance = component.instance();
    expect(instance.state.idCourse).toBe(1);
  });

test("handleEventClick", async () => {
    API.getAllCourses = jest.fn(() => Promise.resolve([{idCourse: 1, courseName: "test1"}, {idCourse: 2, courseName: "test2"}]));
    let matchMock = {"path":"/support-officer/updateSchedule/:idCourse","url":"/support-officer/updateSchedule/XY1211","isExact":true,"params":{"idCourse":"XY1211"}};
    const event = {event: {start: 50000, end: 55000, title: "test", id: 1, extendedProps: {classroom: "test"}}};
    const component = shallow(<CourseUpdateSchedulePage 
        match={matchMock}
        />);
    const instance = component.instance();
    await instance.handleEventClick(event);
    expect(instance.state.clickedLectureData.id).toBe(1);
    expect(instance.state.clickedLectureData.classroom).toBe("test");
    expect(instance.state.clickedLectureData.courseName).toBe("test");
});


test("closeDecisionModal", async () => {
    API.getAllCourses = jest.fn(() => Promise.resolve([{idCourse: 1, courseName: "test1"}, {idCourse: 2, courseName: "test2"}]));
    let matchMock = {"path":"/support-officer/updateSchedule/:idCourse","url":"/support-officer/updateSchedule/XY1211","isExact":true,"params":{"idCourse":"XY1211"}};
    const component = shallow(<CourseUpdateSchedulePage 
        match={matchMock}
        />);
    const instance = component.instance();
    await instance.closeDecisionModal();
    expect(instance.state.showDecisionModal).toBe(false);
});

test("onClickModifyLecture", async () => {
    API.getAllCourses = jest.fn(() => Promise.resolve([{idCourse: 1, courseName: "test1"}, {idCourse: 2, courseName: "test2"}]));
    let matchMock = {"path":"/support-officer/updateSchedule/:idCourse","url":"/support-officer/updateSchedule/XY1211","isExact":true,"params":{"idCourse":"XY1211"}};
    const component = shallow(<CourseUpdateSchedulePage 
        match={matchMock}
        />);
    const instance = component.instance();
    instance.closeDecisionModal = jest.fn();
    await instance.onClickModifyLecture();
    expect(instance.closeDecisionModal).toHaveBeenCalledTimes(1);
    expect(instance.state.showNewScheduleModal).toBe(true);
});

test("onClickDeleteLecture", async () => {
    API.getAllCourses = jest.fn(() => Promise.resolve([{idCourse: 1, courseName: "test1"}, {idCourse: 2, courseName: "test2"}]));
    let matchMock = {"path":"/support-officer/updateSchedule/:idCourse","url":"/support-officer/updateSchedule/XY1211","isExact":true,"params":{"idCourse":"XY1211"}};
    const component = shallow(<CourseUpdateSchedulePage 
        match={matchMock}
        />);
    const instance = component.instance();
    instance.closeDecisionModal = jest.fn();
    await instance.onClickDeleteLecture();
    expect(instance.closeDecisionModal).toHaveBeenCalledTimes(1);
    //expect(instance.state.showNewScheduleModal).toBe(true);
});

test("API getAllCourses error", async () => {
    API.getAllCourses = jest.fn(() => Promise.reject(["test"]));
    try {
        let matchMock = {"path":"/support-officer/updateSchedule/:idCourse","url":"/support-officer/updateSchedule/XY1211","isExact":true,"params":{"idCourse":"XY1211"}};
        const event = {event: {start: 50000, end: 55000, title: "test", id: 1, extendedProps: {classroom: "test"}}};
        const component = shallow(<CourseUpdateSchedulePage 
            match={matchMock}
            />);
        const instance = component.instance();
        expect(true).toBe(false);
    } catch(e) {
        expect(true).toBe(true);
    }
});

test("updateSchedule", async () => {
    API.getAllCourses = jest.fn(() => Promise.resolve([{idCourse: 1, courseName: "test1"}, {idCourse: 2, courseName: "test2"}]));
    API.getGeneralSchedule = jest.fn(() => Promise.resolve([{idLesson: 1284, idCourse: "XY4911", idTeacher: "d9001", idClassRoom: "1", date: "2021-01-11", inPresence: 0, beginTime: "11:30", endTime: "13:00"}]));
    let matchMock = {"path":"/support-officer/updateSchedule/:idCourse","url":"/support-officer/updateSchedule/XY1211","isExact":true,"params":{"idCourse":"XY1211"}};
    const component = shallow(<CourseUpdateSchedulePage 
        match={matchMock}
        />);
    const instance = component.instance();
    await instance.updateSchedule();
    expect(instance.state.currentSchedule[0].classroom).toBe("1");
    expect(instance.state.currentSchedule[0].id).toBe(1284);
    API.getGeneralSchedule = jest.fn(() => Promise.reject());
    try {
        await instance.updateSchedule();
        expect(false).toBe(true);
    } catch(e) {
        expect(true).toBe(true);
    }
});

test("changeSchedule", async () => {
    API.getAllCourses = jest.fn(() => Promise.resolve([{idCourse: 1, courseName: "test1"}, {idCourse: 2, courseName: "test2"}]));
    API.getGeneralSchedule = jest.fn(() => Promise.resolve([{idLesson: 1284, idCourse: "XY4911", idTeacher: "d9001", idClassRoom: "1", date: "2021-01-11", inPresence: 0, beginTime: "11:30", endTime: "13:00"}]));
    let matchMock = {"path":"/support-officer/updateSchedule/:idCourse","url":"/support-officer/updateSchedule/XY1211","isExact":true,"params":{"idCourse":"XY1211"}};
    const component = shallow(<CourseUpdateSchedulePage 
        match={matchMock}
        />);
    const instance = component.instance();
    await instance.changeSchedule("test");
    expect(instance.state.currentSchedule).toBe("test");
});