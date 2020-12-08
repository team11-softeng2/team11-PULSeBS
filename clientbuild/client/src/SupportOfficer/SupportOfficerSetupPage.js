import React from "react";
import { Card } from "react-bootstrap";
import Uploader from "./Uploader";

class SupportOfficerSetupPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedFile: null
        };
    }

    componentDidMount = () => {
    }

    render() {
        return <>
            <div className="p-5">
                <Uploader />
            </div>
        </>
    }
}

export default SupportOfficerSetupPage;
