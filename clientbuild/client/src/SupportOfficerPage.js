import React, { useState } from "react";
import { Row, Container, Button, Col, Card } from "react-bootstrap";
import { FaTools, FaEdit } from "react-icons/fa";

class SupportOfficerPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            options: [
                { id: 0, name: "Setup" },
                { id: 1, name: "Other operations..." },
                /*{ code: 3, name: "Other"},
                { code: 4, name: "Other" },
                { code: 5, name: "Other" },
                { code: 6, name: "Other" }, */
            ]
        };
    }

    componentDidMount = () => {

    }

    render() {
        return <>
            <div class="text-center mt-5 p-5 mb-5">
                <h1>Welcome!</h1>
                <p>Select the operation you want to perform.</p>
            </div>
            <Container fluid>
                <Row className="justify-content-center align-items-center">
                    {this.state.options.map((opt) => <CardButton key={opt.id} option={opt}></CardButton>)}
                </Row>
            </Container>
        </>
    }
}

const CardButton = (props) => {

    let { option } = props;
    const [hovered, setHovered] = useState(false);
    const toggleHoverTrue = () => setHovered(true);
    const toggleHoverFalse = () => setHovered(false);

    return <>
        <Col lg="2">
            <Card
                className={"text-center bg-white" + (hovered ? " shadow" : "")}
                style={{ cursor: "pointer" }}
                onMouseEnter={toggleHoverTrue}
                onMouseLeave={toggleHoverFalse}>
                <Card.Body> {
                    (option.id === 0) ?
                        <FaTools size={32} className="mt-3 mb-4" /> :
                        (option.id === 1) ?
                            <FaEdit size={32} className="mt-3 mb-4" /> :
                            // default
                            <FaEdit size={32} className="mt-3 mb-4" />}
                    <Card.Text>{option.name}</Card.Text>
                </Card.Body>
            </Card>
        </Col>
    </>
}

export default SupportOfficerPage;
