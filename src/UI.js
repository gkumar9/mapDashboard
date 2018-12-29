import React, { Component } from 'react';
import Map from './Maps.js'
import logo from './logo.png'

class Header extends Component{
	render(){
		return(
			<div class="container">
			  <nav class="navbar navbar-default">
			    <div class="container-fluid">
			      <div class="navbar-header">
			        <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar1">
			          <span class="sr-only">Toggle navigation</span>
			          <span class="icon-bar"></span>
			          <span class="icon-bar"></span>
			          <span class="icon-bar"></span>
			        </button>
			        <a class="navbar-brand" href="/"><img src={logo} />
			        </a>
			      </div>
			      <div id="navbar1" class="navbar-collapse collapse gaurav">
			        <ul class="nav navbar-nav">
			          <li class="active"><a href="#">Home</a></li>
			          <li><a href="#">About</a></li>
			          <li><a href="#">Contact</a></li>
			          <li class="dropdown">
			            <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false">Dropdown <span class="caret"></span></a>
			            <ul class="dropdown-menu" role="menu">
			              <li><a href="#">Action</a></li>
			              <li><a href="#">Another action</a></li>
			              <li><a href="#">Something else here</a></li>
			              <li class="divider"></li>
			              <li class="dropdown-header">Nav header</li>
			              <li><a href="#">Separated link</a></li>
			              <li><a href="#">One more separated link</a></li>
			            </ul>
			          </li>
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
				  	<Map />
				  	</div>
			)
	}
}

export default Main;