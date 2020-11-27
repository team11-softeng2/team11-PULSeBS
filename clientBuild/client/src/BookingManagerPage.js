import React from 'react';
import ApexChart from "react-apexcharts";

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
              horizontal: true,
              columnWidth: '55%',
              endingShape: 'rounded'
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
            <h1>Historical data</h1>
            <div id="chart">
                <ApexChart options={this.state.options} series={this.state.series} type="bar" height={430} />
            </div>
        </>
    }

}

export default BookingManagerPage;