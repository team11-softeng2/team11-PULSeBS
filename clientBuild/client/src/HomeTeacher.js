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
        API.getTeacherLectures(this.props.userName).then((response) => {this.setState({lectures: response})});
    }

    render(){
    return <>
        <p>Hello, Teacher {this.props.userName}</p>
        <div className="row">    
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
        API.getBooking(this.props.key).then((response) => {this.setState({studentList: response})});
    }

    render(){return <Accordion>
        <Card>
            <Accordion.Toggle as={Card.Header} eventKey={this.props.key}>
            {this.props.lecture.name}
            </Accordion.Toggle>
            <Accordion.Collapse eventKey={this.props.key}>
            <Card.Body>{this.state.studentList.map((s) => <StudentRow key={s.idUser} name={s.name}/>)  }</Card.Body>
            </Accordion.Collapse>
        </Card>
    </Accordion>
    }
}

function StudentRow(props) {
    return <div>{props.name}</div>
}

export default HomeTeacher