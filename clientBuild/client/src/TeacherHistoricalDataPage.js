import React from 'react';
import {ListGroup, Container, Row, Col} from 'react-bootstrap';

/*
var past_bookings = [
    {
        'course': 'Software Engineering II',
        'numBookings': 35,
        'datetime': new Date('2020-11-26T14:30:00')   //start time
    },
    {
        'course': 'Software Engineering II',
        'numBookings': 30,
        'datetime': new Date('2020-11-25T14:30:00')   
    }
];
*/

class TeacherHistoricalDataPage extends React.Component{
    constructor(props){
        super(props);

        this.state = { currentDetail: 'lecture' };
    }

    render(){
        return <>
            <Container fluid>
                <Row>
                    <Col className='col-2 mt-3'>
                        <ListGroup>
                            <ListGroup.Item 
                                action 
                                active={this.state.currentDetail === 'lecture'} 
                                onClick={() => { this.handleListClick('lecture'); }}
                            >
                                Lecture
                            </ListGroup.Item>

                            <ListGroup.Item 
                                action 
                                active={this.state.currentDetail === 'week'} 
                                onClick={() => { this.handleListClick('week'); }}
                            >
                                Week (average)
                            </ListGroup.Item>

                            <ListGroup.Item 
                                action 
                                active={this.state.currentDetail === 'month'} 
                                onClick={() => { this.handleListClick('month'); }}
                            >
                                Month (average)
                            </ListGroup.Item>
                        </ListGroup>
                    </Col>
                </Row>
            </Container>
        </>
    }

    handleListClick = (newDetail) => {
        this.setState({ currentDetail: newDetail });
    }
}

export default TeacherHistoricalDataPage;