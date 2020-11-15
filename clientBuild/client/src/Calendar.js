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
          selectedLecture: undefined,
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
            />
            <ModalLecture show={this.state.showModal} closeModal = {this.closeModal} lecture = {this.state.selectedLecture}></ModalLecture>
        </>
    	}
    	
    	handleEventClick = (info) => {
        //not useful right now
        //here info.event is the event object (with id, title, ...)
        //console.log(info.event.id);
        this.setState({showModal: true});
        this.setState({selectedLecture: info.event.title});
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
            <p>Do you want to book {props.lecture} lecture?</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={() => props.closeModal()}>Book</Button>
            <Button variant="secondary" onClick={() => props.closeModal()}>
              Dont' book
            </Button>            
          </Modal.Footer>
        </Modal>
      </>
    );
  }

export default Calendar;
