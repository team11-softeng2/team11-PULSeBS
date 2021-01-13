import React from "react";
import FullCalendar from '@fullcalendar/react'
import timeGridPlugin from '@fullcalendar/timegrid';
import {Container, Row, Col, Modal, Button} from 'react-bootstrap';
import moment from 'moment';
import ModalNewSchedule from './ModalNewSchedule.js';
import API from '../API';

class CourseUpdateSchedulePage extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      idCourse: props.match.params.idCourse,
      currentSchedule: undefined,
      clickedLectureData: {},
      showDecisionModal: false,
      showNewScheduleModal: false,
      courseName: undefined
    };
  }

  render(){
    //console.log(this.state.currentSchedule)
      if(this.state.currentSchedule === undefined){
        return <h1>Loading schedule...</h1>
      }
      else{
        return <>
          <Container fluid>
            <Row>
              <Col> <h2>Schedule:</h2> </Col>
            </Row>

            <Row>
              <Col>
                <FullCalendar
                    plugins={[ timeGridPlugin ]}
                    initialView="timeGridWeek"
                    dayHeaderFormat={ {weekday:'short'} }
                    headerToolbar={ {start: false, end: false} }
                    events={this.state.currentSchedule}
                    eventClick={this.handleEventClick}
                    contentHeight="auto"
                    slotMinTime="08:00:00"
                    slotMaxTime="20:00:00"
                    allDaySlot={false}
                    slotEventOverlap={false}
                    eventContent= { function(info) {
                      return <><p>{info.event.title}</p>
                       {info.event.extendedProps.inPresence === 0 ?
                        null
                        :
                        <p className={"classroom"}>{"Classroom: " + info.event.extendedProps.classroom}</p>
                       }
                      </>;
                    }}
                />
              </Col>
            </Row>

            <Modal show={this.state.showDecisionModal} onHide={() => this.closeDecisionModal()}>
              <Modal.Header closeButton>
                <Modal.Title>Choose what to do</Modal.Title>
              </Modal.Header>

              <Modal.Body>
                <p><b>Subject:</b> {this.state.clickedLectureData.courseName}
                <br/>
                <b>Day:</b> {this.state.clickedLectureData.day}
                <br/>
                <b>Begin time:</b> {this.state.clickedLectureData.startTime}
                <br/>
                <b>End time:</b> {this.state.clickedLectureData.endTime}
                <br/>
                <b>Classroom:</b> {this.state.clickedLectureData.classroom}
                <br/>
                </p>
              </Modal.Body>

              <Modal.Footer>
                <Button variant='info' onClick={this.onClickModifyLecture}>
                  Modify this lecture
                </Button>
              </Modal.Footer>
            </Modal>

            <ModalNewSchedule
              show={this.state.showNewScheduleModal}
              hide={() => { this.setState({ showNewScheduleModal: false }) }}
              subject={this.state.courseName}
              clickedLecture={this.state.clickedLectureData}
              currentSchedule={this.state.currentSchedule}
              changeSchedule={this.changeSchedule}
            />

          </Container>
        </>
      }
  }

  changeSchedule = (newSchedule) => {
    this.setState({ currentSchedule: newSchedule });
  }

  updateSchedule = () => {
    API.getGeneralSchedule(this.state.idCourse)
    .then((newSchedule) => {
      //console.log(newSchedule)
      var i;
      var schedule = [];

      for(i = 0; i < newSchedule.length; i++){
        schedule.splice(0, 0, {
          classroom: newSchedule[i].idClassRoom,
          start: new Date(newSchedule[i].date + "T" + newSchedule[i].beginTime),
          end: new Date(newSchedule[i].date + "T" + newSchedule[i].endTime),
          id: newSchedule[i].idLesson,
          title: this.state.courseName
        });
      }

      this.setState({ currentSchedule: schedule });
    })
    .catch((err) => {
      console.log('error in getting schedule from server')
    });
  }

  componentDidMount = () => {

    API.getAllCourses()
    .then((courses) => {
      var i;
      for(i = 0; i < courses.length; i++){
        if(courses[i].idCourse === this.state.idCourse){
          this.setState({ courseName: courses[i].courseName }, () => {
            this.updateSchedule();
          });
        }
      }
    } )
    .catch((err) => {
      console.log('error in getting course name from server');
    });

  }

  handleEventClick = (e) => {
    var startTime = e.event.start;   //Date object
    var endTime = e.event.end;   //Date object
    var courseName = e.event.title;   //string
    var id = e.event.id;   //number, lesson id
    var classroom = e.event.extendedProps.classroom;   //number

    //console.log(classroom)

    this.setState({ showDecisionModal: true, clickedLectureData: {
      startTime: moment(startTime).format('HH:mm'),
      endTime: moment(endTime).format('HH:mm'),
      courseName: courseName,
      id: id,
      classroom: classroom,
      day: moment(startTime).format('dddd')
    } });

  }

  closeDecisionModal = () => {
    this.setState({ showDecisionModal: false });
  }

  onClickModifyLecture = () => {
    //console.log('clicked to modify')
    //console.log(this.state.clickedLectureData)

    this.closeDecisionModal();
    this.setState({ showNewScheduleModal: true });

  }

  onClickDeleteLecture = () => {
    console.log('clicked to delete')
    console.log(this.state.clickedLectureData)

    this.closeDecisionModal();
  }

}

export default CourseUpdateSchedulePage;
