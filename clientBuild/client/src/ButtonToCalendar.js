import React from 'react';
import Button from 'react-bootstrap/Button';
import {Link} from 'react-router-dom';

class ButtonToCalendar extends React.Component{
	constructor(props){
		super(props);
		
		this.state = { onCalendarPage: false };
	}

    render(){
    	return <>
    		{
    			this.state.onCalendarPage &&
  
				<Link to="/student" className="ml-auto">
					<Button onClick={this.handleClick}>Student Homepage</Button>
				</Link>
    		}
    	
    		{
    			!this.state.onCalendarPage &&
  
				<Link to="/studentCalendar" className="ml-auto">
					<Button onClick={this.handleClick}>My Calendar</Button>
				</Link>
    		}
    	</>
    }
    
    handleClick = () => {
    	this.setState({ onCalendarPage: !this.state.onCalendarPage });
    }
}

export default ButtonToCalendar;
