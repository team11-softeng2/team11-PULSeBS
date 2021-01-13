import React from 'react';
import TestRenderer from 'react-test-renderer';
import { render, fireEvent } from '@testing-library/react';
import ModalTeacher from '../ModalTeacher';
import { shallow } from 'enzyme';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

describe("Modal render", () => {
    test("Render with show true", () => {
        const {queryByTestId} = render(<ModalTeacher 
            show={true} 
            lectureTitle = {"test"}
            lectureDate = {"2020-10-10"}
            lectureBeginTime = {"10:00:00"}
            lectureEndTime = {"12:00:00"}
            lectureColor = {""}
            elementId = {1}
            studentList = {[]}
            dateStart = {new Date("2021-05-05T10:00:00")}/>);
        expect(queryByTestId("modal-test")).toBeTruthy();
    });

    test("Render with show false", () => {
        const {queryByTestId} = render(<ModalTeacher 
            show={false} 
            lectureTitle = {"test"}
            lectureDate = {"2020-10-10"}
            lectureBeginTime = {"10:00:00"}
            lectureEndTime = {"12:00:00"}
            lectureColor = {""}
            elementId = {1}
            studentList = {[]}
            dateStart = {new Date("2021-05-05T10:00:00")}/>);
        expect(queryByTestId("modal-test")).toBe(null);
    });
});


test("Modal content render", () => {
    const {queryByText} = render(<ModalTeacher 
        show={true} 
        lectureTitle = {"test"}
        lectureDate = {"2020-10-10"}
        lectureBeginTime = {"10:00:00"}
        lectureEndTime = {"12:00:00"}
        lectureColor = {""}
        elementId = {1}
        studentList = {[]}
        dateStart = {new Date("2021-05-05T10:00:00")}/>);
    const title = queryByText("Lecture information");
    const onlineLectureButton = queryByText("Change to online");
    const deleteLectureButton = queryByText("Delete lecture");
    expect(title).toBeInTheDocument();
    expect(onlineLectureButton).toBeInTheDocument();
    expect(deleteLectureButton).toBeInTheDocument();
});

test("Modal content render", () => {
    const {queryByText} = render(<ModalTeacher 
        show={true} 
        lectureTitle = {"test"}
        lectureDate = {"2020-10-10"}
        lectureBeginTime = {"10:00:00"}
        lectureEndTime = {"12:00:00"}
        lectureColor = {"green"}
        elementId = {1}
        studentList = {[]}
        dateStart = {new Date("2021-05-05T10:00:00")}/>);
    const title = queryByText("Lecture information");
    const onlineLectureButton = queryByText("Change to online");
    const deleteLectureButton = queryByText("Delete lecture");
    expect(title).toBeInTheDocument();
    expect(onlineLectureButton).not.toBeInTheDocument();
    expect(deleteLectureButton).toBeInTheDocument();
});

test("Render student list", () => {
    const {queryByTestId} = render(<ModalTeacher 
        show={true} 
        lectureTitle = {"test"}
        lectureDate = {"2020-10-10"}
        lectureBeginTime = {"10:00:00"}
        lectureEndTime = {"12:00:00"}
        lectureColor = {""}
        elementId = {1}
        studentList = {[{idUser:1, name: "Test1", isPresent: 0}, {idUser:2, name: "Test2", isPresent: 1}]}
        closeModal = {closeModalMock}
        dateStart = {new Date("2021-05-05T10:00:00")}
        />);
        const studentList = queryByTestId("studentList");
        expect(studentList).toBeInTheDocument();
        fireEvent.click(studentList);
        expect();
});

const closeModalMock = jest.fn();

test("Modal close button", () => {
    const {queryByTestId} = render(<ModalTeacher 
        show={true} 
        lectureTitle = {"test"}
        lectureDate = {"2020-10-10"}
        lectureBeginTime = {"10:00:00"}
        lectureEndTime = {"12:00:00"}
        lectureColor = {""}
        elementId = {1}
        studentList = {[]}
        closeModal = {closeModalMock}
        dateStart = {new Date("2021-05-05T10:00:00")}
        />);
    const closeButton = queryByTestId("close-button");
    fireEvent.click(closeButton);
    expect();
});

test("onHide", () => {
    const {queryAllByRole} = render(<ModalTeacher 
        show={true} 
        lectureTitle = {"test"}
        lectureDate = {"2020-10-10"}
        lectureBeginTime = {"10:00:00"}
        lectureEndTime = {"12:00:00"}
        lectureColor = {""}
        elementId = {1}
        studentList = {[]}
        closeModal = {closeModalMock}
        dateStart = {new Date("2021-05-05T10:00:00")}
        />);
    const buttons = queryAllByRole("button");
    fireEvent.click(buttons[0]);
    expect();
});

const deleteLectureMock = jest.fn();
const changeToOnlineMock = jest.fn();

test("Modal delete and changeToOnline buttons", () => {
    const {queryByTestId} = render(<ModalTeacher 
        show={true} 
        lectureTitle = {"test"}
        lectureDate = {"2020-10-10"}
        lectureBeginTime = {"10:00:00"}
        lectureEndTime = {"12:00:00"}
        elementId = {1}
        studentList = {[]}
        lectureColor = {""}
        closeModal = {closeModalMock}
        deleteLecture = {deleteLectureMock}
        changeToOnline = {changeToOnlineMock}
        dateStart = {new Date("2021-05-05T10:00:00")}
        />);
    const deleteButton = queryByTestId("delete-button");
    const changeButton = queryByTestId("change-button");
    fireEvent.click(deleteButton);
    fireEvent.click(changeButton);
    expect(deleteLectureMock).toHaveBeenCalledTimes(1);
    expect(changeToOnlineMock).toHaveBeenCalledTimes(1);
});

test("Modal delete and changeTo button disabled", () => {
    const {queryByTestId} = render(<ModalTeacher 
        show={true} 
        lectureTitle = {"test"}
        lectureDate = {"2021-10-10"}
        lectureBeginTime = {"10:00:00"}
        lectureEndTime = {"12:00:00"}
        elementId = {1}
        lectureColor = {""}
        studentList = {[]}
        closeModal = {closeModalMock}
        deleteLecture = {deleteLectureMock}
        changeToOnline = {changeToOnlineMock}
        dateStart = {new Date("2019-05-05T10:00:00")}
        />);
    const deleteButton = queryByTestId("deleteNo-button");
    const changeButton = queryByTestId("changeNo-button");
    fireEvent.click(deleteButton);
    fireEvent.click(changeButton);
    expect();
});