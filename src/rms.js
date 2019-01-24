import React, { Component } from 'react';
import Header from './Header.js'
import Sidebar from './Sidebar.js'
import CO2 from './pins/CO2.png'
import FLOW from './pins/flow.png'
import SOLARENERGY from './pins/solar.jpg'
import SUBMERSIBLE from './pins/submersible.png'
import STATES from './pins/states.png'
import { Link } from "react-router-dom";
import axios from 'axios'
import config from './config.js'
const $ = require('jquery')
$.DataTable=require('datatables.net')
class RmsHeader extends Component{
  render(){
    return(
        <div className="container ">
          <nav id="filter" className="navbar navbar-default">
            <div className="container-fluid" style={{'textAlign':'center'}}>                 
            <Link to="/"><button style={{'marginTop':'6px','backgroundColor': 'lightgray','float': 'left'}} type="button" className="btn btn-default" aria-label="Left Align"><span  className="glyphicon glyphicon-menu-left" style={{'marginRight':'6px'}} aria-hidden="true"></span>Home </button></Link>
            <span style={{'fontSize': 'x-large','color':'blue'}}>Remote Monitoring System </span>
            </div>
          </nav>
        </div>
      )
  }
}
class RmsSidebardata extends Component{
  render(){
    return(
        
            <div style={{'borderRightStyle': 'groove','minHeight': '100vh','textAlign':'center'}} className="col-xs-2">
              <h4 style={{'marginTop':'40px','color':'gray','fontSize': '25px'}}>Our Impact</h4>
              <ul style={{'marginTop':'40px','color':'gray'}}>
                <li className="rmssidebar">
                  <div className="row">
                    <div className="col-xs-3">
                      <img alt="CO2" src={CO2} style={{'width':'46px'}}  />
                    </div>
                    <div className="col-xs-9">
                    <span><b>10127.93 tonnes</b></span>
                    <p ><small>CO2 avoided</small></p>
                    </div>
                  </div>
                </li>
                <li className="rmssidebar">
                  <div className="row">
                    <div className="col-xs-3">
                      <img alt="flow" src={FLOW} style={{'width':'32px'}}  />
                    </div>
                    <div className="col-xs-9">
                    <span ><b>105442.0 kL</b></span>
                    <p ><small>Water pumped</small></p>
                    </div>
                  </div>
                </li>
                <li className="rmssidebar">
                  <div className="row">
                    <div className="col-xs-3">
                      <img alt="SOLARENERGY" src={SOLARENERGY} style={{'width':'37px'}}  />
                    </div>
                    <div className="col-xs-9">
                    <span ><b>10.4 GWh</b></span>
                    <p ><small>Energy generated</small></p>
                    </div>
                  </div>
                </li>
                <li className="rmssidebar">
                  <div className="row">
                    <div className="col-xs-3">
                      <img alt="submersible" src={SUBMERSIBLE} style={{'width':'42px'}}  />
                    </div>
                    <div className="col-xs-9">
                    <span ><b>6581</b></span>
                    <p ><small>Pump Installed</small></p>
                    </div>
                  </div>
                </li>
                <li className="rmssidebar">
                  <div className="row">
                    <div className="col-xs-3">
                      <img alt="states" src={STATES} style={{'width':'42px'}}  />
                    </div>
                    <div className="col-xs-9">
                    <span ><b>14</b></span>
                    <p ><small>States in India</small></p>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
            
      )
  }
}
class Rmsdatatable extends Component {
  constructor(props){
    super(props)
    this.handletableclick=this.handletableclick.bind(this)
  }
  handletableclick(event){
    console.log(event)
  }
  componentDidUpdate (){
    console.log(this.props.data)
    this.$el=$(this.el)

    this.$el.DataTable(
    {
      data: this.props.data,
      scrollY: 520,
      paging: false,
      responsive: true,
      columns: [
          { data: "vfdSno",
          render: function (data, type, row) {
                        return '<a href="/rms/"+this.innerHTML+" onClick=console.log(this.innerHTML) >' + data + '</a>'
                    } },
          { data: "customerName" },
          { data: "district" },
          { data: "state" }
      ]
    }
      )
  }
  componentWillUnMount(){

  }
  render(){
    return(
      <div style={{'padding':'10px'}} className="col-xs-10">
        <table id="example" className="display" width="100%" ref={el=>this.el=el}>
        <thead>
            <tr>
                <th>VFD/Controller No</th>
                <th>Beneficiary</th>
                <th>District</th>
                <th>State</th>
            </tr>
        </thead></table>
      </div>
          
      )
  }
} 
class Rms extends Component{
  constructor(props){
    super(props)
    this.state={'list':[]}
  }
  componentDidMount(){
    axios({
      url:config.rmslist,
      method:'POST',
      data:{
        temp:"temp"
      },
      headers:{
        'Content-Type': 'application/json'
      }
    }).then((res)=>{
      this.setState({list:res.data.data.list})
    })
    .catch((e)=>{
      console.log(e)
    })
  }
	render(){
		return(
			<div >  
        <Header />
        <div className="mainbody">
          <Sidebar />
          <div style={{'backgroundColor':'#F2F2F2'}}className="main">
            <RmsHeader />
            <div className="container">
              <div className="row">
              <RmsSidebardata />
              <Rmsdatatable data={this.state.list} />
              </div>
            </div>
            
          </div>
        </div>
        </div>
			)
	}
}

export default Rms;