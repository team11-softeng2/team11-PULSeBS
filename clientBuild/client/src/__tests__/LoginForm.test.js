import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import TestRenderer from 'react-test-renderer';
import LoginForm from '../LoginForm';
import API from '../API';
import { shallow } from 'enzyme';

import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

test("LoginFrom renders correctly", () => {
    const tree = TestRenderer.create(<LoginForm/>).toJSON();
    expect(tree).toMatchSnapshot();
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

    test("fail login", () => {
        const {queryByPlaceholderText, queryByTestId} = render(<LoginForm/>);
        const usernameInput = queryByPlaceholderText("Username");
        const passwordInput = queryByPlaceholderText("Password");
        const loginButton = queryByTestId("login-button");
        fireEvent.change(usernameInput, {target: {value: "calogero"}});
        fireEvent.change(passwordInput, {target: {value: "tes"}});
        fireEvent.click(loginButton);
        expect();
    });

    test("correct login", () => {
        const {queryByPlaceholderText, queryByTestId} = render(<LoginForm/>);
        const usernameInput = queryByPlaceholderText("Username");
        const passwordInput = queryByPlaceholderText("Password");
        const loginButton = queryByTestId("login-button");
        fireEvent.change(usernameInput, {target: {value: "calogero"}});
        fireEvent.change(passwordInput, {target: {value: "test"}});
        fireEvent.click(loginButton);
        expect();
    });

    test("empty input", () => {
        const {queryByPlaceholderText, queryByTestId} = render(<LoginForm/>);
        const usernameInput = queryByPlaceholderText("Username");
        const passwordInput = queryByPlaceholderText("Password");
        const loginButton = queryByTestId("login-button");
        fireEvent.change(usernameInput, {target: {value: ""}});
        fireEvent.change(passwordInput, {target: {value: ""}});
        fireEvent.click(loginButton);
        expect();
    });

    test("login error", async () => {
        const component = shallow(<LoginForm/>);
        const instance = component.instance();
        API.userLogin = jest.fn(() => Promise.reject());
        await instance.doLoginCall("test", "test");
        expect(instance.state.loginSuccess).toBe(false);
    })
});