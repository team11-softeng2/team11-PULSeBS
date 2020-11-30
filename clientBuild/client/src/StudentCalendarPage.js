import React from 'react';
import Calendar from './Calendar.js';
import {Container, Alert, Row, Col} from 'react-bootstrap';
import Badge from 'react-bootstrap/Badge'

class StudentCalendarPage extends React.Component{
    constructor(props){
      super(props);

      this.state = { events: [] };
    }

    render(){
        return <>
        	<Container fluid>
        		<Row>
        			<Col className='col-4'/>
        			
        			<Col className='col-4'>
        				<Alert variant='info' className="text-center"> 
        					<h3>My lecture bookings:</h3>
							<Badge pill variant="primary">
								Bookable
							</Badge>{' '}
							<Badge pill variant="success">
								Booked
							</Badge>{' '}
							<Badge pill variant="danger">
								Full lectures
							</Badge>
        				</Alert>
        			</Col>
        			
        			<Col className='col-4'/>
        		</Row>
				<Calendar view={"student"} events={this.props.bookableLectures.concat(this.props.bookings).concat(this.props.fullLectures)} bookASeat = {this.props.bookASeat} deleteBooking = {this.props.deleteBooking}/>
        	</Container>
        </>
      }
}


export default StudentCalendarPage;
