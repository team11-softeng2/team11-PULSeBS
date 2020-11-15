import React from 'react';
import { Container, Table } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';

import { FaTrash } from 'react-icons/fa';

class ActiveBookings extends React.Component {

    componentDidMount() {
    }

    render() {
        // sort bookings by date 
        var bookings = this.props.bookings.sort((a, b) => {
            if(a.date === b.date)  {
                if(a.beginTime < b.beginTime) return -1;
                else if(a.beginTime > b.beginTime) return 1;
                else return 0;
            } else if(a.date < b.date) return -1;
            else return 1;
        });

        //console.dir("bookings: " + JSON.stringify(bookings));

        return(
        <>
            <Container fluid>
                <h2>Active bookings</h2>
                <Table bordered striped hover>
                    <thead>
                        <tr>
                            <th>Subject</th>
                            <th>Date</th>
                            <th>Begin time</th>
                            <th>End time</th>
                            <th>Action</th>                        
                        </tr>
                    </thead>
                    <tbody>
                        {bookings.lenght === 0 ? null : bookings.map((item) => <BookingRow key={item.idLesson} booking={{...item}} cancelBooking = {this.props.cancelBooking}/> ) } 
                    </tbody>
                </Table>
                {bookings.length === 0 ? <Alert variant={"warning"}>No booking available</Alert> : null}   
            </Container>
        </>
        )
    }
}

function BookingRow(props) {
    return (
        <tr>
            <td>{props.booking.name}</td>
            <td>{props.booking.date}</td>
            <td>{props.booking.beginTime}</td>
            <td>{props.booking.endTime}</td>
            <td>
                <Button 
                    variant="danger"
                    onClick={() => {console.log("Cancel " + props.booking.idLesson); /*props.cancelBooking(props.booking.idLesson, props.booking.date, props.booking.beginTime);*/} }
                >
                    <FaTrash/>&nbsp; Cancel
                </Button>
            </td>
        </tr>
    
    )
}

export default ActiveBookings;