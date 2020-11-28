import React, {useState} from 'react';
import ApexChart from "react-apexcharts";
import {ButtonGroup, ToggleButton, Container} from 'react-bootstrap'; 

class BookingManagerPage extends React.Component {

    constructor(props) {
      super(props);

      this.state = {

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
              columnWidth: '25%',
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
        
      };
    }

    render() {
        return <>
        <Container fluid>
            <br />
            <h1>Historical data</h1>

            <MultiStateToggleButton
                radios={[ { name: 'Month', value: '1' }, { name: 'Week', value: '2' }, { name: 'Lecture', value: '3' } ]} 
                />

            <div id="chart">
                <ApexChart options={this.state.options} series={this.state.series} type="bar" height={430} />
            </div>
        </Container>
        </>
    }

    handleListClick = (newDetail) => {
        this.setState({ currentDetail: newDetail });
    }
}

function MultiStateToggleButton(props) {
    const [radioValue, setRadioValue] = useState('1');
  
    const radios = props.radios;
  
    return (
      <>
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
      </>
    );
} 

export default BookingManagerPage;