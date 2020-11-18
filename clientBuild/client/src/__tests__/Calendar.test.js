import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Calendar from '../Calendar';

test("Calendar render", () => {
    const testRender = render(<Calendar/>);
    expect(testRender).not.toBe(undefined);
});