import React from "react";
import { Container, Row, Col, Button, Table } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import { Link } from "react-router-dom";
import API from '../API';

class BookableLecturesPage extends React.Component {
    constructor(props){
      super(props);
  
      this.state = { year: '1', success: undefined };
    }

    onChangeValue(e){
        this.setState({year: e.target.value});
    }
    
    buttonClickOnline(){
        console.log(this.state.year);
        API.changeToOnlineByYear(this.state.year).then(
            () => {
                this.setState({success: true});
            }
        ).catch(() => {
            console.log('error');
            this.setState({success: false});
          });
    }
    buttonClickPresence(){
        console.log(this.state.year);
        API.changeToPresenceByYear(this.state.year).then(
            () => {
                this.setState({success: true});
            }
        ).catch(() => {
            console.log('error');
            this.setState({success: false});
          });
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
                    <Button className="mt-3 mr-1" variant="primary" onClick={this.buttonClickOnline.bind(this)}>Change to Online</Button>
                    <Button className="mt-3 ml-1" variant="success" onClick={this.buttonClickPresence.bind(this)}>Change to In Presence</Button>
                    { (this.state.success===true) ?
                        <Alert variant='success' className='mt-2'>Courses correctly updated</Alert>
                        :
                        <></>
                    }
                    { (this.state.success===false) ?
                        <Alert variant='danger' className='mt-2'>Error</Alert>
                        :
                        <></>
                    }
                    </Form>
                </Row>
            </Container>
            </div>
        </>
    }
}

export default BookableLecturesPage;