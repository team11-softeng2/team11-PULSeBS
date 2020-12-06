import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

class ModalStudent extends React.Component{

    render(){
        if(this.props.show === true && this.props.lectureType === "fullLecture") {
            return <>
            <Modal
          show={this.props.show}
          onHide={() => this.props.closeModal()}
          backdrop="static"
          keyboard={false}
          data-testid="modal-test"
        >
          <Modal.Header closeButton>
            <Modal.Title>Lecture booking</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p><b>Subject:</b> {this.props.lectureTitle}
            <br/>
            <b>Date:</b> {this.props.lectureDate}
            <br/>
            <b>Begin time:</b> {this.props.lectureBeginTime.slice(0,5)}
            <br/>
            <b>End time:</b> {this.props.lectureEndTime.slice(0,5)}
            <br/>
            <b>Classroom:</b> {this.props.lectureClassroom}</p>
          </Modal.Body>
          
          <Modal.Footer>
            <Button variant="danger" data-testid="wait-button" onClick={() => {this.props.addToWaitingList(this.props.elementId); this.props.closeModal();} }>Wait</Button>
            <Button variant="secondary" data-testid="dontwait-button" onClick={() => this.props.closeModal()}>
              Don't wait
            </Button>            
          </Modal.Footer>          
        </Modal>
        </>
        } else if(this.props.show === true) {
          return <>
            <Modal
          show={this.props.show}
          onHide={() => this.props.closeModal()}
          backdrop="static"
          keyboard={false}
          data-testid="modal-test"
        >
          <Modal.Header closeButton>
            <Modal.Title>Lecture booking</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p><b>Subject:</b> {this.props.lectureTitle}
            <br/>
            <b>Date:</b> {this.props.lectureDate}
            <br/>
            <b>Begin time:</b> {this.props.lectureBeginTime.slice(0,5)}
            <br/>
            <b>End time:</b> {this.props.lectureEndTime.slice(0,5)}
            <br/>
            <b>Classroom:</b> {this.props.lectureClassroom}</p>
          </Modal.Body>
          {this.props.lectureColor === "green" ? 
          <Modal.Footer>
            <Button variant="danger" data-testid="delete-button" onClick={() => {this.props.deleteBooking(this.props.elementId); this.props.closeModal();} }>Delete</Button>
            <Button variant="secondary" data-testid="dontdelete-button" onClick={() => this.props.closeModal()}>
              Don't delete
            </Button>            
          </Modal.Footer>
          :
          <Modal.Footer>
            <Button variant="primary" data-testid="book-button" onClick={() => {this.props.bookASeat(this.props.elementId, this.props.lectureDate, this.props.lectureBeginTime); this.props.closeModal();} }>Book</Button>
            <Button variant="secondary" data-testid="dontbook-button" onClick={() => this.props.closeModal()}>
              Dont' book
            </Button>            
          </Modal.Footer>
          }
          
        </Modal>
        </>
        } else {
            return <></>
        }
      }
}

export default ModalStudent;
