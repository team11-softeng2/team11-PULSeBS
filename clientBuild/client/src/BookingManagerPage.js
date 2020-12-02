import React from 'react';
import ApexChart from "react-apexcharts";
import { Container, ButtonGroup, ToggleButton } from 'react-bootstrap';
import Select from 'react-select';
import API from './API';

class BookingManagerPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            currentBookingFilter: 1, // Month = 1
            currentCancellationFilter: 4, // Month = 4
            selectedCourse: API.ALL_COURSES_FILTER
        };
    }

    componentDidMount = () => {
        API.getAllCourses().then((courses) => {
            this.setState({
                courses: courses
            });
        });

        this.setState({
            bookingSeries: undefined,
            cancellationSeries: undefined,
        });

        API.getBookingStatisticsByMonth(this.state.selectedCourse).then((stats) => {
            let data = []; let labels = [];
            stats.forEach(stat => {
                data.push(stat.average);
                labels.push(`${stat.monthOfYear}-${stat.year}`);
            });
            this.updateBookingGraphData(
                'Average number of booking per month',
                data,
                data, // tmp (attendance)
                labels
            )
        });

        API.getCancellationsStatisticsByMonth(this.state.selectedCourse).then((stats) => {
            let data = []; let labels = [];
            stats.forEach(stat => {
                data.push(stat.average);
                labels.push(`${stat.monthOfYear}-${stat.year}`);
            });
            this.updateCancellationGraphData(
                'Average number of cancellations per month',
                data,
                labels
            )
        });
    }

    render() {
        return <>
            <Container fluid>
                <br />
                <h1 className="text-center">Historical data</h1>

                <Select
                    className="col-4 mx-auto my-4"
                    options={this.state.courses}
                    placeholder="Select a course..."
                    isClearable={true}
                    styles={{
                        // Fixes the overlapping problem of the component
                        menu: provided => ({ ...provided, zIndex: 9999 })
                    }}
                    getOptionLabel={(course) => course.courseName}
                    getOptionValue={(course) => course.idCourse}
                    onChange={selection => this.handleSelectionChange(selection)}
                />

                {
                    this.state.selectedCourse !== API.ALL_COURSES_FILTER ?
                        <>
                            <div className='m-5 shadow-lg p-3 bg-white'>
                                {this.state.bookingSeries !== undefined &&
                                    <ApexChart options={this.state.bookingOptions} series={this.state.bookingSeries} type="area" height={350} />}
                                <div className="text-center pt-3">
                                    <MultiStateToggleButton
                                        options={[{ name: 'Month', value: '1' }, { name: 'Week', value: '2' }, { name: 'Lecture', value: '3' }]}
                                        currentActive={this.state.currentBookingFilter}
                                        handleClick={this.handleBookingFilterChange}
                                    />
                                </div>
                            </div>
                            <div className='m-5 shadow-lg p-3 bg-white'>
                                {this.state.cancellationSeries !== undefined &&
                                    <ApexChart options={this.state.cancellationOptions} series={this.state.cancellationSeries} type="line" height={350} />}
                                <div className="text-center pt-3">
                                    <MultiStateToggleButton
                                        options={[{ name: 'Month', value: '4' }, { name: 'Week', value: '5' }, { name: 'Lecture', value: '6' }]}
                                        currentActive={this.state.currentCancellationFilter}
                                        handleClick={this.handleCancellationFilterChange}
                                    />
                                </div>
                            </div>
                        </>
                        : /* no course selected: aggregate (generic) stats */
                        <>
                            <div className='m-5 shadow-lg p-3 bg-white'>
                                {this.state.bookingSeries !== undefined &&
                                    <ApexChart options={this.state.bookingOptions} series={this.state.bookingSeries} type="area" height={350} />}
                                <div className="text-center pt-3">
                                    <MultiStateToggleButton
                                        options={[{ name: 'Month', value: '1' }, { name: 'Week', value: '2' }]}
                                        currentActive={this.state.currentBookingFilter}
                                        handleClick={this.handleBookingFilterChange}
                                    />
                                </div>
                            </div>
                            <div className='m-5 shadow-lg p-3 bg-white'>
                                {this.state.cancellationSeries !== undefined &&
                                    <ApexChart options={this.state.cancellationOptions} series={this.state.cancellationSeries} type="line" height={350} />}
                                <div className="text-center pt-3">
                                    <MultiStateToggleButton
                                        options={[{ name: 'Month', value: '4' }, { name: 'Week', value: '5' }]}
                                        currentActive={this.state.currentCancellationFilter}
                                        handleClick={this.handleCancellationFilterChange}
                                    />
                                </div>
                            </div>
                        </>
                }

            </Container>
        </>
    }

    handleBookingFilterChange = (event) => {
        if (event === 'Month') {
            this.setState({ currentBookingFilter: 1 });
            API.getBookingStatisticsByMonth(this.state.selectedCourse).then((stats) => {
                let data = []; let labels = [];
                stats.forEach(stat => {
                    data.push(stat.average);
                    labels.push(`${stat.monthOfYear}-${stat.year}`);
                });
                this.updateBookingGraphData(
                    'Average number of booking per month',
                    data,
                    data, // tmp (attendance)
                    labels
                )
            });
        }
        else if (event === 'Week') {
            this.setState({ currentBookingFilter: 2 });
            API.getBookingStatisticsByWeek(this.state.selectedCourse).then((stats) => {
                let data = []; let labels = [];
                stats.forEach(stat => {
                    data.push(stat.average);
                    labels.push(`${stat.weekOfYear} (${stat.monthOfYear}-${stat.year})`);
                });
                this.updateBookingGraphData(
                    'Average number of booking per week',
                    data,
                    data, // tmp (attendance)
                    labels
                )
            });
        }
        else if (event === 'Lecture') {
            this.setState({ currentBookingFilter: 3 });
            API.getBookingStatisticsByLesson(this.state.selectedCourse).then((stats) => {
                let data = []; let labels = [];
                stats.forEach(stat => {
                    data.push(stat.numberBookings);
                    labels.push(`${stat.dateLecture}`);
                });
                this.updateBookingGraphData(
                    'Number of booking per lecture',
                    data,
                    data, // tmp (attendance)
                    labels
                )
            });
        }
    }

    handleCancellationFilterChange = (event) => {
        if (event === 'Month') {
            this.setState({ currentCancellationFilter: 4 });
            API.getCancellationsStatisticsByMonth(this.state.selectedCourse).then((stats) => {
                let data = []; let labels = [];
                stats.forEach(stat => {
                    data.push(stat.average);
                    labels.push(`${stat.monthOfYear}-${stat.year}`);
                });
                this.updateCancellationGraphData(
                    'Average number of cancellations per month',
                    data,
                    labels
                )
            });
        }
        else if (event === 'Week') {
            this.setState({ currentCancellationFilter: 5 });
            API.getCancellationsStatisticsByWeek(this.state.selectedCourse).then((stats) => {
                let data = []; let labels = [];
                stats.forEach(stat => {
                    data.push(stat.average);
                    labels.push(`${stat.weekOfYear} (${stat.monthOfYear}-${stat.year})`);
                });
                this.updateCancellationGraphData(
                    'Average number of cancellations per week',
                    data,
                    labels
                )
            });
        }
        else if (event === 'Lecture') {
            this.setState({ currentCancellationFilter: 6 });
            API.getCancellationsStatisticsByLesson(this.state.selectedCourse).then((stats) => {
                let data = []; let labels = [];
                stats.forEach(stat => {
                    data.push(stat.numberBookings);
                    labels.push(`${stat.dateLecture}`);
                });
                this.updateCancellationGraphData(
                    'Number of cancellations per lecture',
                    data,
                    labels
                )
            });
        }
    }

    handleSelectionChange = (selection) => {
        this.setState(
            {
                selectedCourse: selection !== null ? selection.idCourse : API.ALL_COURSES_FILTER,
                currentBookingFilter: 1,
                currentCancellationFilter: 4,
            },
            function() {
                // after state update
                API.getBookingStatisticsByMonth(this.state.selectedCourse).then((stats) => {
                    let data = []; let labels = [];
                    stats.forEach(stat => {
                        data.push(stat.average);
                        labels.push(`${stat.monthOfYear}-${stat.year}`);
                    });
                    this.updateBookingGraphData(
                        'Average number of booking per month',
                        data,
                        data, // tmp (attendance)
                        labels
                    )
                });

                API.getCancellationsStatisticsByMonth(this.state.selectedCourse).then((stats) => {
                    let data = []; let labels = [];
                    stats.forEach(stat => {
                        data.push(stat.average);
                        labels.push(`${stat.monthOfYear}-${stat.year}`);
                    });
                    this.updateCancellationGraphData(
                        'Average number of cancellations per month',
                        data,
                        labels
                    )
                });
            }
        )
    }

    updateBookingGraphData = (title, yBookingData, yAttendanceData, xlabel) => {
        this.setState({
            bookingSeries: [
                {
                    name: 'Booking',
                    data: yBookingData
                },
                {
                    name: 'Attendance',
                    data: yAttendanceData
                }
            ],
            bookingOptions: {
                chart: {
                    height: 350,
                    type: 'area',
                    zoom: {
                        enabled: true
                    }
                },
                dataLabels: {
                    enabled: false
                },
                stroke: {
                    curve: 'smooth'
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
                    categories: xlabel
                },
                yaxis: {
                    labels: {
                        formatter: function (value) {
                            return value.toFixed(2);
                        }
                    },
                },
            },
        });
    }

    updateCancellationGraphData = (title, ydata, xlabel) => {
        this.setState({
            cancellationSeries: [{
                name: "Cancellation",
                data: ydata
            }],
            cancellationOptions: {
                chart: {
                    height: 350,
                    type: 'line',
                    zoom: {
                        enabled: true
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
                },
                yaxis: {
                    labels: {
                        formatter: function (value) {
                            return value.toFixed(2);
                        }
                    },
                },
            },
        });
    }
}

class MultiStateToggleButton extends React.Component {

    render() {
        return <>
            <ButtonGroup toggle>
                {this.props.options.map(o => this.createListItem(o))}
            </ButtonGroup>
        </>
    }

    createListItem = (option) => {

        return <ToggleButton
            key={option.value}
            type="radio"
            variant="dark"
            name="option"
            value={option.value}
            checked={this.props.currentActive == option.value}
            onClick={(event) => { event.preventDefault(); this.props.handleClick(event.currentTarget.innerText); }}
        >
            {option.name}
        </ToggleButton>
    }

}

export default BookingManagerPage;