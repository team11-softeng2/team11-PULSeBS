import React from 'react';
import Calendar from './Calendar.js';
import {Container, Alert, Row, Col} from 'react-bootstrap';

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
        				<Alert variant='success' className="text-center">
        					<h3>My lecture bookings:</h3>
        				</Alert>
        			</Col>
        			
        			<Col className='col-4'/>
        		</Row>
            	<Calendar events={this.state.events}/>
        	</Container>
        </>
      }
      
      componentDidMount = () => {
      		this.lecturesToEvents();
      }
      
      //this converts the prop bookableLectures to events for the calendar
      lecturesToEvents = () => {
      		var events = [];
      		
      		var i;
      		for(i = 0; i < this.props.bookableLectures.length; i++){
      			var date = this.props.bookableLectures[i].date;
      			var beginTime = this.props.bookableLectures[i].beginTime;
      			var endTime = this.props.bookableLectures[i].endTime;
      			
      			var eventObj = {
      				id: this.props.bookableLectures[i].idLesson,
					title: this.props.bookableLectures[i].name,
					start: new Date(date.concat('T').concat(beginTime)),
					end: new Date(date.concat('T').concat(endTime))
      			};
      			
      			events.push(eventObj);
      		}
      		
      		this.setState({ events: events });
      }
}


export default StudentCalendarPage;
