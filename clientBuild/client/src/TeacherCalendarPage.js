import React from 'react';
import Calendar from './Calendar.js';
import {Container, Alert, Row, Col} from 'react-bootstrap';
import Badge from 'react-bootstrap/Badge'

class TeacherCalendarPage extends React.Component{
    constructor(props){
      super(props);
      this.state = { lectures: [] };
    }

    render(){
        return <>
        	<Container fluid>
        		<Row>
        			<Col className='col-4'/>
        			
        			<Col className='col-4'>
        				<Alert variant='info' className="text-center"> 
        					<h3>My lecture:</h3>
							<Badge pill variant="primary">
								In presence
							</Badge>{' '}
							<Badge pill variant="success">
								Online
							</Badge>
        				</Alert>
        			</Col>
        			
        			<Col className='col-4'/>
        		</Row>
				<Calendar view={"teacher"} events = {this.props.lectures}/>
        	</Container>
        </>
      }
}


export default TeacherCalendarPage;
