import React, {useState} from 'react';
import ApexChart from "react-apexcharts";
import {ButtonGroup, ToggleButton, Container} from 'react-bootstrap'; 
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

        selectedCourse: "",

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
            name: "Desktops",
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
              text: 'Product Trends by Month',
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

      };
    }

    render() {
        return <>
        <Container fluid>
            <br />
            <h1 className="text-center">Historical data</h1>
            
            <ApexChart className="mt-4 col-6 mx-auto" options={this.state.options} series={this.state.series} type="bar" height={430} />

            <br />
            <hr />

            <Select 
                className="mt-4 col-4 mx-auto"
                options={courses}
                placeholder="Select a course..." 
                getOptionLabel={(course)=>course.courseName}
                getOptionValue={(course)=>course.idCourse}
                onChange={selection => this.handleSelectionChange(selection)} 
                />
                
            <br />

            {
            this.state.selectedCourse !== "" ?
                <>
                    <ApexChart className="mt-4 col-6 mx-auto" options={this.state.options2} series={this.state.series2} type="line" height={350} />                
                </>
                :
                <></> /* no course selected */
            }

        </Container>
        </>
    }

    handleSelectionChange = (selection) => {
        this.setState({ selectedCourse: selection.idCourse });
    }
}


/* 
 * how to use? Here it is an example...
 *   <MultiStateToggleButton
 *       radios={[ { name: 'Month', value: '1' }, { name: 'Week', value: '2' }, { name: 'Lecture', value: '3' } ]} 
 *   /> 
 */
function MultiStateToggleButton(props) {
    const [radioValue, setRadioValue] = useState('1');
  
    const radios = props.radios;
  
    return (
      <>
        <div className="text-center">
            <ButtonGroup toggle>
            {radios.map((radio, idx) => (
                <ToggleButton
                key={idx}
                type="radio"
                variant="dark"
                name="radio"
                value={radio.value}
                checked={radioValue === radio.value}
                onChange={(e) => setRadioValue(e.currentTarget.value)}
                >
                {radio.name}
                </ToggleButton>
            ))}
            </ButtonGroup>
        </div>
      </>
    );
} 

export default BookingManagerPage;