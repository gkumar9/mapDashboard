	import React, { Component } from 'react';
	// import DRINKING_WATER_PUMP from './pins/DRINKING_WATER_PUMP.png'
	import { BrowserRouter as Router, Route, Link } from "react-router-dom";
	import RMS from './pins/RMS.png'
	import IAAS from './pins/IAAS.png'
	import MINIGRID from './pins/Minigrid(2).png'
	import HOME from './pins/ROOFTOP.png'
	import ROOFTOP from './pins/Rooftop(2).png'
	import rms from './rms.js'
	class Sidebar extends Component{
		render(){
			return(
					<aside className="main_sidebar">
					        <ul >
					            <Link to="/"><li title="Home" className="active"><a href="#" ><i><img style={{'width':'45%','marginLeft':'3px'}}src={HOME} /></i></a></li></Link>
					            <li title="RMS"><a target="_blank" rel="noopener noreferrer" href="../all_rms/locrmspage.html"><i><img src={RMS} /></i></a></li>
					            <li title="IAAS"><a target="_blank" rel="noopener noreferrer" href="../IAAS/menubar.html"><i><img src={IAAS} /></i></a></li>
					            <Link to="/rms"><li title="Solar Rooftop" ><a><i><img src={ROOFTOP} /></i></a></li></Link>
					            <li title="Minigrid"><a className="disabled"><i><img src={MINIGRID} /></i></a></li>
					        </ul>
				    </aside>
				)
		}
	}

	export default Sidebar;