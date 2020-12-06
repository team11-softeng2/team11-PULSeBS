import React from 'react';
import { Row, Container, Button, Col, Card } from "react-bootstrap";

class SupportOfficerPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

        };
    }

    componentDidMount = () => {

    }

    render() {
        return <>
            <div class="text-center bg-light p-5 mb-5">
                <h1>Welcome!</h1>
                <p>Select the service you want to perform.</p>
            </div>
            
            <Container fluid>
            <Row>
                    <Service service={{ name: "prova", description: "prova description" }} key={1}></Service>
                </Row>
            </Container>
        </>
    }

}

const Service = (props) => {

    let { service } = props;

    return <Col xs="12" sm="6" md="4" lg="3">
        <Card>
            <Card.Body>
                <Card.Title>{service.name}</Card.Title>
                <Card.Text>{service.description}</Card.Text>
                <Button variant="primary">BUTTON</Button>
            </Card.Body>
        </Card>
    </Col>
}

export default SupportOfficerPage;