import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import LoginForm from '../LoginForm';

test("LoginFrom renders correctly", () => {
    const {queryByTestId} = render(<LoginForm/>);
    expect(queryByTestId("login-form")).toBeTruthy();
});

describe("Input value", () => {
    test("update on change username", () => {
        const {queryByPlaceholderText} = render(<LoginForm/>);
        const usernameInput = queryByPlaceholderText("Username");
        const passwordInput = queryByPlaceholderText("Password");
        fireEvent.change(usernameInput, {target: {value: "calogero"}});
        expect(usernameInput.value).toBe("calogero");
        fireEvent.change(passwordInput, {target: {value: "test"}});
        expect(passwordInput.value).toBe("test");
    });
});