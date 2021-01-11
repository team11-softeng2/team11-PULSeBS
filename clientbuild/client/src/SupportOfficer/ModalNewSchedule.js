import React from "react";
import { Modal, Dropdown, Container, Row, Col, Button } from 'react-bootstrap';
import TimePicker from 'react-bootstrap-time-picker';
import API from '../API.js';

class ModalNewSchedule extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      selectedDay: undefined,
      beginTime: 28800,
      endTime: '08:30',
      allClassrooms : [],
      selectedClassroom: undefined
    };
    
  }

  render(){
    return <>
      <Modal show={this.props.show} onHide={ () => this.clearAndClose() } data-testid="modal-test">
        <Modal.Header closeButton>
          <Modal.Title>Define new lecture</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Container fluid>
            <Row>
              <Col>
                <b>Subject:</b> <p className='float-right'>{this.props.subject}</p>
                <br/>

              </Col>
            </Row>

            <Row className='mt-2'>
              <Col className='col-1'>
                <b>Day:</b>
              </Col>

              <Col>
                <Dropdown className='float-right'>
                  <Dropdown.Toggle>
                    { (this.state.selectedDay === undefined) ? 'Day of the week' : this.state.selectedDay }
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    {this.state.days.map( (d) => <Dropdown.Item key={d} onClick={ (e) => this.handleOnClickDropdown(e) }>{d}</Dropdown.Item> )}
                  </Dropdown.Menu>
                </Dropdown>
              </Col>
            </Row>

            <Row className='mt-2'>
              <Col className='col-7'>
                <b>Begin time:</b>
              </Col>

              <Col className='col-5'>
                <TimePicker
                  start='08:00'
                  end='20:00'
                  step={30}
                  value={this.state.beginTime}
                  format={24}
                  onChange={this.handleChangeBeginTime} />
              </Col>
            </Row>

            <Row className='mt-2'>
              <Col className='col-7'>
                <b>End time:</b>
              </Col>

              <Col className='col-5'>
                <TimePicker
                  start={this.getAvailableStartTime()}
                  end='20:00'
                  step={30}
                  value={this.state.endTime}
                  format={24}
                  onChange={this.handleChangeEndTime} />
              </Col>
            </Row>

            <Row className='mt-2'>
              <Col className='col-3'>
                <b>Classroom:</b>
              </Col>

              <Col>
                <Dropdown className='float-right'>
                  <Dropdown.Toggle>
                    { (this.state.selectedClassroom === undefined) ? 'Classroom' : this.state.selectedClassroom }
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    {this.state.allClassrooms.map( (c) => <Dropdown.Item key={c.idClassroom} onClick={ (e) => this.handleOnClickDropdownClass(e) }>{c.roomNumber}</Dropdown.Item> )}
                  </Dropdown.Menu>
                </Dropdown>
              </Col>
            </Row>


          </Container>
        </Modal.Body>

        <Modal.Footer>
          <Button onClick={this.handleSubmit} disabled={!this.requiredDataIsInserted()}>
            Submit
          </Button>
        </Modal.Footer>

      </Modal>
    </>
  }

  componentDidMount = () => {
    API.getAllClassrooms().then((classrooms) => {
        this.setState({ allClassrooms: classrooms });
    });
  }

  clearAndClose = () => {
    this.setState({
      selectedDay: undefined,
      beginTime: 28800,
      endTime: '08:30',
      selectedClassroom: undefined
    });

    this.props.hide();
  }

  requiredDataIsInserted = () => {
    return this.state.selectedDay !== undefined && this.state.selectedClassroom !== undefined;
  }

  handleSubmit = () => {


    this.clearAndClose();
  }

  handleOnClickDropdownClass = (e) => {
    this.setState({ selectedClassroom: e.target.innerText });
  }

  getAvailableStartTime = () => {
      if(this.state.beginTime === undefined){
        return '08:30';
      }

      return new Date((this.state.beginTime + 1800) * 1000).toISOString().substr(11, 5);
  }

  handleOnClickDropdown = (e) => {
    this.setState({ selectedDay: e.target.innerText });
  }

  handleChangeBeginTime = (time) => {
    this.setState({ beginTime: time });
  }

  handleChangeEndTime = (time) => {
    this.setState({ endTime: time });
  }
}

export default ModalNewSchedule;
