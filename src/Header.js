import React, { Component } from 'react';
import logo from './logo.png'
import axios from 'axios'
import config from './config.js'
import DRINKING_WATER_PUMP from './pins/DRINKING_WATER_PUMP.png'
import IRRIGATION_PUMP from './pins/IRRIGATION_PUMP.png'
import PATVAN from './pins/PATVAN.png'
import MINIGRID from './pins/MINIGRID.png'
import ROOFTOP from './pins/ROOFTOP.png'
class Header extends Component{
	constructor(props){
		super(props)
		this.handleSignout=this.handleSignout.bind(this)
	}
	handleSignout(){
		console.log('sign out')
		axios.get(config.LogoutServlet).then(()=>{
			window.location.href='../login.html?redirect=maps';
		})
	}
	render(){
		return(
			<div className="container">
			  <nav className="navbar navbar-default">
			    <div className="container-fluid">
			      <div className="navbar-header">
			        <button type="button" className="navbar-toggle collapsed headerbutton" data-toggle="collapse" data-target="#navbar1">
			          <span className="sr-only">Toggle navigation</span>
			          <span className="icon-bar"></span>
			          <span className="icon-bar"></span>
			          <span className="icon-bar"></span>
			        </button>
			        <a className="navbar-brand" href="/home"><img src={logo} alt="logo" />
			        </a>
			      </div>
			      <div id="navbar1" className="navbar-collapse collapse gaurav">
			        <ul className="nav navbar-nav">

			          <li className="sidebarheader"><a target="_blank" rel="noopener noreferrer" href="https://dashboard.claroenergy.in/all_rms/locrmspage.html"><img alt="irrigation" src={IRRIGATION_PUMP} />Irrigation Pump</a></li>
			          <li className="sidebarheader"><a><span className="verticalLine"></span></a></li>
			          <li className="sidebarheader"><a href="#" className="disabled"><img alt="patvan" src={PATVAN} />Patvan</a></li>
			          <li className="sidebarheader"><a><span className="verticalLine"></span></a></li>
			          <li className="sidebarheader"><a href="/dashboard"><img alt="DRINKING_WATER_PUMP" src={DRINKING_WATER_PUMP} />Drinking Water Pump</a></li>
			          <li className="sidebarheader"><a><span className="verticalLine"></span></a></li>
			          <li className="sidebarheader"><a href="#" className="disabled"><img alt="Minigrid" src={MINIGRID} />Minigrid</a></li>
			          <li className="sidebarheader"><a><span className="verticalLine"></span></a></li>
			          <li className="sidebarheader"><a href="#" className="disabled"><img alt="Rooftop" src={ROOFTOP} />Rooftop</a></li>
			          <li className="headerdivider"></li>
			          <li ><a >Welcome User</a></li>
			          <li ><a><span className="verticalLine"></span></a></li>
			          <li ><a target="_blank" rel="noopener noreferrer" href="../OpsDashboard/index.html" >Operations</a></li>
			          <li ><a><span className="verticalLine"></span></a></li>
			          <li ><a onClick={this.handleSignout}>Sign Out</a></li>
			          
			        </ul>
			      </div>
			    </div>
			  </nav>
			</div>
			)
	}
}

export default Header;