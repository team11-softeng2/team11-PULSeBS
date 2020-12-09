import React from 'react';
import API from './API';
import LoginForm from './LoginForm';
import TopBar from './TopBar';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';
import './App.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import StudentCalendarPage from './StudentCalendarPage';
import TeacherCalendarPage from './TeacherCalendarPage';
import TeacherHistoricalDataPage from './TeacherHistoricalDataPage';
import BookingManagerPage from './BookingManagerPage';
import ContactTracingPage from './ContactTracingPage';
//import { buildEventApis, getRectCenter } from '@fullcalendar/react';

class App extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      loggedin: false,
      userName: undefined,  //Nome dell'utente loggato
      userRole: undefined,  //Ruolo dell'utente loggato
      userId: undefined,
      bookableLectures: [], //Lezioni prenotabili dallo studente
      bookings: [],         //Lezioni già prenotate dallo studente
      teacherLectures: [],  //Lezioni in presenza dell'insegnante
      fullLectures: [],     //Lezioni prenotabili dallo studente ma che sono piene
      waitingBookings: [],  //Lezioni per le quali lo studente si è messo in attesa
    };
  }

  componentDidMount() {
    
  }

  setLoggedIn = (user) => {
    this.setState({loggedin: true});
    this.setState({userName: user.name});
    this.setState({userRole: user.role});
    this.setState({userId: user.idUser});
    if(user.role === "student") {
      this.getBookableStudentLectures(user.idUser);
      this.getStudentBookings(user.idUser);
      this.getFullLectures(user.idUser);
      this.getWaitingBookings(user.idUser);
    } else if(user.role === "teacher") {
      this.getTeacherLectures(user.idUser);
    } else if(user.Role === "booking-manager") {
      // ...
    }
  }

  logout = () =>{
    API.logout()
    .then(() => {
      this.setState({loggedin: false});
    	console.log('logout success');
    })
    .catch(() => {
    	console.log('error during logout');
    });
  }

  getStudentBookings = (userId) => {
    API.getStudentBookings(userId).then((allBookings) => {
      this.setState({bookings: allBookings});
    });
  }

  getBookableStudentLectures = (userId) => {
    API.getBookableStudentLectures(userId).then((lectures) => {
      this.setState({bookableLectures: lectures});
    });
  }

  getTeacherLectures = (teacherId) => {
    API.getTeacherLectures(teacherId).then((lectures) => {
      this.setState({teacherLectures: lectures});
    });
  }

  getFullLectures = (studentId) => {
    API.getFullLectures(this.state.userId).then((lectures) => {
      this.setState({fullLectures: lectures});
    });
  }

  getWaitingBookings = (studentId) => {
    //console.log("API.getWaitingBookings mancante");
    //this.setState({waitingBookings: [{"idLesson":348,"name":"Gestione dei progetti","date":"2020-12-11","beginTime":"13:00","endTime":"16:00","idClassroom":"8","peopleWaiting":0}]});
    
    API.getWaitingBookings(this.state.userId).then((bookings) => {
      this.setState({waitingBookings: bookings});
    });
  }

  bookASeat = (lectureId, date, beginTime) => {
    let composedDate = date + " " + beginTime;
    API.bookASeat(lectureId, this.state.userId, composedDate).then(() => {
      //Aggiorno la lista delle lezioni prenotabili dallo studente
      this.getBookableStudentLectures(this.state.userId);
      this.getStudentBookings(this.state.userId);
      this.getFullLectures(this.state.userId);
      this.getWaitingBookings(this.state.userId);
    })
    .catch(() => {
      console.log("Error in newBooking function");
    });
  }
  
  deleteBooking = (lectureId) => {
    API.deleteBooking(lectureId).then(() => {
      this.getStudentBookings(this.state.userId);
      this.getBookableStudentLectures(this.state.userId);
      this.getFullLectures(this.state.userId);
      this.getWaitingBookings(this.state.userId);
    });
  }

  deleteLecture = (lectureId) => {
    API.deleteLecture(lectureId).then(() => {
      this.getTeacherLectures(this.state.userId);
    });
  }

  changeToOnline = (lectureId) => {
    API.changeToOnline(lectureId).then(() => {
      this.getTeacherLectures(this.state.userId);
    });
  }

  render(props) {
    return (
      <Router>
        <TopBar loggedin = {this.state.loggedin} logout={this.logout} role={this.state.userRole} userName = {this.state.userName}></TopBar>
        <Switch>
          
          <Route path="/student">
            {(this.state.loggedin === true && this.state.userRole === "student") ? 
              <StudentCalendarPage bookableLectures={this.state.bookableLectures.map((l) => {
                return {
                  id: l.idLesson,
                  title: l.name,
                  start: new Date(l.date + "T" + l.beginTime),
                  end: new Date(l.date + "T" + l.endTime),
                  type:"bookableLecture",
                  classroom: l.idClassroom,
                }})} 
                bookASeat = {this.bookASeat}
                deleteBooking = {this.deleteBooking}
                fullLectures = {this.state.fullLectures.map((l) => {
                  return {
                    id: l.idLesson,
                    title: l.name,
                    start: new Date(l.date + "T" + l.beginTime),
                    end: new Date(l.date + "T" + l.endTime),
                    color:"#dc3546",
                    type:"fullLecture",
                    classroom: l.idClassroom,
                    peopleWaiting: l.peopleWaiting,
                  }})}
                waitingBookings = {this.state.waitingBookings.map((l) => {
                  return {
                    id: l.idLesson,
                    title: l.name,
                    start: new Date(l.date + "T" + l.beginTime),
                    end: new Date(l.date + "T" + l.endTime),
                    color:"orange",
                    type:"waitingBooking",
                    classroom: l.idClassroom,
                    peopleWaiting: l.peopleWaiting,
                  }})}
                bookings = {this.state.bookings.map((l) => {
                  return {
                    id: l.idBooking,
                    title: l.name,
                    start: new Date(l.date + "T" + l.beginTime),
                    end: new Date(l.date + "T" + l.endTime),
                    color:"green",
                    type:"bookings",
                    classroom: l.idClassroom,
                  }})} />
                :
              <Redirect to="/"></Redirect>
            }
          </Route>

          <Route path="/teacher/historicalData">
            {(this.state.loggedin === true && this.state.userRole === "teacher") ? 
                <TeacherHistoricalDataPage teacherId={this.state.userId}/>
                :
                <Redirect to="/"></Redirect>
            }
          </Route>

          <Route path="/teacher">
            {(this.state.loggedin === true && this.state.userRole === "teacher") ? 
                <TeacherCalendarPage lectures={this.state.teacherLectures.map((l) => {
                  return {
                    id: l.idLesson,
                    title: l.courseName,
                    start: new Date(l.date + "T" + l.beginTime),
                    end: new Date(l.date + "T" + l.endTime),
                    color: l.inPresence === 1 ? "" : "green",
                    inPresence: l.inPresence,
                    classroom: l.idClassroom,
                  }
                })}
                deleteLecture = {this.deleteLecture}
                changeToOnline = {this.changeToOnline}
                ></TeacherCalendarPage>
                :
                <Redirect to="/"></Redirect>
            }
          </Route>

          <Route path="/booking-manager/contact-tracing">
            {(this.state.loggedin === true && this.state.userRole === "booking-manager") ? 
              <ContactTracingPage/>
                :
              <Redirect to="/"></Redirect>
            }
          </Route>

          <Route path="/booking-manager">
            {(this.state.loggedin === true && this.state.userRole === "booking-manager") ? 
              <BookingManagerPage/>
                :
              <Redirect to="/"></Redirect>
            }
          </Route>

          <Route path="/">
            <Row className="height-100">
              <Col sm={4}></Col>
              <Col sm={4} className="below-nav my-3">
                <LoginForm setLoggedIn={this.setLoggedIn}/>
              </Col>
            </Row>
          </Route>

        </Switch>
      </Router>
    );
  }
}

export default App;

