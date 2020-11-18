import React from 'react';
import API from './API';
import Accordion from 'react-bootstrap/Accordion'
import Card from 'react-bootstrap/Card'

class HomeTeacher extends React.Component{

    constructor(props) {
        super(props);
        this.state = { lectures: []}
    }

    componentDidMount() {
        API.getTeacherLectures(this.props.userId).then((response) => {this.setState({lectures: response})});
    }

    render(){
    return <>
        <div className="mt-4 col-3 float-left text-center">Your scheduled in-presence lectures:</div>
        <div className="mt-3 col-6 float-left">    
            {this.state.lectures.map((l) => <LectureList key={l.idLesson} lecture={l}/>)}
        </div>
        </>
    }
}

class LectureList extends React.Component{
    constructor(props) {
        super(props);
        this.state= {studentList: []};
    }

    componentDidMount(){
        API.getBooking(this.props.lecture.idLesson).then((response) => {this.setState({studentList: response})});
    }

    render(){return <Accordion><div className="mb-1">
        <Card>
            <Accordion.Toggle as={Card.Header} eventKey={this.props.lecture.idLesson}>
            {this.props.lecture.courseName} : {this.props.lecture.date} {this.props.lecture.beginTime.slice(0,5)} - {this.props.lecture.endTime.slice(0,5)}
            </Accordion.Toggle>
            <Accordion.Collapse eventKey={this.props.lecture.idLesson}>
            <Card.Body>{this.state.studentList.map((s) => <StudentRow key={s.idUser} name={s.name}/>)  }</Card.Body>
            </Accordion.Collapse>
        </Card></div>
    </Accordion>
    }
}

function StudentRow(props) {
    return <div>{props.name}</div>
}

export default HomeTeacher