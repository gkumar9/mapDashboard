import React, { Component } from 'react';
import {HorizontalBar} from 'react-chartjs-2';
import patvanJspData from './patvanJspData.json'
const horizontal={
  height:'50vh',
  overflow:'auto'
}
console.log('patvanJspData:',patvanJspData)

class App extends Component {
  constructor(props){
    super(props)
    this.state={value:'Overall',jspdata:[],label:[]}
    this.handleChange=this.handleChange.bind(this)
  }
  componentDidMount(){
    let label=[...patvanJspData.Patvan_List]
    let jspdata=label.map((value)=>{
      return patvanJspData[value].Total
    })
    this.setState({jspdata:jspdata,label:label})
  }
  handleChange(event) {
    let jspdata
    if(event.target.value!=='Overall'){
    jspdata=this.state.label.map((value)=>{
      if(patvanJspData[value][parseInt(event.target.value)]!==undefined){
        return patvanJspData[value][event.target.value].Total
      }
    })
    }else{
      jspdata=this.state.label.map((value)=>{
      return patvanJspData[value].Total
    })
    }
    this.setState({jspdata:jspdata,value: event.target.value})
  }
  render() {
    const data = {
      labels: this.state.label,
      datasets: [
        {
          
          label: 'My First dataset',
          backgroundColor: 'rgba(255,99,132,0.2)',
          borderColor: 'rgba(255,99,132,1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(255,99,132,0.4)',
          hoverBorderColor: 'rgba(255,99,132,1)',
          data: this.state.jspdata
        }
      ]
    };
    return (
      <div className="container">
      <h2>Bar Example (custom size)</h2>
      <span>Select Year: </span>
      <select value={this.state.value} onChange={this.handleChange}>
        <option value="Overall">Overall</option>
        <option value="2017">2017</option>
        <option value="2018">2018</option>
      </select>
      <div style={horizontal}>
      <HorizontalBar
          data={data}
          width={100}
      />
      </div> 
      </div>
    );
  }
}

export default App;
