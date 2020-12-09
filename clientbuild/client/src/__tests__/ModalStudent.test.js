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
        lectureType = {"bookableLecture"}
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
        lectureType = {"bookings"}
        />);
    const title = queryByText("Lecture booking");
    const dontdeleteButton = queryByTestId("dontdelete-button");
    const deleteButton = queryByTestId("delete-button");
    expect(title).toBeInTheDocument();
    expect(dontdeleteButton).toBeInTheDocument();
    expect(deleteButton).toBeInTheDocument();
});

test("Modal content render full booking", () => {
    const {queryByText, queryByTestId} = render(<ModalStudent 
        show={true} 
        lectureTitle = {"test"}
        lectureDate = {"2020-10-10"}
        lectureBeginTime = {"10:00:00"}
        lectureEndTime = {"12:00:00"}
        elementId = {1}
        lectureColor = {"red"}
        lectureType = {"fullLecture"}
        />);
    const title = queryByText("Lecture booking");
    const dontwaitButton = queryByTestId("dontwait-button");
    const waitButton = queryByTestId("wait-button");
    expect(title).toBeInTheDocument();
    expect(dontwaitButton).toBeInTheDocument();
    expect(waitButton).toBeInTheDocument();
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

    test("onHide fullLecture", () => {
        const {queryAllByRole} = render(<ModalStudent
            show={true} 
            lectureTitle = {"test"}
            lectureDate = {"2020-10-10"}
            lectureBeginTime = {"10:00:00"}
            lectureEndTime = {"12:00:00"}
            elementId = {1}
            studentList = {[]}
            closeModal = {closeModalMock}
            lectureType = {"fullLecture"}
            />);
        const buttons = queryAllByRole("button");
        fireEvent.click(buttons[0]);
        expect();
    });

    test("Modal don't wait button", () => {
        const {queryByTestId} = render(<ModalStudent
            show={true} 
            lectureTitle = {"test"}
            lectureDate = {"2020-10-10"}
            lectureBeginTime = {"10:00:00"}
            lectureEndTime = {"12:00:00"}
            elementId = {1}
            closeModal = {closeModalMock}
            bookASeat = {bookASeatMock}
            lectureType = {"fullLecture"}
            />);
        const dontwaitButton = queryByTestId("dontwait-button");
        fireEvent.click(dontwaitButton);
        expect(bookASeatMock).toHaveBeenCalledTimes(1);
    });

    test("Modal wait button", () => {
        const {queryByTestId} = render(<ModalStudent
            show={true} 
            lectureTitle = {"test"}
            lectureDate = {"2020-10-10"}
            lectureBeginTime = {"10:00:00"}
            lectureEndTime = {"12:00:00"}
            elementId = {1}
            closeModal = {closeModalMock}
            bookASeat = {bookASeatMock}
            lectureType = {"fullLecture"}
            />);
        const waitButton = queryByTestId("wait-button");
        fireEvent.click(waitButton);
        expect(bookASeatMock).toHaveBeenCalledTimes(2);
    });

    test("onHide waitingBooking", () => {
        const {queryAllByRole} = render(<ModalStudent
            show={true} 
            lectureTitle = {"test"}
            lectureDate = {"2020-10-10"}
            lectureBeginTime = {"10:00:00"}
            lectureEndTime = {"12:00:00"}
            elementId = {1}
            studentList = {[]}
            closeModal = {closeModalMock}
            lectureType = {"waitingBooking"}
            />);
        const buttons = queryAllByRole("button");
        fireEvent.click(buttons[0]);
        expect();
    });

    test("Modal don't leave button", () => {
        const {queryByTestId} = render(<ModalStudent
            show={true} 
            lectureTitle = {"test"}
            lectureDate = {"2020-10-10"}
            lectureBeginTime = {"10:00:00"}
            lectureEndTime = {"12:00:00"}
            elementId = {1}
            closeModal = {closeModalMock}
            deleteBooking = {deleteBookingMock}
            lectureType = {"waitingBooking"}
            />);
        const dontwaitButton = queryByTestId("dontdeletewait-button");
        fireEvent.click(dontwaitButton);
        expect(deleteBookingMock).toHaveBeenCalledTimes(1);
    });

    test("Modal leave waiting list button", () => {
        const {queryByTestId} = render(<ModalStudent
            show={true} 
            lectureTitle = {"test"}
            lectureDate = {"2020-10-10"}
            lectureBeginTime = {"10:00:00"}
            lectureEndTime = {"12:00:00"}
            elementId = {1}
            closeModal = {closeModalMock}
            deleteBooking = {deleteBookingMock}
            lectureType = {"waitingBooking"}
            />);
        const waitButton = queryByTestId("deletewait-button");
        fireEvent.click(waitButton);
        expect(deleteBookingMock).toHaveBeenCalledTimes(2);
    });
})