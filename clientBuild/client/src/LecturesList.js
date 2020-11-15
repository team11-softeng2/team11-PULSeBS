import React from 'react';
import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';

class LecturesList extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        //Ordino le lezioni in base alla data
        var lectures = this.props.lectures.sort((a,b) => {
            if(a.date > b.date) return 1;
            else if(a.date < b.date) return -1;
            else return 0;
        });

        return (<> 
        <Container fluid>           
            <h2>Lectures available</h2>
            <Table bordered striped>
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
                    {lectures.length === 0 ? null : lectures.map((item) => <LectureRow key={item.idLesson} lecture={{...item}} bookASeat = {this.props.bookASeat}/> ) } 
                </tbody>
            </Table>   
                {lectures.length === 0 ? <Alert variant={"warning"}>No lectures available</Alert> : null}   
            </Container>
            </>
        )
    }
}

function LectureRow(props) {
    return (
        <tr>
            <td>{props.lecture.name}</td>
            <td>{props.lecture.date}</td>
            <td>{props.lecture.beginTime}</td>
            <td>{props.lecture.endTime}</td>
            <td><Button onClick={() => {console.log("Prenota " + props.lecture.idLesson); props.bookASeat(props.lecture.idLesson, props.lecture.date, props.lecture.beginTime);} }>Book</Button></td>
        </tr>
    
    )
}

export default LecturesList