import "../index.css";
import axios from 'axios';
import React, {Component} from 'react';
import {Doughnut} from 'react-chartjs-2';

class Chart extends Component{

    constructor(props){
        super(props);
        this.state = {
            chartData:{
                labels: ['X', 'Y', 'Z'],
                datasets:[
                  {
                    label:'Quantities requested',
                    data:[
                      1,
                      2,
                      3
                    ],
                    backgroundColor:[
                      'rgba(255, 99, 132, 0.6)',
                      'rgba(54, 162, 235, 0.6)',
                      'rgba(255, 206, 86, 0.6)'
                    ]
                  }
                ]
              }
        }
      }


    componentDidMount(){
        axios.get("https://ip-lab.herokuapp.com/istoric/?format=json").then(response => {
          console.log('This is the data', response.data)
        });
    }  

    render(){
        return(
            <div className="chart">
                <Doughnut
                    data={this.state.chartData}
                    options={{ maintainAspectRatio: false,
                        title:{
                            display: true,
                            text: 'Requested quantities',
                            fontsize: 35
                        }
                    }}
                />
            </div>
        )
    }
}

export default Chart;