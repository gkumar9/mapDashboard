import React, { Component } from 'react';
import Map from './Maps.js'
import logo from './logo.png'

class Header extends Component{
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
			        <a className="navbar-brand" href="/"><img src={logo} alt="logo" />
			        </a>
			      </div>
			      <div id="navbar1" className="navbar-collapse collapse gaurav">
			        <ul className="nav navbar-nav">
			          <li ><a href="/" >Support</a></li>
			          <li><a><span className="verticalLine"></span></a></li>
			          <li className="dropdown">
			            <a href="/" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false">Aiswarya <span className="caret"></span></a>
			            <ul className="dropdown-menu" role="menu">
			              <li><a href="/">Action</a></li>
			              <li><a href="/">Another action</a></li>
			              <li><a href="/">Something else here</a></li>
			              <li className="divider"></li>
			              <li className="dropdown-header">Nav header</li>
			              <li><a href="/">Separated link</a></li>
			              <li><a href="/">One more separated link</a></li>
			            </ul>
			          </li>
			          <li><a><span className="verticalLine"></span></a></li>
			          <li ><a href="/">Sign Out</a></li>
			        </ul>
			      </div>
			    </div>
			  </nav>
			</div>
			)
	}
}

class Main extends Component{
	render(){
		return(		 
					<div> 	
				  	<Header />
				  	<div className="mainbody">
				  	<aside className="main_sidebar">
				        <ul>
				            <li><a href="#"><i className="fa fa-home"></i></a></li>
				            <li><a href="#"><i className="fa fa-battery-2"></i></a></li>
				            <li><a href="#"><i className="fa fa-truck"></i></a></li>
				            <li><a href="#"><i className="fa fa-bicycle"></i></a></li>
				            <li><a href="#"><i className="fa fa-bicycle"></i></a></li>
				        </ul>
				    </aside>
				  	<div className="main">
				  	<Map />
				  	</div>
				  	</div>
				  	</div>
			)
	}
}

export default Main;