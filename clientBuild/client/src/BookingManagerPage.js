import React, {useState} from 'react';
import ApexChart from "react-apexcharts";
import {Container, Row, Col, ListGroup} from 'react-bootstrap'; 
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

        currentFilter: 'Lecture',
        filters: ['Lecture', 'Week', 'Month'],

        selectedCourse: null,

        series: [{
          name: 'Net Profit',
          data: [44, 55, 57, 56, 61, 58, 63, 60, 66]
        }, {
          name: 'Revenue',
          data: [76, 85, 101, 98, 87, 105, 91, 114, 94]
        }, {
          name: 'Free Cash Flow',
          data: [35, 41, 36, 26, 45, 48, 52, 53, 41]
        }],

        options: {
          chart: {
            type: 'bar',
            height: 430
          },
          plotOptions: {
            bar: {
              horizontal: false,
              columnWidth: '50%',
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
          xaxis: {
            categories: ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
          },
          yaxis: {
            title: {
              text: '$ (thousands)'
            }
          },
          fill: {
            opacity: 1
          },
          tooltip: {
            y: {
              formatter: function (val) {
                return "$ " + val + " thousands"
              }
            }
          }
        },
        
        series2: [{
            name: "cancellation",
            data: [10, 41, 35, 51, 49, 62, 69, 91, 148]
        }],

        options2:{
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
        
        series3: [{
            name: 'booking',
            data: [31, 40, 45, 51, 42, 109, 100]
        }, {
            name: 'attendance',
            data: [11, 32, 45, 32, 34, 52, 41]
        }],
        
        options3: {
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
                className="mt-4 col-4 mx-auto"
                options={courses}
                placeholder="Select a course..." 
                isClearable={true}
                getOptionLabel={(course)=>course.courseName}
                getOptionValue={(course)=>course.idCourse}
                onChange={selection => this.handleSelectionChange(selection)} 
                />
                
            <br />

            {
            this.state.selectedCourse !== null ?
                <>
                <Row>
                    <Col className='col-2 mt-3 my-auto'>
                        <MultiStateToggleButton 
                            options={this.state.filters} 
                            currentActive={this.state.currentFilter}
                            handleClick={this.handleFilterChange}/>
                    </Col>

                    <Col className='col-8 mt-3'>
                        <ApexChart options={this.state.options3} series={this.state.series3} type="area" height={350} />                
                    </Col>
                </Row>
                <br />
                <Row>
                    <Col className='col-2 mt-3 my-auto'>
                        <MultiStateToggleButton 
                            options={this.state.filters} 
                            currentActive={this.state.currentFilter}
                            handleClick={this.handleFilterChange}/>
                    </Col>

                    <Col className='col-8 mt-3'>
                        <ApexChart options={this.state.options2} series={this.state.series2} type="line" height={350} />                
                    </Col>
                </Row>
                </>
                :
                <>
                <br />
                <ApexChart className="mt-4 col-6 mx-auto" options={this.state.options} series={this.state.series} type="bar" height={430} />
                <br />
                </> /* no course selected */
            }

        </Container>
        </>
    }

    handleFilterChange = (event) => {
        this.setState({ currentFilter: event.currentTarget.innerText });

        if(event.currentTarget.innerText === 'Lecture'){
           
        }
        else if(event.currentTarget.innerText === 'Week'){
           
        }
        else if(event.currentTarget.innerText === 'Month'){
         
        }
    }

    handleSelectionChange = (selection) => {
        this.setState({ selectedCourse: selection !== null ? selection.idCourse : selection });
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
}

export default BookingManagerPage;