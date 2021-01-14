import React from "react";
import { Stepper, Step, StepLabel, StepContent, Button, Typography } from '@material-ui/core';
import Dropzone from "./Dropzone"
import Papa from 'papaparse';
import API from '../API';
import SetupResultModal from './SetupResultModal.js'
import ProgressBar from 'react-bootstrap/ProgressBar'

class SupportOfficerSetupPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            files: [],
            activeStep: 0,
            steps: [
                'Students', 'Professors', 'Courses', 'Schedule', 'Enrollemnt', 'Submit'
            ],
            showResultModal: false,
            setupResult: undefined,
            error: "",
            loading: undefined,
        };

        this.handleNext = this.handleNext.bind(this);
        this.handleBack = this.handleBack.bind(this);
        this.handleReset = this.handleReset.bind(this);

        //this.onFileAdded = this.onFileAdded.bind(this);
    }

    componentDidMount = () => {
    }

    handleNext() {
        this.setState(prevState => ({
            activeStep: prevState.activeStep + 1
        }), () => {
            //callback after successful state update
            if (this.state.activeStep === this.state.steps.length){
              //if the user clicked on Finish
              this.handleFinish();
            }
        });
        this.setState({error: ""});
    }

    handleFinish = async() => {
      try{
        //they have to be called one after the other otherwise the db has concurrency problems
        this.setState({loading: 0});
        await this.convertAndSendStudents(this.state.files[0]);
        this.setState({loading: 20});
        await this.convertAndSendTeachers(this.state.files[1]);
        this.setState({loading: 40});
        await this.convertAndSendCourses(this.state.files[2]);
        this.setState({loading: 60});
        await this.convertAndSendLectures(this.state.files[3]);
        this.setState({loading: 80});
        await this.convertAndSendClasses(this.state.files[4]);
        this.setState({loading: undefined});

        console.log('finished all api calls for the setup');
        this.setState({ showResultModal: true, setupResult: true });
      }
      catch(err){
        console.log('an error has occurred');
        console.log(err);
        this.setState({ showResultModal: true, setupResult: false });
      }
    }

    convertAndSendClasses = async(classesCSVFile) => {
      //console.log('calling classes')
      return new Promise((resolve, reject) => {
        Papa.parse(classesCSVFile, {
            complete: (res) => {
                //console.log(res.data);
                var jsonToSend = this.csvDataToJSON(res.data);

                API.setUpClasses(jsonToSend)
                .then((res2) => {
                    console.log('set up classes successful');
                    resolve(true);
                })
                .catch((err) => {
                    console.log('error in setting up classes');
                    console.log(err);
                    reject(false);
                });
            }
        });
      })
    }

    convertAndSendStudents = async(studentsCSVFile) => {
      //console.log('calling students')
      return new Promise((resolve, reject) => {
        Papa.parse(studentsCSVFile, {
            complete: (res) => {
                //console.log(res.data);
                var jsonToSend = this.csvDataToJSON(res.data);

                API.setUpStudents(jsonToSend)
                .then((res2) => {
                    console.log('set up students successful');
                    resolve(true);
                })
                .catch((err) => {
                    console.log('error in setting up students');
                    console.log(err);
                    reject(false);
                });
            }
        });
      })
    }

    convertAndSendLectures = async(lecturesCSVFile) => {
      //console.log('calling lectures')
      return new Promise((resolve, reject) => {
        Papa.parse(lecturesCSVFile, {
            complete: (res) => {
                //console.log(res.data);
                var jsonToSend = this.csvDataToJSON(res.data);

                API.setUpLectures(jsonToSend)
                .then((res2) => {
                    console.log('set up lectures successful');
                    resolve(true);
                })
                .catch((err) => {
                    console.log('error in setting up lectures');
                    console.log(err);
                    reject(false);
                });
            }
        });
      })
    }

    convertAndSendCourses = async(coursesCSVFile) => {
      //console.log('calling courses')
      return new Promise((resolve, reject) => {
        Papa.parse(coursesCSVFile, {
            complete: (res) => {
                //console.log(res.data);
                var jsonToSend = this.csvDataToJSON(res.data);
                API.setUpCourses(jsonToSend)
                .then((res2) => {
                    console.log('set up Courses successful');
                    resolve(true);
                })
                .catch((err) => {
                    console.log('error in setting up Courses');
                    console.log(err);
                    reject(false);
                });
            }
        });
      })
    }

    convertAndSendTeachers = async(teachersCSVFile) => {
      //console.log('calling teachers')
      return new Promise((resolve, reject) => {
        Papa.parse(teachersCSVFile, {
            complete: (res) => {
                //console.log(res.data);
                var jsonToSend = this.csvDataToJSON(res.data);
                API.setUpProfessors(jsonToSend)
                .then((res2) => {
                    console.log('set up teachers successful');
                    resolve(true);
                })
                .catch((err) => {
                    console.log('error in setting up teachers');
                    console.log(err);
                    reject(false);
                });
            }
        });
      })
    }

    csvDataToJSON = (csvData) => {
      //first row are the fields
      var fields = csvData[0];
      //remove the first row so to only have data rows
      var data = csvData.slice(1, csvData.length);

      var jsonToSend = [], currentObj;
      var i, j;

      //for each data row, construct an object with all the
      //fields specified in the first line of the file
      for(i = 0; i < data.length; i++){
        currentObj = {};
        for(j = 0; j < fields.length; j++){
          currentObj[fields[j]] = data[i][j];
        }
        jsonToSend.push(currentObj);
      }

      return jsonToSend;
    }

    handleBack() {
        this.setState(prevState => ({
            activeStep: prevState.activeStep - 1
        }));
        this.setState({error: ""});
    }

    handleReset() {
        this.setState({
            activeStep: 0
        });
    }

    getStepContent(stepIndex) {
        switch (stepIndex) {
            case 0:
                return `upload the students csv file.`;
            case 1:
                return `upload the professors csv file.`;
            case 2:
                return `upload the courses csv file.`;
            case 3:
                return `upload the schedule csv file.`;
            case 4:
                return `upload the enrollment csv file.`;
            case 5:
                return `check the files and submit.`;
            default:
                return <div>Unknown stepIndex</div>;
        }
    }

    onFileAdded = async (file) => {
        const activeStep = this.state.activeStep;
        /* replace or add the file */
        let actual = this.state.files;
        let res = actual.find((f) => f.name === file.name);
        if(res !== undefined) {
            await this.setState({error: "Error: file already uploaded!"});
        } else {
            actual[activeStep] = file;
            await this.setState({error: ""});
            this.setState({files: actual});
        }
    }

    setError = (error) => {
        this.setState({error: error});
    };

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
                            error={this.state.error}
                            setError={this.setError}
                            onFileAdded={this.onFileAdded}
                            disabled={this.state.activeStep === this.state.steps.length-1}
                            file={this.state.files[this.state.activeStep]}
                        />
                    </div>
                    <div style={{ marginLeft:"32px" }}>
                        <h5>File uploaded</h5>
                        {this.state.files.map(file => {
                            return (
                                <div key={file.name} style={{ height: "30px", padding: "5px", overflow: "hidden" }}>
                                    <span style={{ marginBottom: "5px", fontSize: "16px", color: "#555", textOverflow: "ellipsis", overflow: "hidden" }}>{this.state.steps[this.state.files.indexOf(file)]}: {file.name}</span>
                                </div>
                            );
                        })}
                        {this.state.loading === undefined ? null : 
                        <>
                        Loading:
                        <ProgressBar animated now={this.state.loading} />
                        </>
                        }
                    </div>

                </div>
            </div>

            <SetupResultModal show={this.state.showResultModal} res={this.state.setupResult}/>
        </>
    }

}

export default SupportOfficerSetupPage;
