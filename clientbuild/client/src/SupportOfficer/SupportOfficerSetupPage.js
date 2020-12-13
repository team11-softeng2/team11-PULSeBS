import React from "react";
import { Stepper, Step, StepLabel, StepContent, Button, Typography } from '@material-ui/core';
import Dropzone from "./Dropzone"
import Papa from 'papaparse';
import API from '../API';

class SupportOfficerSetupPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            files: [],
            activeStep: 0,
            steps: [
                'Students', 'Teachers', 'Courses', 'Lectures', 'Classes', 'Submit'
            ]
        };

        this.handleNext = this.handleNext.bind(this);
        this.handleBack = this.handleBack.bind(this);
        this.handleReset = this.handleReset.bind(this);

        this.onFileAdded = this.onFileAdded.bind(this);
    }

    componentDidMount = () => {
    }

    handleNext() {
        this.setState(prevState => ({
            activeStep: prevState.activeStep + 1
        }), () => {
            //callback after successful state update
            Papa.parse(this.state.files[0], {
                complete: (res) => {
                    console.log(res.data);

                    API.setUpStudents(res.data)
                    .then((res) => {
                        console.log('set up students successful');
                    })
                    .catch((err) => {
                        console.log('error in setting up students');
                        console.log(err);
                    });
                }
            });
        });
    };

    handleBack() {
        this.setState(prevState => ({
            activeStep: prevState.activeStep - 1
        }));
    };

    handleReset() {
        this.setState({
            activeStep: 0
        });
    };

    getStepContent(stepIndex) {
        switch (stepIndex) {
            case 0:
                return `upload the students csv file.`;
            case 1:
                return `upload the teachers csv file.`;
            case 2:
                return `upload the courses csv file.`;
            case 3:
                return `upload the lectures csv file.`;
            case 4:
                return `upload the classes csv file.`;
            case 5:
                return `check the files and submit.`;
            default:
                return <div>Unknown stepIndex</div>;
        }
    }

    onFileAdded(file) {
        const activeStep = this.state.activeStep;
        /* replace or add the file */
        this.setState(prevState=> {
            for(let f of prevState.files) {
                /* check the new file is not present in files */ 
                if(f !== undefined && file.name === f.name) return ({});
            }
            prevState.files[activeStep] = file;
            return ({ files: prevState.files });
        })
    }

    render() {
        return <>
            <div className="d-flex align-items-center" style={{ height: "calc(100% - 56px" }}>
                <Stepper style={{ minWidth: "350px", marginLeft:"64px", marginRight:"128px" }} activeStep={this.state.activeStep} orientation="vertical">
                    {this.state.steps.map((label, index) => (
                        <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                            <StepContent>
                                <Typography>{this.getStepContent(index)}</Typography>
                                <div className="my-3">
                                    <div>
                                        <Button
                                            disabled={this.state.activeStep === 0}
                                            onClick={this.handleBack}
                                            style={{ marginRight:"8px"}}
                                        >
                                            Back
                                        </Button>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            disabled={this.state.files[this.state.activeStep] === undefined && this.state.files.length !== 5}
                                            onClick={this.handleNext}
                                            style={{ marginLeft:"8px"}}
                                        >
                                            {this.state.activeStep === this.state.steps.length - 1 ? 'Finish' : 'Next'}
                                        </Button>
                                    </div>
                                </div>
                            </StepContent>
                        </Step>
                    ))}
                </Stepper>

                <div className="w-100 d-flex align-items-center h-100" style={{ marginLeft:"128px", marginRigth:"64px" }}>
                    <div>
                        <Dropzone
                            onFileAdded={this.onFileAdded}
                            disabled={this.state.activeStep === this.state.steps.length-1}
                            file={this.state.files[this.state.activeStep]}
                        />
                    </div>
                    <div style={{ marginLeft:"32px" }}>
                        {this.state.files.map(file => {
                            return (
                                <div key={file.name} style={{ height: "50px", padding: "8px", overflow: "hidden" }}>
                                    <span style={{ marginBottom: "8px", fontSize: "16px", color: "#555", textOverflow: "ellipsis", overflow: "hidden" }}>{file.name}</span>
                                </div>
                            );
                        })}
                    </div>

                </div>
            </div>
        </>
    }

}

export default SupportOfficerSetupPage;
