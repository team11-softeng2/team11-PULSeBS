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
                API.getTeacherStatistics(this.props.teacherId, 'L.idLesson', currentCourseId),
                /* TODO promise1 */
            ])
                .then((results) => {
                    // valArray[0] is result of promise0
                    // valArray[1] is result of promise1
                    // valArray[2] is result of promise2

                    var numberOfBookingsArray = results[0].map(d => d.numberBookings)
                    var lectureDatesArray = results[0].map(d => d.dateLecture)

                    this.updateGraphData(
                        numberOfBookingsArray,
                        numberOfBookingsArray, // tmp (attendance)
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

            /* API.getTeacherStatistics(this.props.teacherId, 'L.idLesson', currentCourseId)
                .then((res) => {
                    //console.log(res)
                    var numberOfBookingsArray = res.map(d => d.numberBookings)
                    var lectureDatesArray = res.map(d => d.dateLecture)

                    this.updateGraphData(
                        numberOfBookingsArray,
                        numberOfBookingsArray, // tmp (attendance)
                        lectureDatesArray,
                        'Number of bookings',
                        'Bookings',
                        'Number of bookings per single lecture'
                    );
                })
                .catch((err) => {
                    console.log('error in getting statistics by lesson from server');
                    console.log(err);
                }); */
        }
        else if (this.state.currentDetail === 'Week') {
            currentCourseId = this.state.courses.filter(c => c.courseName === this.state.currentCourse)[0].idCourse;

            Promise.all([
                API.getTeacherStatistics(this.props.teacherId, 'year_month_week', currentCourseId),
                /* TODO promise1 */
            ])
                .then((results) => {
                    // valArray[0] is result of promise0
                    // valArray[1] is result of promise1
                    // valArray[2] is result of promise2

                    //console.log(results[0])
                    var avgNumberOfBookingsArray = results[0].map(d => d.average)
                    var weekOfYear = results[0].map(d => moment().week(d.weekOfYear).year(d.year).format('YYYY-MM-DD'))

                    this.updateGraphData(
                        avgNumberOfBookingsArray,
                        avgNumberOfBookingsArray, // tmp (attendance)
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

            /*API.getTeacherStatistics(this.props.teacherId, 'year_month_week', currentCourseId)
                .then((res) => {
                    //console.log(res)
                    var avgNumberOfBookingsArray = res.map(d => d.average)
                    var weekOfYear = res.map(d => moment().week(d.weekOfYear).year(d.year).format('YYYY-MM-DD'))

                    this.updateGraphData(
                        avgNumberOfBookingsArray,
                        avgNumberOfBookingsArray, // tmp (attendance)
                        weekOfYear,
                        'Average number of bookings',
                        'Bookings (average)',
                        'Average number of bookings per week'
                    );
                })
                .catch((err) => {
                    console.log('error in getting statistics by week from server');
                    console.log(err);
                });*/
        }
        else if (this.state.currentDetail === 'Month') {
            currentCourseId = this.state.courses.filter(c => c.courseName === this.state.currentCourse)[0].idCourse;

            Promise.all([
                API.getTeacherStatistics(this.props.teacherId, 'year,monthOfYear', currentCourseId),
                /* TODO promise1 */
            ])
                .then((results) => {
                    // valArray[0] is result of promise0
                    // valArray[1] is result of promise1
                    // valArray[2] is result of promise2

                    //console.log(results[0])
                    var avgNumberOfBookingsArray = results[0].map(d => d.average.toFixed(2))
                    var monthOfYear = results[0].map(d => moment().week(d.monthOfYear).year(d.year).format('YYYY-MM'))

                    this.updateGraphData(
                        avgNumberOfBookingsArray,
                        avgNumberOfBookingsArray, // tmp (attendance)
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
                
            /*API.getTeacherStatistics(this.props.teacherId, 'year,monthOfYear', currentCourseId)
                .then((res) => {
                    //console.log(res)
                    var avgNumberOfBookingsArray = res.map(d => d.average.toFixed(2))
                    var monthOfYear = res.map(d => moment().week(d.monthOfYear).year(d.year).format('YYYY-MM'))

                    this.updateGraphData(
                        avgNumberOfBookingsArray,
                        avgNumberOfBookingsArray, // tmp (attendance)
                        monthOfYear,
                        'Average number of bookings',
                        'Bookings (average)',
                        'Average number of bookings per month'
                    );
                })
                .catch((err) => {
                    console.log('error in getting statistics by month from server');
                    console.log(err);
                });*/
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