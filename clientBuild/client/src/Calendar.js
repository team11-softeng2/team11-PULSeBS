import React from 'react';
import FullCalendar from '@fullcalendar/react'
import timeGridPlugin from '@fullcalendar/timegrid';

class Calendar extends React.Component{
    render(){
        return <>
            <FullCalendar
                plugins={[ timeGridPlugin ]}
                initialView="timeGridWeek"
                events={this.props.events}
                eventClick={this.handleEventClick}
            />
        </>
    	}
    	
    	handleEventClick = (info) => {
        //not useful right now
        //here info.event is the event object (with id, title, ...)
        //console.log(info.event.id);
    }
}

export default Calendar;
