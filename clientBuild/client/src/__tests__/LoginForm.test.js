import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import LoginForm from '../LoginForm';

test("LoginFrom renders correctly", () => {
    const {queryByTestId} = render(<LoginForm/>);
    expect(queryByTestId("login-form")).toBeTruthy();
});
