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

API.getAllCourses = jest.fn(() => Promise.resolve(["test"]));
test('renders CourseUpdateSchedulePage page', () => {
    let matchMock = {"path":"/support-officer/updateSchedule/:idCourse","url":"/support-officer/updateSchedule/XY1211","isExact":true,"params":{"idCourse":"XY1211"}};
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
    expect(instance.state.idCourse).toBe("XY1211");
  });

test("handleEventClick", async () => {
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
    let matchMock = {"path":"/support-officer/updateSchedule/:idCourse","url":"/support-officer/updateSchedule/XY1211","isExact":true,"params":{"idCourse":"XY1211"}};
    const component = shallow(<CourseUpdateSchedulePage 
        match={matchMock}
        />);
    const instance = component.instance();
    await instance.closeDecisionModal();
    expect(instance.state.showDecisionModal).toBe(false);
});

test("onClickModifyLecture", async () => {
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