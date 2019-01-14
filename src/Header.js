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
			window.location.href='../login.html?redirect=dashboard';
		})
	}
	render(){
		return(
			<div className="container">
			  <nav className="navbar navbar-default">
			    <div className="container-fluid">
			      <div className="navbar-header">
			        <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar1">
			          <span className="sr-only">Toggle navigation</span>
			          <span className="icon-bar"></span>
			          <span className="icon-bar"></span>
			          <span className="icon-bar"></span>
			        </button>
			        <a className="navbar-brand" href="/dashboard"><img src={logo} alt="logo" />
			        </a>
			      </div>
			      <div id="navbar1" className="navbar-collapse collapse gaurav">
			        <ul className="nav navbar-nav">

			          <li className="sidebarheader"><a href="/dashboard"><img src={IRRIGATION_PUMP} />Irrigation Pump</a></li>
			          <li className="sidebarheader"><a><span className="verticalLine"></span></a></li>
			          <li className="sidebarheader"><a href="/dashboard"><img src={PATVAN} />Patvan</a></li>
			          <li className="sidebarheader"><a><span className="verticalLine"></span></a></li>
			          <li className="sidebarheader"><a href="/dashboard"><img src={DRINKING_WATER_PUMP} />Drinking Water Pump</a></li>
			          <li className="sidebarheader"><a><span className="verticalLine"></span></a></li>
			          <li className="sidebarheader"><a href="/dashboard"><img src={MINIGRID} />Minigrid</a></li>
			          <li className="sidebarheader"><a><span className="verticalLine"></span></a></li>
			          <li className="sidebarheader"><a href="/dashboard"><img src={ROOFTOP} />Rooftop</a></li>
			          <li className="headerdivider"></li>
			          <li ><a href="/dashboard" >Welcome User</a></li>
			          <li ><a><span className="verticalLine"></span></a></li>
			          <li ><a href="#"onClick={this.handleSignout}>Sign Out</a></li>
			          
			        </ul>
			      </div>
			    </div>
			  </nav>
			</div>
			)
	}
}

export default Header;