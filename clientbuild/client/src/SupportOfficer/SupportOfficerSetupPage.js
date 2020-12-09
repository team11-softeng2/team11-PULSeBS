import React from "react";
import Uploader from "./Uploader";
import { Stepper, Step, StepLabel, Button, Typography } from '@material-ui/core';
import { Radio, RadioGroup, FormControlLabel, FormControl, FormLabel } from '@material-ui/core/';

class SupportOfficerSetupPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedFile: null,
            activeStep: 0,
            steps: [
                'Choose the csv file', 'Select the file type', 'Check information and submit'
            ]
        };

        this.handleNext = this.handleNext.bind(this);
        this.handleBack = this.handleBack.bind(this);
        this.handleReset = this.handleReset.bind(this);
    }

    componentDidMount = () => {
    }

    handleNext() {
        this.setState(prevState => ({
            activeStep: prevState.activeStep + 1
        }));
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
                return <Uploader />;
            case 1:
                return <>
                    <FormControl component="fieldset">
                        <FormLabel component="legend">File Type</FormLabel>
                        <RadioGroup aria-label="fileType" name="fileType" value={this.state.fileType} onChange={this.handleChange}>
                            <FormControlLabel value="students" control={<Radio color="primary" />} label="Students" />
                            <FormControlLabel value="teachers" control={<Radio color="primary" />} label="Teachers" />
                            <FormControlLabel value="courses" control={<Radio color="primary" />} label="Courses" />
                            <FormControlLabel value="lectures" control={<Radio color="primary" />} label="Lectures" />
                            <FormControlLabel value="classes" control={<Radio color="primary" />} label="Classes" />
                        </RadioGroup>
                    </FormControl>
                </>
            case 2:
                return <div>THIRD</div>;
            default:
                return <div>Unknown stepIndex</div>;
        }
    }

    render() {
        return <>
            <div className="h-100 w-100 p-5">
                <Stepper activeStep={this.state.activeStep} alternativeLabel>
                    {this.state.steps.map((label) => (
                        <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>
                <div>
                    {this.state.activeStep === this.state.steps.length ? (
                        <div>
                            <Typography>All steps completed</Typography>
                            <Button onClick={this.handleReset}>Reset</Button>
                        </div>
                    ) : (
                            <div>
                                <div className="p-5 d-flex justify-content-center" style={{height: "600px"}} >
                                    {this.getStepContent(this.state.activeStep)}
                                </div>
                                <div>
                                    <Button
                                        disabled={this.state.activeStep === 0}
                                        onClick={this.handleBack}
                                    >
                                        Back
                                    </Button>
                                    <Button variant="contained" color="primary" onClick={this.handleNext}>
                                        {this.setState.activeStep === this.state.steps.length - 1 ? 'Finish' : 'Next'}
                                    </Button>
                                </div>
                            </div>
                        )}
                </div>
            </div>
        </>
    }

}

export default SupportOfficerSetupPage;
