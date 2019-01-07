import React, { Component } from 'react';

class Sidebar extends Component{
	render(){
		return(
				<aside className="main_sidebar">
				        <ul >
				            <li className="active"><a href="/"><i className="fa fa-home "></i></a></li>
				            <li><a href="/"><i className="fa fa-battery-2"></i></a></li>
				            <li><a href="/"><i className="fa fa-truck"></i></a></li>
				            <li><a href="/"><i className="fa fa-bicycle"></i></a></li>
				            <li><a href="/"><i className="fa fa-sun-o"></i></a></li>
				        </ul>
				    </aside>
			)
	}
}

export default Sidebar;