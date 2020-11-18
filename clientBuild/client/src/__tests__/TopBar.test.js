import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import TopBar from '../TopBar';
import {BrowserRouter as Router} from 'react-router-dom';

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
    //const logoutLink = queryByTestId("logout-link");
    fireEvent.click(queryByTestId("logout-link"));
    expect(logout).toHaveBeenCalledTimes(1);
})
