import React, {useState} from 'react';
import ApexChart from "react-apexcharts";
import {Container, ButtonGroup, ToggleButton} from 'react-bootstrap';
import Select from 'react-select';

class BookingManagerPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            currentBookingFilter: 1, // Month = 1
            currentCancellationFilter: 4, // Month = 4
        };
    }

    componentDidMount = () => {
        // TODO - api call
        this.setState({ 
            courses: [
                {idCourse:3,courseName:"Geometry"},
                {idCourse:2,courseName:"Software Engineering II"},
                {idCourse:5,courseName:"Computer Science"},
            ], 
            selectedCourse: null,
            bookingSeries: undefined,
            cancellationSeries: undefined,
        });

        this.updateBookingGraphData(
            'Average number of booking per month',
            [40.5, 42.8, 45.7, 60.1, 50.2, 40.3, 30.2], 
            [30.2, 40.8, 40.7, 40.0, 25.2, 40.0, 29.0],
            ['Oct 2020', 'Nov 2020', 'Dec 2020', 'Jan 2021', 'Feb 2021', 'Mar 2021', 'Apr 2021']
        );
        this.updateCancellationGraphData(
            'Average number of cancellations per month',
            [40.5, 42.8, 45.7, 60.1, 50.2, 40.3, 30.2], 
            ['Oct 2020', 'Nov 2020', 'Dec 2020', 'Jan 2021', 'Feb 2021', 'Mar 2021', 'Apr 2021']
        );
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
                getOptionLabel={(course)=>course.courseName}
                getOptionValue={(course)=>course.idCourse}
                onChange={selection => this.handleSelectionChange(selection)} 
                />
                
            {
            this.state.selectedCourse !== null ?
                <>
                <div className='col-8 mx-auto my-5 shadow-lg p-3 bg-white'>
                    {this.state.bookingSeries != undefined && 
                        <ApexChart options={this.state.bookingOptions} series={this.state.bookingSeries} type="area" height={350} /> } 
                    <div className="text-center pt-3">
                        <MultiStateToggleButton
                            options={[ { name: 'Month', value: '1' }, { name: 'Week', value: '2' }, { name: 'Lecture', value: '3' } ]} 
                            currentActive={this.state.currentBookingFilter}
                            handleClick={this.handleBookingFilterChange}
                            />
                    </div>              
                </div>
                <div className='col-8 mx-auto my-5 shadow-lg p-3 bg-white'>
                    {this.state.cancellationSeries != undefined && 
                        <ApexChart options={this.state.cancellationOptions} series={this.state.cancellationSeries} type="line" height={350} />} 
                    <div className="text-center pt-3">
                        <MultiStateToggleButton
                            options={[ { name: 'Month', value: '4' }, { name: 'Week', value: '5' }, { name: 'Lecture', value: '6' } ]} 
                            currentActive={this.state.currentCancellationFilter}
                            handleClick={this.handleCancellationFilterChange}
                            />
                    </div>   
                </div>
                </>
                : /* no course selected: aggregate (generic) stats */
                <> 
                <div className='col-8 mx-auto my-5 shadow-lg p-3 bg-white'>
                    {this.state.bookingSeries != undefined && 
                        <ApexChart options={this.state.bookingOptions} series={this.state.bookingSeries} type="area" height={350} /> }
                    <div className="text-center pt-3">
                        <MultiStateToggleButton
                            options={[ { name: 'Month', value: '1' }, { name: 'Week', value: '2' } ]} 
                            currentActive={this.state.currentBookingFilter}
                            handleClick={this.handleBookingFilterChange}
                            />
                    </div>               
                </div>
                <div className='col-8 mx-auto my-5 shadow-lg p-3 bg-white'>
                    {this.state.cancellationSeries != undefined && 
                        <ApexChart options={this.state.cancellationOptions} series={this.state.cancellationSeries} type="line" height={350}/>} 
                    <div className="text-center pt-3">
                        <MultiStateToggleButton
                            options={[ { name: 'Month', value: '4' }, { name: 'Week', value: '5' } ]} 
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
        if(event.currentTarget.innerText === 'Month'){
            this.setState({ currentBookingFilter: 1 }); 
            this.updateBookingGraphData(
                'Average number of booking per month',
                [40.5, 42.8, 45.7, 60.1, 50.2, 40.3, 30.2], 
                [30.2, 40.8, 40.7, 40.0, 25.2, 40.0, 29.0],
                ['Oct 2020', 'Nov 2020', 'Dec 2020', 'Jan 2021', 'Feb 2021', 'Mar 2021', 'Apr 2021']
            );
        }
        else if(event.currentTarget.innerText === 'Week'){
            this.setState({ currentBookingFilter: 2 }); 
            this.updateBookingGraphData(
                'Average number of booking per week',
                [40.5, 32.8, 28.7, 25.1, 30.5, 32.8, 22.7, 23.1], 
                [34, 30, 22.7, 25.1, 10, 30.2, 20.7, 22], 
                ['2/11 - 6/11', '9/11 - 13/11', '16/11 - 20/11', '23/11 - 27/11', '2/11 - 6/11', '9/11 - 13/11', '16/11 - 20/11', '23/11 - 27/11']
            );
        }
        else if(event.currentTarget.innerText === 'Lecture'){
            this.setState({ currentBookingFilter: 3 }); 
            this.updateBookingGraphData(
                'Number of booking per lecture',
                [28, 15, 20, 35, 50, 30, 20], 
                [10, 13, 20, 30, 50, 20, 10],
                ['SE II - 24/11 14:30', 'SE II - 25/11 14:30', 'SE II - 26/11 11:30', 'SE II - 26/11 14:30', 'SE II - 27/11 14:30', 'SE II - 28/11 14:30', 'SE II - 29/11 14:30']
            );
        }
    }

    handleCancellationFilterChange = (event) => {
        if(event.currentTarget.innerText === 'Month'){
            this.setState({ currentCancellationFilter: 4 }); 
            this.updateCancellationGraphData(
                'Average number of cancellations per month',
                [40.5, 42.8, 45.7, 60.1, 50.2, 40.3, 30.2], 
                ['Oct 2020', 'Nov 2020', 'Dec 2020', 'Jan 2021', 'Feb 2021', 'Mar 2021', 'Apr 2021']
            );
        }
        else if(event.currentTarget.innerText === 'Week'){
            this.setState({ currentCancellationFilter: 5 }); 
            this.updateCancellationGraphData(
                'Average number of cancellations per week',
                [40.5, 32.8, 28.7, 25.1], 
                ['2/11 - 6/11', '9/11 - 13/11', '16/11 - 20/11', '23/11 - 27/11']
            );
        }
        else if(event.currentTarget.innerText === 'Lecture'){
            this.setState({ currentCancellationFilter: 6 });
            this.updateCancellationGraphData(
                'Number of cancellations per lecture',
                [5, 2, 0, 1, 10, 3, 2], 
                ['SE II - 24/11 14:30', 'SE II - 25/11 14:30', 'SE II - 26/11 11:30', 'SE II - 26/11 14:30', 'SE II - 27/11 14:30', 'SE II - 28/11 14:30', 'SE II - 29/11 14:30']
            ); 
        }
    }

    handleSelectionChange = (selection) => {
        this.setState({ 
            selectedCourse: selection !== null ? selection.idCourse : selection,
            currentBookingFilter: 1,
            currentCancellationFilter: 4,
        });
    }

    updateBookingGraphData = (title, yBookingData, yAttendanceData, xlabel) => {
        this.setState({
            bookingSeries: [
                {   name: 'Booking',
                    data: yBookingData }, 
                {   name: 'Attendance',
                    data: yAttendanceData }
            ],
            bookingOptions: {
                chart: {
                    height: 350,
                    type: 'area',
                    zoom: {
                        enabled: false
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
            },
        });
    }

    updateCancellationGraphData = (title, ydata, xlabel) => {
        this.setState({
            cancellationSeries: [{
                name: "Cancellation",
                data: ydata
            }],
            cancellationOptions:{
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
                    onClick={(event) => { this.props.handleClick(event); }}
                >
                    {option.name}
                </ToggleButton>
    }

}

export default BookingManagerPage;