import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import TopBar from '../TopBar';
import TestRenderer from 'react-test-renderer';
import {BrowserRouter as Router} from 'react-router-dom';

describe("TopBar renderer", () => {
    test("Whit User logged in", () => {
        const tree = TestRenderer.create(<Router><TopBar loggedin = {true}/></Router>).toJSON();
        expect(tree).toMatchSnapshot();
    });

    test("Without user logged in", () => {
        const tree = TestRenderer.create(<Router><TopBar loggedin = {false}/></Router>).toJSON();
        expect(tree).toMatchSnapshot();
    });

    test("Render as teacher", () => {
        const tree = TestRenderer.create(<Router><TopBar loggedin = {true} role = {"teacher"}/></Router>).toJSON();
        expect(tree).toMatchSnapshot();
    });

    test("Render as booking manager", () => {
        const tree = TestRenderer.create(<Router><TopBar loggedin = {true} role = {"booking-manager"}/></Router>).toJSON();
        expect(tree).toMatchSnapshot();
    });
})

describe("Logout render", () => {
    test("Logout render with user logged", () => {
        const loggedin = false;
        const {queryByTestId} = render(<Router><TopBar loggedin = {loggedin}/></Router>);
        const logoutLink = queryByTestId("logout-link");
        const welcomeMessage = queryByTestId("welcome-message");
        expect(logoutLink).not.toBeInTheDocument();
        expect(welcomeMessage).not.toBeInTheDocument();
    });

    test("Logout render without user logged", () => {
        const loggedin = true;
        const {queryByTestId} = render(<Router><TopBar loggedin = {loggedin}/></Router>);
        const logoutLink = queryByTestId("logout-link");
        const welcomeMessage = queryByTestId("welcome-message");
        expect(logoutLink).toBeInTheDocument();
        expect(welcomeMessage).toBeInTheDocument();
    });
});

test("Logout button", () => {
    const logout = jest.fn();
    const {queryByTestId} = render(<Router><TopBar logout = {logout}/></Router>);
    fireEvent.click(queryByTestId("logout-link"));
    expect(logout).toHaveBeenCalledTimes(1);
})
