import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import ModalTeacher from '../ModalTeacher';

describe("Modal render", () => {
    test("Render with show true", () => {
        const {queryByTestId} = render(<ModalTeacher 
            show={true} 
            lectureTitle = {"test"}
            lectureDate = {"2020-10-10"}
            lectureBeginTime = {"10:00:00"}
            lectureEndTime = {"12:00:00"}
            elementId = {1}
            studentList = {[]}/>);
        expect(queryByTestId("modal-test")).toBeTruthy();
    });

    test("Render with show false", () => {
        const {queryByTestId} = render(<ModalTeacher 
            show={false} 
            lectureTitle = {"test"}
            lectureDate = {"2020-10-10"}
            lectureBeginTime = {"10:00:00"}
            lectureEndTime = {"12:00:00"}
            elementId = {1}
            studentList = {[]}/>);
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
        elementId = {1}
        studentList = {[]}/>);
    const title = queryByText("Lecture information");
    const onlineLectureButton = queryByText("Change to online");
    const deleteLectureButton = queryByText("Delete lecture");
    expect(title).toBeInTheDocument();
    expect(onlineLectureButton).toBeInTheDocument();
    expect(deleteLectureButton).toBeInTheDocument();
});

test("Render student list", () => {
    const {queryByTestId} = render(<ModalTeacher 
        show={true} 
        lectureTitle = {"test"}
        lectureDate = {"2020-10-10"}
        lectureBeginTime = {"10:00:00"}
        lectureEndTime = {"12:00:00"}
        elementId = {1}
        studentList = {["Test1", "Test2"]}
        closeModal = {closeModalMock}
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
        elementId = {1}
        studentList = {[]}
        closeModal = {closeModalMock}
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
        elementId = {1}
        studentList = {[]}
        closeModal = {closeModalMock}
        />);
    const buttons = queryAllByRole("button");
    fireEvent.click(buttons[0]);
    expect();
});