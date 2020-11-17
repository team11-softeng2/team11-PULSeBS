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
          lectureBeginTime: "",
          lectureEndTime: "",
          lectureDate: undefined,
          elementId: undefined,
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
            elementId = {this.state.elementId}
            lectureColor = {this.state.lectureColor}
            bookASeat = {this.props.bookASeat}
            deleteBooking = {this.props.deleteBooking}
            ></ModalLecture>
        </>
    	}
    	
    	handleEventClick = (info) => {
        //not useful right now
        //here info.event is the event object (with id, title, ...)
        //console.log(info.event.id);
        this.setState({showModal: true});
        this.setState({lectureTitle: info.event.title});
        let beginTime = info.event.start.toLocaleTimeString();
        let endTime = info.event.end.toLocaleTimeString();
        let date = info.event.start.toISOString().slice(0,10);
        this.setState({lectureBeginTime: beginTime});
        this.setState({lectureEndTime: endTime});
        this.setState({lectureDate: date});
        this.setState({elementId: info.event.id});
        this.setState({lectureColor: info.event.backgroundColor});
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
            <b>Begin time:</b> {props.lectureBeginTime.slice(0,5)}
            <br/>
            <b>End time:</b> {props.lectureEndTime.slice(0,5)}</p>
          </Modal.Body>
          {props.lectureColor === "green" ? 
          <Modal.Footer>
            <Button variant="danger" onClick={() => {props.deleteBooking(props.elementId); props.closeModal();} }>Delete</Button>
            <Button variant="secondary" onClick={() => props.closeModal()}>
              Don't delete
            </Button>            
          </Modal.Footer>
          :
          <Modal.Footer>
            <Button variant="primary" onClick={() => {props.bookASeat(props.elementId, props.lectureDate, props.lectureBeginTime); props.closeModal();} }>Book</Button>
            <Button variant="secondary" onClick={() => props.closeModal()}>
              Dont' book
            </Button>            
          </Modal.Footer>
          }
          
        </Modal>
      </>
    );
  }

export default Calendar;
