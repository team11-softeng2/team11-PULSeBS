import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Calendar from '../Calendar';
import API from '../API';
import { shallow } from 'enzyme';

import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

test("Calendar render", () => {
    const testRender = render(<Calendar/>);
    expect(testRender).not.toBe(undefined);
});

test("closeModal function", async () => {
    const component = shallow(<Calendar/>);
    const instance = component.instance();
    await instance.setState({showModal: true});
    expect(instance.state.showModal).toBe(true);
    await instance.closeModal();
    expect(instance.state.showModal).toBe(false);
});

test("handleEventClick teacher", async () => {
    const component = shallow(<Calendar view={"teacher"}/>);
    const instance = component.instance();
    API.getBooking = jest.fn(() => Promise.resolve(["test"]));
    let info = {
        event: {
            id: 1,
            title: "Test",
            start: new Date("2020-10-10T10:00:00"),
            end: new Date("2020-10-10T12:00:00"),
            backgroundColor: "green",
            extendedProps: {
                type: "bookings",
            },
        }
    }
    await instance.handleEventClick(info);
    expect(instance.state.showModal).toBe(true);
})

test("handleEventClick student", async () => {
    const component = shallow(<Calendar view={"student"} events={[]}/>);
    const instance = component.instance();
    let info = {
        event: {
            id: 1,
            title: "Test",
            start: new Date("2020-10-10T10:00:00"),
            end: new Date("2020-10-10T12:00:00"),
            backgroundColor: "",
            extendedProps: {
                type: "bookableLecture",
            },
        }
    }
    await instance.handleEventClick(info);
    expect(instance.state.showModal).toBe(true);
});

test("fullLecture click", async () => {
    const component = shallow(<Calendar view={"student"}/>);
    const instance = component.instance();
    let info = {
        event: {
            id: 1,
            title: "Test",
            start: new Date("2020-10-10T10:00:00"),
            end: new Date("2020-10-10T12:00:00"),
            backgroundColor: "#dc3546",
            extendedProps: {
                type: "fullLecture",
            },
        }
    }
    await instance.handleEventClick(info);
    expect(instance.state.showModal).toBe(true);
});

let updateAttendanceMock = jest.fn();
test("updateAttendace", async () => {
    const component = shallow(<Calendar view={"teacher"} updateAttendance={updateAttendanceMock}/>);
    const instance = component.instance();
    await instance.setState({studentList: [{idBooking: 1, isPresent: 0}]});
    await instance.updateAttendance(1);
    expect(instance.state.studentList[0].isPresent).toBe(1);
    await instance.setState({studentList: [{idBooking: 1, isPresent: 1}]});
    await instance.updateAttendance(1);
    expect(instance.state.studentList[0].isPresent).toBe(0);
});