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

  bookASeat = (lectureId, date, beginTime) => {
    let composedDate = date + " " + beginTime;
    API.bookASeat(lectureId, this.state.userId, composedDate).then(() => {
      //Aggiorno la lista delle lezioni prenotabili dallo studente
      this.getBookableStudentLectures(this.state.userId);
      this.getStudentBookings(this.state.userId);
    })
    .catch(() => {
      console.log("Error in newBooking function");
    });
  }
  
  deleteBooking = (lectureId) => {
    API.deleteBooking(lectureId).then(() => {
      this.getStudentBookings(this.state.userId);
      this.getBookableStudentLectures(this.state.userId);
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
                }})} 
                bookASeat = {this.bookASeat}
                deleteBooking = {this.deleteBooking}
                bookings = {this.state.bookings.map((l) => {
                  return {
                    id: l.idBooking,
                    title: l.name,
                    start: new Date(l.date + "T" + l.beginTime),
                    end: new Date(l.date + "T" + l.endTime),
                    color:"green"
                  }})} />
                :
              <Redirect to="/"></Redirect>
            }
          </Route>

          <Route path="/teacher/historicalData">
            {(this.state.loggedin === true && this.state.userRole === "teacher") ? 
                <TeacherHistoricalDataPage/>
                :
                <Redirect to="/"></Redirect>
            }
          </Route>

          <Route path="/teacher">
            {(this.state.loggedin === true && this.state.userRole === "teacher") ? 
                <TeacherCalendarPage lectures={this.state.teacherLectures.map((l) => {
                  return {
                    id: l.idLesson,
                    title: l.idCourse,
                    start: new Date(l.date + "T" + l.beginTime),
                    end: new Date(l.date + "T" + l.endTime),
                  }
                })}
                deleteLecture = {this.deleteLecture}
                changeToOnline = {this.changeToOnline}
                ></TeacherCalendarPage>
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

