import React from "react";
import { Container, Row, Col, Button, Table } from 'react-bootstrap';
import Form from 'react-bootstrap/Form'
import { Link } from "react-router-dom";
import API from '../API';

class BookableLecturesPage extends React.Component {
    constructor(props){
      super(props);
  
      this.state = { year: '1'};
  
    }

    onChangeValue(e){
        this.setState({year: e.target.value});
    }
    
    buttonClick(){
        console.log(this.state.year);
        API.changeToOnlineByYear(this.state.year);
    }

    render(){
        return <>
        <div className="text-center mt-5 p-5 mb-5">
        <Container fluid>
                <Row className="justify-content-center">
                    <Form>
                    <Form.Group controlId="exampleForm.ControlSelect1">
                        <Form.Label>Select an academic year:</Form.Label>
                        <Form.Control as="select"
                        onChange={this.onChangeValue.bind(this)}>
                        <option value='1'>First</option>
                        <option value='2'>Second</option>
                        <option value='3'>Third</option>
                        <option value='4'>Fourth</option>
                        <option value='5'>Fifth</option>
                        </Form.Control>
                    </Form.Group>
                    <Button className="mt-3" variant="success" onClick={this.buttonClick.bind(this)}>Change to Online</Button>
                    </Form>
                </Row>
            </Container>
            </div>
        </>
    }
}

export default BookableLecturesPage;