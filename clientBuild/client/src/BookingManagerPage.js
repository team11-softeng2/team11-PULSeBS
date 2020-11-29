import React, {useState} from 'react';
import ApexChart from "react-apexcharts";
import {Container, Row, Col, ListGroup, ButtonGroup, ToggleButton} from 'react-bootstrap';
import Select from 'react-select';

const courses = [
    {idCourse:3,courseName:"Geometry"},
    {idCourse:2,courseName:"Software Engineering II"},
    {idCourse:5,courseName:"Computer Science"},
] 

class BookingManagerPage extends React.Component {

    constructor(props) {
      super(props);

      this.state = {

        currentBookingFilter: 1, // Month = 1
        currentCancellationFilter: 4, // Month = 4

        selectedCourse: null,
        
        series1: [{
            name: "cancellation",
            data: [10, 41, 35, 51, 49, 62, 69, 91, 148]
        }],

        options1:{
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
              text: 'Cancellation by Month',
              align: 'left'
            },
            grid: {
              row: {
                colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
                opacity: 0.5
              },
            },
            xaxis: {
              categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
            }
        },
        
        series2: [{
            name: 'booking',
            data: [31, 40, 45, 51, 42, 109, 100]
        }, {
            name: 'attendance',
            data: [11, 32, 45, 32, 34, 52, 41]
        }],
        
        options2: {
            chart: {
                height: 350,
                type: 'area'
            },
            dataLabels: {
                enabled: false
            },
            stroke: {
                curve: 'smooth'
            },
            title: {
              text: 'Booking/Attendance by Month',
              align: 'left'
            },
            xaxis: {
                type: 'datetime',
                categories: ["2018-09-19T00:00:00.000Z", "2018-09-19T01:30:00.000Z", "2018-09-19T02:30:00.000Z", "2018-09-19T03:30:00.000Z", "2018-09-19T04:30:00.000Z", "2018-09-19T05:30:00.000Z", "2018-09-19T06:30:00.000Z"]
            },
            tooltip: {
                x: {
                format: 'dd/MM/yy HH:mm'
                },
            },
          },

      };
    }

    render() {
        return <>
        <Container fluid>
            <br />
            <h1 className="text-center">Historical data</h1>

            <Select 
                className="col-4 mx-auto my-4"
                options={courses}
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
                    <ApexChart options={this.state.options2} series={this.state.series2} type="area" height={350} /> 
                    <div className="text-center pt-3">
                        <MultiStateToggleButton
                            options={[ { name: 'Month', value: '1' }, { name: 'Week', value: '2' }, { name: 'Lecture', value: '3' } ]} 
                            currentActive={this.state.currentBookingFilter}
                            handleClick={this.handleBookingFilterChange}
                            />
                    </div>   
                </div>

                <div className='col-8 mx-auto my-5 shadow-lg p-3 bg-white'>
                    <ApexChart options={this.state.options1} series={this.state.series1} type="line" height={350} />  
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
                    <ApexChart options={this.state.options2} series={this.state.series2} type="area" height={350} />  
                    <div className="text-center pt-3">
                        <MultiStateToggleButton
                            options={[ { name: 'Month', value: '1' }, { name: 'Week', value: '2' } ]} 
                            currentActive={this.state.currentBookingFilter}
                            handleClick={this.handleBookingFilterChange}
                            />
                    </div>  
                </div>

                <div className='col-8 mx-auto my-5 shadow-lg p-3 bg-white'>
                    <ApexChart options={this.state.options1} series={this.state.series1} type="line" height={350} /> 
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
        }
        else if(event.currentTarget.innerText === 'Week'){
            this.setState({ currentBookingFilter: 2 }); 
        }
        else if(event.currentTarget.innerText === 'Lecture'){
            this.setState({ currentBookingFilter: 3 }); 
        }
    }

    handleCancellationFilterChange = (event) => {
        if(event.currentTarget.innerText === 'Month'){
            this.setState({ currentCancellationFilter: 4 }); 
        }
        else if(event.currentTarget.innerText === 'Week'){
            this.setState({ currentCancellationFilter: 5 }); 
        }
        else if(event.currentTarget.innerText === 'Lecture'){
            this.setState({ currentCancellationFilter: 6 }); 
        }
    }

    handleSelectionChange = (selection) => {
        this.setState({ 
            selectedCourse: selection !== null ? selection.idCourse : selection,
            currentBookingFilter: 1,
            currentCancellationFilter: 4,
        });
    }

    updateGraphData = (seriesId, optionsId, yname, title, ydata, xlabel) => {
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

/*
class MultiStateToggleButton extends React.Component{
    render(){
        return <>
            <ListGroup>
                {this.props.options.map(o => this.createListItem(o))}
            </ListGroup>
        </>
    }

    createListItem = (option) => {
        return <ListGroup.Item 
                    key={option}
                    action 
                    active={this.props.currentActive === option} 
                    onClick={(event) => { this.props.handleClick(event); }}
                >
                    {option}
                </ListGroup.Item>
    }
}*/

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