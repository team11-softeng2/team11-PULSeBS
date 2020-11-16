import React, {useState} from 'react';
import FullCalendar from '@fullcalendar/react'
import timeGridPlugin from '@fullcalendar/timegrid';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal'

class Calendar extends React.Component{
    constructor(props) {
        super(props);
        
        this.state = {
          showModal: false,
          lectureTitle: undefined,
          lectureBeginTime: undefined,
          lectureEndTime: undefined,
          lectureDate: undefined,
          lectureId: undefined,
        };
      }

    closeModal = () => {
        this.setState({showModal: false});
    }

    render(){
        return <>
            <FullCalendar
                plugins={[ timeGridPlugin ]}
                initialView="timeGridWeek"
                events={this.props.events}
                eventClick={this.handleEventClick}
                contentHeight="auto"
                slotMinTime="08:00:00"
					      slotMaxTime="20:00:00"
            />
            <ModalLecture 
            show={this.state.showModal} 
            closeModal = {this.closeModal} 
            lectureTitle = {this.state.lectureTitle}
            lectureDate = {this.state.lectureDate}
            lectureBeginTime = {this.state.lectureBeginTime}
            lectureEndTime = {this.state.lectureEndTime}
            lectureId = {this.state.lectureId}
            bookASeat = {this.props.bookASeat}
            ></ModalLecture>
        </>
    	}
    	
    	handleEventClick = (info) => {
        //not useful right now
        //here info.event is the event object (with id, title, ...)
        //console.log(info.event.id);
        this.setState({showModal: true});
        this.setState({lectureTitle: info.event.title});
        let beginTime = info.event.start.toISOString();
        let endTime = info.event.end.toISOString();
        this.setState({lectureBeginTime: beginTime.slice(11,16)});
        this.setState({lectureEndTime: endTime.slice(11,16)});
        this.setState({lectureDate: beginTime.slice(0,10)});
        this.setState({lectureId: info.event.id});
    }
}

function ModalLecture(props) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  
    return (
      <>
        <Modal
          show={props.show || show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Lecture booking</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p><b>Subject:</b> {props.lectureTitle}
            <br/>
            <b>Date:</b> {props.lectureDate}
            <br/>
            <b>Begin time:</b> {props.lectureBeginTime}
            <br/>
            <b>End time:</b> {props.lectureEndTime}</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={() => {props.bookASeat(props.lectureId, props.lectureDate, props.lectureBeginTime); props.closeModal();} }>Book</Button>
            <Button variant="secondary" onClick={() => props.closeModal()}>
              Dont' book
            </Button>            
          </Modal.Footer>
        </Modal>
      </>
    );
  }

export default Calendar;
