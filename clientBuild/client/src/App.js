import React from 'react';
import API from './API';
import LoginForm from './LoginForm';
import TopBar from './TopBar';
import HomeTeacher from './HomeTeacher'
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';
import './App.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import LecturesList from './LecturesList';
import ActiveBookings from './ActiveBookings';

class App extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      loggedin: false,
      userName: undefined,  //Nome dell'utente loggato
      userRole: undefined,  //Ruolo dell'utente loggato
      bookableLectures: [],
    };
  }

  componentDidMount() {
    
  }

  setLoggedIn = (user) => {
    this.setState({loggedin: true});
    this.setState({userName: user.name});
    this.setState({userRole: user.role});
    this.setState({userId: user.idUser});
    API.getBookableStudentLectures(user.idUser).then((lectures) => {
      this.setState({bookableLectures: lectures});
    });
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

  bookASeat = (lectureId, date, beginTime) => {
    let composedDate = date + " " + beginTime;
    API.bookASeat(lectureId, this.state.userId, composedDate).then(() => {
      //Aggiorno la lista delle lezioni prenotabili dallo studente
      API.getBookableStudentLectures(this.state.userId).then((lectures) => {
        this.setState({bookableLectures: lectures});
      });
    })
    .catch(() => {
      console.log("Error in newBooking function");
    });
  }
  

  render(props) {
    return (
      <Router>
        <TopBar loggedin = {this.state.loggedin} logout={this.logout} ></TopBar>
        <Switch>
          
          <Route path="/student">
            {(this.state.loggedin === true && this.state.userRole === "student") ? 
              <Container>
                <Row>
                  <LecturesList lectures={this.state.bookableLectures} bookASeat = {this.bookASeat}></LecturesList>
                </Row>
                <Row>
                  <ActiveBookings></ActiveBookings>
                </Row>
              </Container>
                :
                <Redirect to="/"></Redirect>
            }
          </Route>

          <Route path="/teacher">
            {(this.state.loggedin === true && this.state.userRole === "teacher") ? 
                <HomeTeacher userName={this.state.userName}/>
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

