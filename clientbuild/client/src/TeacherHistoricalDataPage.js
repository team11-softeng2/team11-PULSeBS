import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import ApexChart from "react-apexcharts";
import TeacherDataSelectionList from './TeacherDataSelectionList';
import API from './API.js';
import moment from 'moment';

class TeacherHistoricalDataPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            currentDetail: 'Lecture',
            detailLevels: ['Lecture', 'Week', 'Month'],
            courses: [],
            currentCourse: undefined,
            series: undefined,
            bookingsData: undefined
        };
    }

    render() {
        return <>
            <Container fluid>
                <Row>
                    <Col className='col-2 mt-3'>
                        <TeacherDataSelectionList
                            options={this.state.detailLevels}
                            currentActive={this.state.currentDetail}
                            handleClick={this.handleNewDetailClick} />
                    </Col>

                    <Col className='col-8 mt-3'>
                        {this.state.series !== undefined &&
                            <ApexChart options={this.state.options} series={this.state.series} type="area" height={700} />}
                    </Col>

                    <Col className='col-2 mt-3'>
                        <TeacherDataSelectionList
                            options={this.state.courses.map(c => c.courseName)}
                            currentActive={this.state.currentCourse}
                            handleClick={this.handleNewCourseClick} />
                    </Col>
                </Row>
            </Container>
        </>
    }

    componentDidMount = () => {
        this.updateCourses();
    }

    updateCourses = () => {
        API.getCoursesOfTeacher(this.props.teacherId)
            .then((res) => {
                this.setState({ courses: res, currentCourse: res[0].courseName }, () => {
                    this.getDataFromServerAndUpdate();
                });
            })
            .catch((err) => {
                console.log('error in getting list of courses from server');
                console.log(err);
            });
    }

    getDataFromServerAndUpdate = () => {
        if (this.state.currentDetail === 'Lecture') {
            var currentCourseId = this.state.courses.filter(c => c.courseName === this.state.currentCourse)[0].idCourse;

            Promise.all([
                API.getTeacherStatistics(this.props.teacherId, 'L.idLesson', currentCourseId, false),
                API.getTeacherStatistics(this.props.teacherId, 'L.idLesson', currentCourseId, true), // attendance
            ])
                .then((results) => {
                    var numberOfBookingsArray = results[0].map(d => d.numberBookings)
                    var numberOfAttendancesArray = results[1].map(d => d.numberBookings);
                    var lectureDatesArray = results[0].map(d => d.dateLecture);

                    this.updateGraphData(
                        numberOfBookingsArray,
                        numberOfAttendancesArray,
                        lectureDatesArray,
                        'Number of bookings',
                        'Bookings',
                        'Number of bookings per single lecture'
                    );
                })
                .catch((errors) => {
                    console.log('error in getting statistics by lesson from server');
                    console.log(errors[0]);
                });
        }
        else if (this.state.currentDetail === 'Week') {
            currentCourseId = this.state.courses.filter(c => c.courseName === this.state.currentCourse)[0].idCourse;

            Promise.all([
                API.getTeacherStatistics(this.props.teacherId, 'year_month_week', currentCourseId, false),
                API.getTeacherStatistics(this.props.teacherId, 'year_month_week', currentCourseId, true), // attendance
            ])
                .then((results) => {
                    var avgNumberOfBookingsArray = results[0].map(d => d.average);
                    var avgNumberOfAttendancesArray = results[1].map(d => d.average);
                    var weekOfYear = results[0].map(d => moment().week(d.weekOfYear).year(d.year).format('YYYY-MM-DD'));

                    this.updateGraphData(
                        avgNumberOfBookingsArray,
                        avgNumberOfAttendancesArray,
                        weekOfYear,
                        'Average number of bookings',
                        'Bookings (average)',
                        'Average number of bookings per week'
                    );
                })
                .catch((errors) => {
                    console.log('error in getting statistics by week from server');
                    console.log(errors[0]);
                });
        }
        else if (this.state.currentDetail === 'Month') {
            currentCourseId = this.state.courses.filter(c => c.courseName === this.state.currentCourse)[0].idCourse;

            Promise.all([
                API.getTeacherStatistics(this.props.teacherId, 'year,monthOfYear', currentCourseId, false),
                API.getTeacherStatistics(this.props.teacherId, 'year,monthOfYear', currentCourseId, true), // attendance
            ])
                .then((results) => {
                    var avgNumberOfBookingsArray = results[0].map(d => d.average.toFixed(2));
                    var avgNumberOfAttendancesArray = results[1].map(d => d.average.toFixed(2));
                    var monthOfYear = results[0].map(d => moment().week(d.monthOfYear).year(d.year).format('YYYY-MM'))

                    this.updateGraphData(
                        avgNumberOfBookingsArray,
                        avgNumberOfAttendancesArray,
                        monthOfYear,
                        'Average number of bookings',
                        'Bookings (average)',
                        'Average number of bookings per month'
                    );
                })
                .catch((errors) => {
                    console.log('error in getting statistics by month from server');
                    console.log(errors[0]);
                });
        }
    }

    handleNewDetailClick = (event) => {
        this.setState({ currentDetail: event.currentTarget.innerText }, () => {
            this.getDataFromServerAndUpdate();
        });
    }

    handleNewCourseClick = (event) => {
        this.setState({ currentCourse: event.currentTarget.innerText }, () => {
            this.getDataFromServerAndUpdate();
        });
    }

    updateGraphData = (bookingSeries, attendanceSeries, xlabel, ytitle, tooltip, title) => {
        this.setState({
            series: [
                {
                    name: 'Booking',
                    data: bookingSeries
                },
                {
                    name: 'Attendance',
                    data: attendanceSeries
                }
            ],
            options: {
                plotOptions: {
                    bar: {
                        horizontal: false,
                        columnWidth: '55%'
                    },
                },
                dataLabels: {
                    enabled: false
                },
                stroke: {
                    show: true,
                    width: 2,
                    colors: ['transparent']
                },
                title: {
                    text: title,
                    align: 'center'
                },
                xaxis: {
                    categories: xlabel,
                },
                yaxis: {
                    title: {
                        text: ytitle
                    },
                    labels: {
                        formatter: function (value) {
                            return value.toFixed(2);
                        }
                    }
                },
                fill: {
                    opacity: 1
                },
                tooltip: {
                    y: {
                        formatter: function (val) {
                            return val + ' ' + tooltip
                        }
                    }
                }
            }
        });
    }
}

export default TeacherHistoricalDataPage;