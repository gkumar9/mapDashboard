	import React, { Component } from 'react';
	// import DRINKING_WATER_PUMP from './pins/DRINKING_WATER_PUMP.png'
	import RMS from './pins/RMS.png'
	import IAAS from './pins/IAAS.png'
	import MINIGRID from './pins/Minigrid(2).png'
	import HOME from './pins/ROOFTOP.png'
	import ROOFTOP from './pins/Rooftop(2).png'
	class Sidebar extends Component{
		render(){
			return(
					<aside className="main_sidebar">
					        <ul >
					            <li title="Home" className="active"><a href="#" ><i><img style={{'width':'45%','marginLeft':'3px'}}src={HOME} /></i></a></li>
					            <li title="RMS"><a target="_blank" rel="noopener noreferrer" href="../all_rms/locrmspage.html"><i><img src={RMS} /></i></a></li>
					            <li title="IAAS"><a target="_blank" rel="noopener noreferrer" href="../IAAS/menubar.html"><i><img src={IAAS} /></i></a></li>
					            <li title="Solar Rooftop" ><a href="#" className="disabled"><i><img src={ROOFTOP} /></i></a></li>
					            <li title="Minigrid"><a href="#" className="disabled"><i><img src={MINIGRID} /></i></a></li>
					        </ul>
					    </aside>
				)
		}
	}

	export default Sidebar;