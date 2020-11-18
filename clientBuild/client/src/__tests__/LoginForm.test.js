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
        const input = queryByPlaceholderText("Username");
        fireEvent.change(input, {target: {value: "calogero"}});
        expect(input.value).toBe("calogero");
    })
})