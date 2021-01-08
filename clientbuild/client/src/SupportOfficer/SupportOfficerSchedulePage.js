import React from "react";
import { Container, Row, Col, Button, Table, Form } from 'react-bootstrap';
import { Link } from "react-router-dom";
import API from '../API';

class SupportOfficerSchedulePage extends React.Component {
  constructor(props){
    super(props);

    this.state = { allCourses: [], filteredCourses: [] };

  }

  render(){
    return <>
      <Container fluid>
        <Row>
          <Col className='col-3'>
            <Form className='mt-3'>
                <Form.Group controlId="formCourseName">
                    <Form.Label>Filter courses by name or by teacher's name:</Form.Label>
                    <Form.Control type="text" placeholder="Software Engineering" onChange={this.handleOnChangeText}/>
                </Form.Group>
            </Form>
          </Col>

          <Col className='col-8'>
              <Table className='mt-3' striped bordered hover>
                  <thead>
                      <tr>
                          <th>Name</th>
                          <th>Id</th>
                          <th>Teacher</th>
                          <th>Action</th>
                      </tr>
                  </thead>

                  <tbody>
                      {this.state.filteredCourses.map(c => this.createCourseTableRow(c))}
                  </tbody>
              </Table>
          </Col>
        </Row>
      </Container>
    </>

  }

  componentDidMount = () => {
    API.getAllCourses().then((courses) => {
        this.setState({
            allCourses: courses,
            filteredCourses: courses
        });
    });

  }

  createCourseTableRow = (c) => {
      return <tr key={c.idCourse}>
          <td>{c.courseName}</td>
          <td>{c.idCourse}</td>
          <td>{c.teacherName}</td>
          <td>
              <Link to={"/support-officer/updateSchedule/" + c.idCourse}>
                <Button className='mt-1' variant='danger' onClick={() => {this.handleButtonClick(c);}}>
                  Change schedule
                </Button>
              </Link>
          </td>
      </tr>
  }
  
  handleButtonClick = (c) => {

  }

  courseMatchesInputTeacher = (c, wordsInInput) => {
      var res = true;
      var i;

      for(i = 0; i < wordsInInput.length; i++){
          if(!c.teacherName.toLowerCase().includes(wordsInInput[i])){
              res = false;
          }
      }

      return res;
  }

  courseMatchesInputName = (c, wordsInInput) => {
      var res = true;
      var i;

      for(i = 0; i < wordsInInput.length; i++){
          if(!c.courseName.toLowerCase().includes(wordsInInput[i])){
              res = false;
          }
      }

      return res;
  }

  courseMatchesInputId = (c, wordsInInput) => {
      var res = true;
      var i;

      for(i = 0; i < wordsInInput.length; i++){
          if(!c.idCourse.toLowerCase().includes(wordsInInput[i])){
              res = false;
          }
      }

      return res;
  }

  handleOnChangeText = (event) => {
      var currentTextInput = event.target.value.toLowerCase();
      var wordsInInput = currentTextInput.split(' ').filter(w => w !== '');

      var filteredCourses = this.state.allCourses.filter(
        c => (this.courseMatchesInputName(c, wordsInInput) || this.courseMatchesInputTeacher(c, wordsInInput) || this.courseMatchesInputId(c, wordsInInput))
      );
      this.setState({ filteredCourses: filteredCourses });
  }

}

export default SupportOfficerSchedulePage;
