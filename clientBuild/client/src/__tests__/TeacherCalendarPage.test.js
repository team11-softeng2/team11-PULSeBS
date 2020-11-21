import React from 'react';
import { render } from '@testing-library/react';
import TeacherCalendarPage from '../TeacherCalendarPage';

test("StudentCalendarPage render", () => {
    const {queryByText} = render(<TeacherCalendarPage lectures = {[]}/>);
    const header = queryByText("My lectures:");
    const badge1 = queryByText("In presence");
    const badge2 = queryByText("Online");
    expect(header).toHaveTextContent("My lectures:");
    expect(badge1).toHaveTextContent("In presence");
    expect(badge2).toHaveTextContent("Online");
});