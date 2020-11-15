import React from 'react';
import Calendar from './Calendar.js';
import {Container, Alert, Row, Col} from 'react-bootstrap';

var events = [
    {
      id: 1,
      title: 'Software Engineering II',
      start: new Date('2020-11-16T11:30:00'),
      end: new Date('2020-11-16T13:00:00')
    },
    {
        id: 2,
        title: 'Architetture',
        start: new Date('2020-11-16T16:00:00'),
        end: new Date('2020-11-16T19:00:00')
      },
      {
        id: 3,
        title: 'Cloud Computing',
        start: new Date('2020-11-17T08:30:00'),
        end: new Date('2020-11-17T11:30:00')
      },
      {
        id: 4,
        title: 'Information Systems',
        start: new Date('2020-11-17T13:00:00'),
        end: new Date('2020-11-17T14:30:00')
      },
      {
        id: 5,
        title: 'Information Systems Security',
        start: new Date('2020-11-17T16:00:00'),
        end: new Date('2020-11-17T17:30:00')
      }
  ] ;

class StudentCalendarPage extends React.Component{
    render(){
        return <>
        	<Container fluid>
        		<Row>
        			<Col className='col-4'/>
        			
        			<Col className='col-4'>
        				<Alert variant='success' className="text-center">
        					<h3>My lecture bookings:</h3>
        				</Alert>
        			</Col>
        			
        			<Col className='col-4'/>
        		</Row>
            	<Calendar events={events}/>
        	</Container>
        </>
    	}
}


export default StudentCalendarPage;
