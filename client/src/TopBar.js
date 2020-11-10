import React from 'react';
import Navbar from 'react-bootstrap/Navbar'
import Button from 'react-bootstrap/Button'
import {Link} from 'react-router-dom';

class TopBar extends React.Component{
    render(){
        return <Navbar bg="dark" variant="dark">
                   <Navbar.Brand>PULSeBS</Navbar.Brand>
                   <Button variant="outline-light">Logout</Button>
               </Navbar>
    }
}



export default TopBar