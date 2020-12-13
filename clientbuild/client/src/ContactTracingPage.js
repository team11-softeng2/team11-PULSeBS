import React from 'react';
import { Container, Row, Col, Form, Alert, Button, Table } from 'react-bootstrap';
import API from './API';

class ContactTracingPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = { allStudents: [], filteredStudents: [], alwaysShowStudents: false, maxStudentsToShow: 100 };
    }

    render(){
        return <>
            <Container fluid>
                <Row>
                    <Col className='col-3'>
                        <Form className='mt-3'>
                            <Form.Group controlId="formStudentName">
                                <Form.Label>Enter the positive student's name:</Form.Label>
                                <Form.Control type="text" placeholder="Mario Rossi" data-testid="studentName-test" onChange={this.handleOnChangeText}/>
                            </Form.Group>
                        </Form>

                        <Alert variant={(this.state.filteredStudents.length > 0) ? 'success' : 'danger'}>
                            Number of students found: {this.state.filteredStudents.length}
                        </Alert>

                        { (this.state.filteredStudents.length > this.state.maxStudentsToShow && this.state.alwaysShowStudents === false) && <>
                          <Alert variant='danger'>
                        Too many students to show (> {this.state.maxStudentsToShow}). Please narrow your search first. <br></br>
                              <Button 
                                className='mt-3' 
                                variant='danger' 
                                onClick={() => {this.setState({alwaysShowStudents: true});}}>
                                    Show them anyway
                              </Button>
                          </Alert> 
                             
                        </> }

                        {  (this.state.filteredStudents.length > this.state.maxStudentsToShow && this.state.alwaysShowStudents === true) && 
                            <Alert variant='info'>
                                Currently showing {this.state.filteredStudents.length} students.
                                <Button 
                                className='mt-3' 
                                variant='success' 
                                onClick={() => {this.setState({alwaysShowStudents: false});}}>
                                    Restrict number of students to be shown
                            </Button>
                          </Alert>
                        }

                    </Col>

                    <Col className='col-8'>
                        <Table className='mt-3' striped bordered hover>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Student id</th>
                                    <th>Action</th>
                                </tr>
                            </thead>

                            <tbody>
                                {(this.state.filteredStudents.length <= this.state.maxStudentsToShow || this.state.alwaysShowStudents === true) &&
                                    this.state.filteredStudents.map(s => this.createStudentTableRow(s))}
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            </Container>
        </>
    }

    componentDidMount = () => {
        API.getAllStudents()
        .then((res) => {
            this.setState({
                allStudents: res
            });
        });
    }

    handleStudentButtonClick = (s) => {
        console.log('clicked student: ');
        console.log(s);
    }

    createStudentTableRow = (s) => {
        return <tr>
            <td>{s.name}</td>
            <td>{s.email}</td>
            <td>{s.idStudent}</td>
            <td>
                <Button className='mt-1' variant='danger'data-testid="button-test" onClick={() => {this.handleStudentButtonClick(s);}}>Generate report from this student</Button>
            </td>
        </tr>
    }

    studentMatchesInput = (s, wordsInInput) => {
        var res = true;
        var i;

        for(i = 0; i < wordsInInput.length; i++){
            if(!s.name.toLowerCase().includes(wordsInInput[i])){
                res = false;
            }
        }

        return res;
    }

    handleOnChangeText = (event) => {
        var currentTextInput = event.target.value.toLowerCase();
        var wordsInInput = currentTextInput.split(' ').filter(w => w !== '');
        
        var filteredStudents = this.state.allStudents.filter(s => this.studentMatchesInput(s, wordsInInput));
        this.setState({ filteredStudents: filteredStudents });
    }
}

export default ContactTracingPage;