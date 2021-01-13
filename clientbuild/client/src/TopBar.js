import React from 'react';
import Navbar from 'react-bootstrap/Navbar'
import { Link, useHistory } from "react-router-dom";
import TeacherNavigationButton from './TeacherNavigationButton';
import BookingManagerNavButton from './BookingManagerNavButton';

class TopBar extends React.Component {

    render() {
        return <Navbar bg="dark" variant="dark">
            <HomeLink role={this.props.role}></HomeLink>
            {this.props.loggedin === false ?
                null
                :
                <>
                    <Navbar.Text className="text-align-center" data-testid="welcome-message">
                        {(this.props.role !== "support-officer") ? "Welcome " + this.props.userName : ""}
                    </Navbar.Text>

                    <ul className="ml-auto">

                        {
                            this.props.role === 'teacher' &&
                            <TeacherNavigationButton />
                        }

                        {
                            this.props.role === 'booking-manager' &&
                            <BookingManagerNavButton />
                        }

                        <Link className="text-light" to="/" onClick={() => this.props.logout()} data-testid="logout-link">
                            {"Logout "}
                            <svg className="bi bi-box-arrow-right" width="22" height="22" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" d="M11.646 11.354a.5.5 0 0 1 0-.708L14.293 8l-2.647-2.646a.5.5 0 0 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0z" />
                                <path fillRule="evenodd" d="M4.5 8a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1H5a.5.5 0 0 1-.5-.5z" />
                                <path fillRule="evenodd" d="M2 13.5A1.5 1.5 0 0 1 .5 12V4A1.5 1.5 0 0 1 2 2.5h7A1.5 1.5 0 0 1 10.5 4v1.5a.5.5 0 0 1-1 0V4a.5.5 0 0 0-.5-.5H2a.5.5 0 0 0-.5.5v8a.5.5 0 0 0 .5.5h7a.5.5 0 0 0 .5-.5v-1.5a.5.5 0 0 1 1 0V12A1.5 1.5 0 0 1 9 13.5H2z" />
                            </svg>
                        </Link>

                    </ul>
                </>
            }
        </Navbar>
    }
}


const HomeLink = (props) => {
    const history = useHistory();
    const role = props.role;
    const supportOfficerHome = '/support-officer';

    const onHomeClick = () => {
        switch (role) {
            case 'support-officer':
                if (history.location.pathname !== supportOfficerHome) {
                    history.push(supportOfficerHome);
                }
                break;
            case 'teacher':
                break;
            default:
                break;
        }
    }

    return <Navbar.Brand
                data-testid="home-link"
                onClick={(ev) => { ev.preventDefault(); onHomeClick() }}
                style={{ cursor:'pointer' }}
            >
                PULSeBS
            </Navbar.Brand>
}

export default TopBar
