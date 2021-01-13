import React from "react";
import { Modal, Dropdown, Container, Row, Col, Button } from 'react-bootstrap';
import TimePicker from 'react-bootstrap-time-picker';
import API from '../API.js';
import moment from 'moment';

class ModalNewSchedule extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      selectedDay: undefined,
      beginTime: 28800,
      endTime: 30600,
      allClassrooms : [],
      selectedClassroom: undefined
    };

  }

  render(){
    //console.log(this.props.currentSchedule)
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
                    {this.state.days.map( (d) => <Dropdown.Item key={d} id={"dropDays"+d} onClick={ (e) => this.handleOnClickDropdown(e) }>{d}</Dropdown.Item> )}
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
                  start={this.getEndStartTime()}
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
                    {this.state.allClassrooms.map( (c) => <Dropdown.Item key={c.idClassroom} id={"dropAllClass"+c.idClassroom} onClick={ (e) => this.handleOnClickDropdownClass(e) }>{c.roomNumber}</Dropdown.Item> )}
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

  getEndStartTime = () => {
    return Math.floor(this.state.beginTime/3600).toString().padStart(2, "0") + ":" + this.getMinutes(this.state.beginTime).toString().padStart(2, "0");
  }

  clearAndClose = () => {
    this.setState({
      selectedDay: undefined,
      beginTime: 28800,
      endTime: 30600,
      selectedClassroom: undefined
    });

    this.props.hide();
  }

  requiredDataIsInserted = () => {
    return this.state.selectedDay !== undefined && this.state.selectedClassroom !== undefined && this.state.endTime > this.state.beginTime;
  }

  getDayOfWeek = () => {
    var i;
    for(i = 0; i < this.state.days.length; i++){
      if(this.state.selectedDay === this.state.days[i]){
        return i+1;
      }
    }
  }

  getMinutes = (timeInSeconds) => {
    return ( timeInSeconds - Math.floor(timeInSeconds/3600)*3600 )/60;
  }

  modifyLectureOnServer = (newLectureObj) => {
    //newLectureObj.start.toISOString().substr(0, 10)
    var obj = {
      idLesson: newLectureObj.id,
      idClassroom: newLectureObj.classroom,
      dow: newLectureObj.start.getDay(),
      beginTime: newLectureObj.start.getHours().toString().padStart(2, "0") + ":" + newLectureObj.start.getMinutes().toString().padStart(2, "0"),
      endTime: newLectureObj.end.getHours().toString().padStart(2, "0") + ":" + newLectureObj.end.getMinutes().toString().padStart(2, "0")
    };

    //console.log(obj)

    API.updateSchedule(obj)
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log('error in updating the lecture (PUT /updateSchedule)');
      console.log(err);
    });
  }

  handleSubmit = () => {
    //console.log(this.props.currentSchedule)
    //console.log(this.state)
    //console.log(this.props.clickedLecture)

    var i;
    var newSchedule = [];
    for(i = 0; i < this.props.currentSchedule.length; i++){
      if(this.props.currentSchedule[i].id.toString() === this.props.clickedLecture.id.toString()){ //this is the lecture i need to modify

        this.props.currentSchedule[i].start.setHours(Math.floor(this.state.beginTime/3600), this.getMinutes(this.state.beginTime));
        this.props.currentSchedule[i].end.setHours(Math.floor(this.state.endTime/3600), this.getMinutes(this.state.endTime));

        var day = this.getDayOfWeek();
        var momStart = moment(this.props.currentSchedule[i].start).day(day);
        var momEnd = moment(this.props.currentSchedule[i].end).day(day);
        var newLectureObj = {
          classroom: this.state.selectedClassroom,
          start: new Date(momStart),
          end: new Date(momEnd),
          id: this.props.currentSchedule[i].id,
          title: this.props.currentSchedule[i].title
        }

        newSchedule.splice(0, 0, newLectureObj);
        this.modifyLectureOnServer(newLectureObj);
        //console.log(this.props.currentSchedule[i])
      }
      else{
        newSchedule.splice(0, 0, this.props.currentSchedule[i]);
      }
    }

    this.props.changeSchedule(newSchedule);

    this.clearAndClose();
  }

  handleOnClickDropdownClass = (e) => {
    this.setState({ selectedClassroom: e.target.innerText });
  }

  getAvailableStartTime = () => {
      if(this.state.beginTime === undefined){
        return 30600;
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
