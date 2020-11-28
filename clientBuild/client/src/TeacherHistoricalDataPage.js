import React from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import ApexChart from "react-apexcharts";
import TeacherDataSelectionList from './TeacherDataSelectionList';


var past_bookings = [
    {
        'course': 'Software Engineering II',
        'numBookings': 35,
        'datetime': new Date('2020-11-26T14:30:00')   //start time
    },
    {
        'course': 'Software Engineering II',
        'numBookings': 30,
        'datetime': new Date('2020-11-25T14:30:00')   
    },
    {
        'course': 'Software Engineering II',
        'numBookings': 20,
        'datetime': new Date('2020-11-24T14:30:00')   
    },
    {
        'course': 'Web applications I',
        'numBookings': 60,
        'datetime': new Date('2020-11-23T14:30:00')
    },
    {
        'course': 'Web applications I',
        'numBookings': 65,
        'datetime': new Date('2020-11-24T14:30:00')   
    },
    {
        'course': 'Web applications I',
        'numBookings': 55,
        'datetime': new Date('2020-11-25T14:30:00')   
    }
];


class TeacherHistoricalDataPage extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            currentDetail: 'Lecture',
            detailLevels: ['Lecture', 'Week', 'Month'],
            courses: [],
            currentCourse: undefined,
            series: undefined
        };
    }

    render(){
        return <>
            <Container fluid>
                <Row>
                    <Col className='col-2 mt-3'>
                        <TeacherDataSelectionList 
                            options={this.state.detailLevels} 
                            currentActive={this.state.currentDetail}
                            handleClick={this.handleNewDetailClick}/>
                    </Col>

                    <Col className='col-8 mt-3'>
                        {this.state.series != undefined && <ApexChart options={this.state.options} series={this.state.series}/>}
                    </Col>

                    <Col className='col-2 mt-3'>
                        <TeacherDataSelectionList 
                            options={this.state.courses} 
                            currentActive={this.state.currentCourse}
                            handleClick={this.handleNewCourseClick}/>
                    </Col>
                </Row>
            </Container>
        </>
    }

    componentDidMount = () => {
        //this should be an api call
        this.setState({ courses: ['Software Engineering II'], currentCourse: 'Software Engineering II' });

        this.updateGraphData(
            'Bookings',
            'Number of bookings per lecture',
            [28, 15, 20, 35], 
            ['SE II - 24/11 14:30', 'SE II - 25/11 14:30', 'SE II - 26/11 11:30', 'SE II - 26/11 14:30']
            );
    }

    handleNewDetailClick = (event) => {
        this.setState({ currentDetail: event.currentTarget.innerText });

        if(event.currentTarget.innerText === 'Lecture'){
            this.updateGraphData(
                'Bookings',
                'Number of bookings per lecture',
                [28, 15, 20, 35], 
                ['SE II - 24/11 14:30', 'SE II - 25/11 14:30', 'SE II - 26/11 11:30', 'SE II - 26/11 14:30']
                );
        }
        else if(event.currentTarget.innerText === 'Week'){
            this.updateGraphData(
                'Bookings',
                'Average number of bookings per single lecture per week',
                [40.5, 32.8, 28.7, 25.1], 
                ['2/11 - 6/11', '9/11 - 13/11', '16/11 - 20/11', '23/11 - 27/11']
                );
        }
        else if(event.currentTarget.innerText === 'Month'){
            this.updateGraphData(
                'Bookings',
                'Average number of bookings per single lecture per month',
                [40.5, 42.8, 45.7, 60.1], 
                ['Oct 2020', 'Nov 2020', 'Dec 2020', 'Jan 2021']
                );
        }
    }

    handleNewCourseClick = (event) => {
        this.setState({ currentCourse: event.currentTarget.innerText });
    }

    updateGraphData = (yname, title, ydata, xlabel) => {
        this.setState({
            series: [{
                name: yname,
                data: ydata
            }],
            options: {
              chart: {
                height: 350,
                type: 'line',
                zoom: {
                  enabled: false
                }
              },
              dataLabels: {
                enabled: false
              },
              stroke: {
                curve: 'straight'
              },
              title: {
                text: title,
                align: 'center'
              },
              grid: {
                row: {
                  colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
                  opacity: 0.5
                },
              },
              xaxis: {
                categories: xlabel,
              }
            }
        });
    }
}

export default TeacherHistoricalDataPage;