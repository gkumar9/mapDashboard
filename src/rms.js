import React, { Component } from 'react';
import Header from './Header.js'
import Sidebar from './Sidebar.js'
import { Link } from "react-router-dom";
import axios from 'axios'
import config from './config.js'
import RmsSidebardata from './RmsSidebardata.js'
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
    const self = this;
    this.$el.DataTable(
    {
      data: this.props.data,
      scrollY: 520,
      paging: false,
      responsive: true,
      columns: [
          { data: "vfdSno",
          render: function (data, type, row) {
                  return '<a onClick={' + self.handletableclick.bind(self, row) + '} >' + data + '</a>'
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