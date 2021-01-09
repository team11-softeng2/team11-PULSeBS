import React from "react";
import { Container, Row, Col, Button, Table, Form } from 'react-bootstrap';
import { Link } from "react-router-dom";
import API from '../API';

class BookableLecturesPage extends React.Component {
    constructor(props){
      super(props);
  
      this.state = { };
  
    }

    render(){
        return <div className="text-center mt-5 p-5 mb-5">
            <p>Select an academic year:</p>
        </div>
    }
}

export default BookableLecturesPage;