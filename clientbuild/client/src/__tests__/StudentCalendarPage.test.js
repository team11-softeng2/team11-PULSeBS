import React from 'react';
import { render } from '@testing-library/react';
import StudentCalendarPage from '../StudentCalendarPage';

test("StudentCalendarPage render", () => {
    const {queryByText} = render(<StudentCalendarPage bookableLectures = {[]} bookings = {[]} fullLectures = {[]} waitingBookings = {[]}/>);
    const header = queryByText("My lecture bookings:");
    const badge1 = queryByText("Bookable");
    const badge2 = queryByText("Booked");
    expect(header).toHaveTextContent("My lecture bookings:");
    expect(badge1).toHaveTextContent("Bookable");
    expect(badge2).toHaveTextContent("Booked");
});