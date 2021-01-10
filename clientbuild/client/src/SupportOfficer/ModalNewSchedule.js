import React from "react";
import { Modal, Dropdown, Container, Row, Col } from 'react-bootstrap';
import TimePicker from 'react-bootstrap-time-picker';

class ModalNewSchedule extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      selectedDay: undefined,
      beginTime: undefined,
      endTime: undefined
    };
  }

  render(){
    return <>
      <Modal show={this.props.show} onHide={ () => this.props.hide() } >
        <Modal.Header closeButton>
          <Modal.Title>Define new lecture</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Container fluid>
            <Row>
              <Col>
                <p><b>Subject:</b> {this.props.subject}
                <br/>
                </p>
              </Col>
            </Row>

            <Row className='mt-2'>
              <Col className='col-1'>
                <b>Day:</b>
              </Col>

              <Col>
                <Dropdown>
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
              <Col className='col-4'>
                <b>Begin time:</b>
              </Col>

              <Col className='col-5'>
                <TimePicker
                  start='08:00'
                  end='20:00'
                  step={30}
                  value={this.state.beginTime === undefined ? '08:00' : this.state.beginTime}
                  format={24}
                  onChange={this.handleChangeBeginTime} />
              </Col>
            </Row>

            <Row className='mt-2'>
              <Col className='col-4'>
                <b>End time:</b>
              </Col>

              <Col className='col-5'>
                <TimePicker
                  start={this.getAvailableStartTime()}
                  end='20:00'
                  step={30}
                  value={this.state.endTime === undefined ? '08:00' : this.state.endTime}
                  format={24}
                  onChange={this.handleChangeEndTime} />
              </Col>
            </Row>


          </Container>
        </Modal.Body>

      </Modal>
    </>
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
