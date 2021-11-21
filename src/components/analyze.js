import '../App.css';
import React, { Component } from 'react';
import { Pie } from 'react-chartjs-2';

class Analyze extends Component {
    constructor(props){
        super(props)
        this.state={
            count:[],
            catogories:[],
            loading:true
        };
    }
    
      static getDerivedStateFromProps(props, state) {
        return {counts: props.counts,catogories:props.catogory };
      }
      render(){
        const data = {
            labels: this.state.catogories,
            datasets: [
              {
                label: '# of Votes',
                data: this.state.counts,
                backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
                  
                ],
                borderColor: [
                  'rgba(255, 99, 132, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(75, 192, 192, 1)',
                  
                ],
                borderWidth: 1,
              },
            ],
          };
        return(
            <div>
                <Pie data={data} />
            </div>
        )
    }
}
export default Analyze;