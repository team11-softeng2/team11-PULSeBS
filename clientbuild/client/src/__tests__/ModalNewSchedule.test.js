import React from 'react';
import TestRenderer from 'react-test-renderer';
import { render, fireEvent } from '@testing-library/react';
import ModalNewSchedule from '../SupportOfficer/ModalNewSchedule';
import { shallow } from 'enzyme';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import API from '../API';

configure({ adapter: new Adapter() });
API.getAllClassrooms = jest.fn(() => Promise.resolve([{idClassroom: 1, roomNumber: 100}]));

describe("Modal render", () => {
    test("Render with show true", () => {
        const {queryByTestId} = render(<ModalNewSchedule 
            show={true} 
            subject = {"test"}
            hide = {jest.fn()}
            />);
        expect(queryByTestId("modal-test")).toBeTruthy();
    });

    test("Render with show false", () => {
        const {queryByTestId} = render(<ModalNewSchedule 
            show={false} 
            subject = {"test"}
            hide = {jest.fn()}
            />);
        expect(queryByTestId("modal-test")).toBe(null);
    });
});

test("handleChangeEndTime", async () => {
    const component = shallow(<ModalNewSchedule 
        show={true} 
        subject = {"test"}
        hide = {jest.fn()}
        />);
    const instance = component.instance();
    await instance.handleChangeEndTime(51400);
    expect(instance.state.endTime).toBe(51400);
});

test("handleChangeBeginTime", async () => {
    const component = shallow(<ModalNewSchedule 
        show={true} 
        subject = {"test"}
        hide = {jest.fn()}
        />);
    const instance = component.instance();
    await instance.handleChangeBeginTime(50400);
    expect(instance.state.beginTime).toBe(50400);
});

test("handleOnClickDropdown", async () => {
    const component = shallow(<ModalNewSchedule 
        show={true} 
        subject = {"test"}
        hide = {jest.fn()}
        />);
    const instance = component.instance();
    await instance.handleOnClickDropdown({target: {innerText: "test"}});
    expect(instance.state.selectedDay).toBe("test");
});

test("getAvailableStartTime", () => {
    const component = shallow(<ModalNewSchedule 
        show={true} 
        subject = {"test"}
        hide = {jest.fn()}
        />);
    const instance = component.instance();
    instance.setState({beginTime: undefined});
    let res = instance.getAvailableStartTime();
    expect(res).toBe("08:30");
    instance.setState({beginTime: 32400});
    res = instance.getAvailableStartTime();
    expect(res).toBe("09:30");
});

test("handleOnClickDropdownClass", async () => {
    const component = shallow(<ModalNewSchedule 
        show={true} 
        subject = {"test"}
        hide = {jest.fn()}
        />);
    const instance = component.instance();
    await instance.handleOnClickDropdownClass({target: {innerText: 1}});
    expect(instance.state.selectedClassroom).toBe(1);
});

test("requiredDataIsInserted", () => {
    const component = shallow(<ModalNewSchedule 
        show={true} 
        subject = {"test"}
        hide = {jest.fn()}
        />);
    const instance = component.instance();
    instance.setState({selectedDay: undefined});
    instance.setState({selectedClassroom: undefined});
    let res = instance.requiredDataIsInserted();
    expect(res).toBe(false);
    instance.setState({selectedDay: 1});
    instance.setState({selectedClassroom: 1});
    res = instance.requiredDataIsInserted();
    expect(res).toBe(true);
    instance.setState({selectedDay: undefined});
    instance.setState({selectedClassroom: 1});
    res = instance.requiredDataIsInserted();
    expect(res).toBe(false);
    instance.setState({selectedDay: 1});
    instance.setState({selectedClassroom: undefined});
    res = instance.requiredDataIsInserted();
    expect(res).toBe(false);
});

let hideMock = jest.fn();
test("clearAndClose", async () => {
    const component = shallow(<ModalNewSchedule 
        show={true} 
        subject = {"test"}
        hide = {hideMock}
        />);
    const instance = component.instance();
    await instance.clearAndClose();
    expect(hideMock).toHaveBeenCalledTimes(1);
    expect(instance.state.selectedDay).toBe(undefined);
    expect(instance.state.beginTime).toBe(28800);
    expect(instance.state.endTime).toBe('08:30');
    expect(instance.state.selectedClassroom).toBe(undefined);
});

test("handleSubmit", async () => {
    const component = shallow(<ModalNewSchedule 
        show={true} 
        subject = {"test"}
        hide = {jest.fn()}
        />);
    const instance = component.instance();
    instance.clearAndClose = jest.fn();
    await instance.handleSubmit();
    expect(instance.clearAndClose).toHaveBeenCalledTimes(1);
});

test("onHide", () => {
    const {queryAllByRole} = render(<ModalNewSchedule 
        show={true} 
        subject = {"test"}
        hide = {jest.fn()}
        />);
    const buttons = queryAllByRole("button");
    fireEvent.click(buttons[0]);
    expect();
});


test("dropDown on click", async () => {
    const component = shallow(<ModalNewSchedule 
        show={true} 
        subject = {"test"}
        hide = {jest.fn()}
        />);
    const instance = component.instance();
    instance.setState({allClassrooms: [{idClassroom: 1}, {idClassroom: 2}]});
    let itemClass = component.find("#dropAllClass1");
    let itemDays = component.find("#dropDaysMonday");
    instance.handleOnClickDropdownClass = jest.fn();
    instance.handleOnClickDropdown = jest.fn();
    itemClass.simulate("click")
    itemDays.simulate("click")
    expect(instance.handleOnClickDropdownClass).toHaveBeenCalledTimes(1);
    expect(instance.handleOnClickDropdown).toHaveBeenCalledTimes(1);
});