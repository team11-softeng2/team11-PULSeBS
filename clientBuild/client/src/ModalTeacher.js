import React from 'react';
import {Container, Alert, Row, Col} from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import Tooltip from 'react-bootstrap/Tooltip';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';

class ModalTeacher extends React.Component{

    render(){
        if(this.props.show === true) {
            return <>
            <Modal
            show={this.props.show}
            onHide={() => this.props.closeModal()}
            backdrop="static"
            keyboard={false}
            data-testid="modal-test"
            >
            <Modal.Header closeButton>
                <Modal.Title>Lecture information</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Container>
                    <Row>
                        <Col>
                            <p><b>Subject:</b> {this.props.lectureTitle}
                            <br/>
                            <b>Date:</b> {this.props.lectureDate}
                            <br/>
                            <b>Begin time:</b> {this.props.lectureBeginTime.slice(0,5)}
                            <br/>
                            <b>End time:</b> {this.props.lectureEndTime.slice(0,5)}</p>
                        </Col>
                        <Col>
                            <Row>
                                {this.props.lectureColor === "" ? 
                                    <>
                                    {
                                        this.props.dateStart.getTime() - Date.now() < 1800000 ? 
                                        <OverlayTrigger
                                        placement="right"
                                        delay={{ show: 250, hide: 400 }}
                                        overlay={<Tooltip id="tooltip">Too late to change.</Tooltip>}
                                        >
                                            <div style={{display: 'inline-block', cursor: 'not-allowed'}}>
                                            <Button data-testid="changeNo-button" className="ModalTeacherButton" style={{ pointerEvents: 'none' }} >Change to online</Button>
                                            </div>
                                        </OverlayTrigger>
                                        :
                                        <Button onClick={() => {this.props.changeToOnline(this.props.elementId); this.props.closeModal();} } data-testid="change-button" className="ModalTeacherButton" >Change to online</Button>
                                    }
                                    </>
                                :
                                null
                                }
                                
                            </Row>
                            <Row>
                                {this.props.dateStart.getTime() - Date.now() < 3600000 ? 
                                    <OverlayTrigger
                                    placement="right"
                                    delay={{ show: 250, hide: 400 }}
                                    overlay={<Tooltip id="tooltip">Too late to delete.</Tooltip>}
                                    >
                                        <div style={{display: 'inline-block', cursor: 'not-allowed'}}>
                                        <Button variant="danger" className="ModalTeacherButton" data-testid="deleteNo-button" style={{ pointerEvents: 'none' }}>Delete lecture</Button>
                                        </div>
                                    </OverlayTrigger>
                                    :
                                    <Button variant="danger" className="ModalTeacherButton" onClick={() => {this.props.deleteLecture(this.props.elementId); this.props.closeModal(); } } data-testid="delete-button">Delete lecture</Button>
                                }
                            </Row>
                        </Col>
                    </Row>
                    {this.props.lectureColor === "" ?
                        <Row>
                            {this.props.studentList.length === 0 ? 
                            <Alert variant="secondary">
                                No students booked.
                            </Alert>
                        :
                            <Accordion data-testid="studentList" className={"ModalStudentsList"}><div className="mb-1">
                                <Card>
                                    <Accordion.Toggle as={Card.Header} eventKey={this.props.elementId}>
                                    Booked students{" "}
                                    <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-caret-down-fill arrowIcon" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M7.247 11.14L2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"/>
                                    </svg>
                                    </Accordion.Toggle>
                                    <Accordion.Collapse eventKey={this.props.elementId}>
                                    <Card.Body>{this.props.studentList.map((s) => <StudentRow key={s.idUser} name={s.name}/>)  }</Card.Body>
                                    </Accordion.Collapse>
                                </Card></div>
                            </Accordion>
                        }
                        </Row>
                        :
                        null
                    }
                    
                </Container>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => this.props.closeModal()} data-testid="close-button">
                Close
                </Button>            
            </Modal.Footer>
            </Modal>
        </>
        } else {
            return <></>
        }
      }
}

function StudentRow(props) {
    return <div>{props.name}</div>
}

export default ModalTeacher;
