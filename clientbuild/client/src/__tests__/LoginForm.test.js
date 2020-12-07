import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import TestRenderer from 'react-test-renderer';
import LoginForm from '../LoginForm';
import API from '../API';
import { shallow } from 'enzyme';

import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

global.window = { location: { pathname: null } };

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

    test("login bad credentials", async () => {
        const component = shallow(<LoginForm/>);
        const instance = component.instance();
        API.userLogin = jest.fn(() => Promise.resolve(0));
        await instance.doLoginCall("test", "test");
        expect(instance.state.loginSuccess).toBe(false);
    });

    test("login error", async () => {
        const component = shallow(<LoginForm/>);
        const instance = component.instance();
        API.userLogin = jest.fn(() => Promise.reject());
        await instance.doLoginCall("test", "test");
        expect(instance.state.loginSuccess).toBe(false);
    });

    test("prevent default", () => {
        const component = shallow(<LoginForm/>);
        const instance = component.instance();
        let event = {
            preventDefault: undefined,
        }
        event.preventDefault = jest.fn();
        instance.validateForm(event);
        expect(event.preventDefault).toHaveBeenCalledTimes(1);
    });

    test("redirect to student home", async () => {
        const component = shallow(<LoginForm/>);
        const instance = component.instance();
        await instance.setState({loginSuccess: true});
        await instance.setState({userRole: "student"});
        expect(instance.state.loginSuccess).toBe(true);
        expect(instance.state.userRole).toBe("student");
    });

    test("redirect to teacher home", async () => {
        const component = shallow(<LoginForm/>);
        const instance = component.instance();
        await instance.setState({loginSuccess: true});
        await instance.setState({userRole: "teacher"});
        expect(instance.state.loginSuccess).toBe(true);
        expect(instance.state.userRole).toBe("teacher");
    });

    test("redirect to booking-manager home", async () => {
        const component = shallow(<LoginForm/>);
        const instance = component.instance();
        await instance.setState({loginSuccess: true});
        await instance.setState({userRole: "booking-manager"});
        expect(instance.state.loginSuccess).toBe(true);
        expect(instance.state.userRole).toBe("booking-manager");
    });

    test("correct login", async () => {
        const component = shallow(<LoginForm setLoggedIn={jest.fn()}/>);
        const instance = component.instance();
        API.userLogin = jest.fn(() => Promise.resolve(5));
        await instance.doLoginCall("fabio", "test");
        expect(instance.state.loginSuccess).toBe(true);
    })
});