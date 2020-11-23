import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import ModalStudent from '../ModalStudent';

describe("Modal render", () => {
    test("Render with show true", () => {
        const {queryByTestId} = render(<ModalStudent 
            show={true} 
            lectureTitle = {"test"}
            lectureDate = {"2020-10-10"}
            lectureBeginTime = {"10:00:00"}
            lectureEndTime = {"12:00:00"}
            elementId = {1}
            />);
        expect(queryByTestId("modal-test")).toBeTruthy();
    });

    test("Render with show false", () => {
        const {queryByTestId} = render(<ModalStudent
            show={false} 
            lectureTitle = {"test"}
            lectureDate = {"2020-10-10"}
            lectureBeginTime = {"10:00:00"}
            lectureEndTime = {"12:00:00"}
            elementId = {1}
            />);
        expect(queryByTestId("modal-test")).toBe(null);
    });
});


test("Modal content render booking", () => {
    const {queryByText, queryByTestId} = render(<ModalStudent 
        show={true} 
        lectureTitle = {"test"}
        lectureDate = {"2020-10-10"}
        lectureBeginTime = {"10:00:00"}
        lectureEndTime = {"12:00:00"}
        elementId = {1}
        />);
    const title = queryByText("Lecture booking");
    const dontbookButton = queryByTestId("dontbook-button");
    const bookButton = queryByTestId("book-button");
    expect(title).toBeInTheDocument();
    expect(dontbookButton).toBeInTheDocument();
    expect(bookButton).toBeInTheDocument();
});

test("Modal content render delete booking", () => {
    const {queryByText, queryByTestId} = render(<ModalStudent 
        show={true} 
        lectureTitle = {"test"}
        lectureDate = {"2020-10-10"}
        lectureBeginTime = {"10:00:00"}
        lectureEndTime = {"12:00:00"}
        elementId = {1}
        lectureColor = {"green"}
        />);
    const title = queryByText("Lecture booking");
    const dontdeleteButton = queryByTestId("dontdelete-button");
    const deleteButton = queryByTestId("delete-button");
    expect(title).toBeInTheDocument();
    expect(dontdeleteButton).toBeInTheDocument();
    expect(deleteButton).toBeInTheDocument();
});


const closeModalMock = jest.fn();
const deleteBookingMock = jest.fn();
const bookASeatMock = jest.fn();

describe("Modal buttons", () => {
    test("Modal don't delete button", () => {
        const {queryByTestId} = render(<ModalStudent
            show={true} 
            lectureTitle = {"test"}
            lectureDate = {"2020-10-10"}
            lectureBeginTime = {"10:00:00"}
            lectureEndTime = {"12:00:00"}
            elementId = {1}
            lectureColor = {"green"}
            closeModal = {closeModalMock}
            deleteBooking = {deleteBookingMock}
            bookASeat = {bookASeatMock}
            />);
        const dontdeleteButton = queryByTestId("dontdelete-button");
        fireEvent.click(dontdeleteButton);
        expect();
    });

    test("Modal delete button", () => {
        const {queryByTestId} = render(<ModalStudent
            show={true} 
            lectureTitle = {"test"}
            lectureDate = {"2020-10-10"}
            lectureBeginTime = {"10:00:00"}
            lectureEndTime = {"12:00:00"}
            elementId = {1}
            lectureColor = {"green"}
            closeModal = {closeModalMock}
            deleteBooking = {deleteBookingMock}
            bookASeat = {bookASeatMock}
            />);
        const deleteButton = queryByTestId("delete-button");
        fireEvent.click(deleteButton);
        expect();
    });

    test("Modal don't book button", () => {
        const {queryByTestId} = render(<ModalStudent
            show={true} 
            lectureTitle = {"test"}
            lectureDate = {"2020-10-10"}
            lectureBeginTime = {"10:00:00"}
            lectureEndTime = {"12:00:00"}
            elementId = {1}
            closeModal = {closeModalMock}
            deleteBooking = {deleteBookingMock}
            bookASeat = {bookASeatMock}
            />);
        const dontbookButton = queryByTestId("dontbook-button");
        fireEvent.click(dontbookButton);
        expect();
    });

    test("Modal book button", () => {
        const {queryByTestId} = render(<ModalStudent
            show={true} 
            lectureTitle = {"test"}
            lectureDate = {"2020-10-10"}
            lectureBeginTime = {"10:00:00"}
            lectureEndTime = {"12:00:00"}
            elementId = {1}
            closeModal = {closeModalMock}
            deleteBooking = {deleteBookingMock}
            bookASeat = {bookASeatMock}
            />);
        const bookButton = queryByTestId("book-button");
        fireEvent.click(bookButton);
        expect();
    });
    
    test("onHide", () => {
        const {queryAllByRole} = render(<ModalStudent
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


})