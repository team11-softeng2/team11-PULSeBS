import React from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';

class ContactTracingPage extends React.Component {
    render(){
        return <>
            <Container fluid>
                <Row>
                    <Col className='col-3'>
                        <Form className='mt-3'>
                            <Form.Group controlId="formStudentName">
                                <Form.Label>Enter the positive student's name:</Form.Label>
                                <Form.Control type="text" placeholder="Mario Rossi"/>
                            </Form.Group>

                            <Button variant="primary" type="submit" onClick={this.handleSearchClick}>
                                Search
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </>
    }

    handleSearchClick = (event) => {
        event.preventDefault();

        var studentNameInserted = document.getElementById('formStudentName').value;
        console.log(studentNameInserted);

        
        
    }
}

export default ContactTracingPage;