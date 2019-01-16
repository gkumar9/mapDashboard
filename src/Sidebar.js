	import React, { Component } from 'react';
	import DRINKING_WATER_PUMP from './pins/DRINKING_WATER_PUMP.png'
	import IRRIGATION_PUMP from './pins/IRRIGATION_PUMP.png'
	import PATVAN from './pins/PATVAN.png'
	import MINIGRID from './pins/MINIGRID.png'
	import ROOFTOP from './pins/ROOFTOP.png'
	class Sidebar extends Component{
		render(){
			return(
					<aside className="main_sidebar">
					        <ul >
					            <li title="Home" className="active"><a href="#" ><i><img src={ROOFTOP} /></i></a></li>
					            <li title="Pump RMS"><a target="_blank" rel="noopener noreferrer" href="../all_rms/locrmspage.html"><i><img src={IRRIGATION_PUMP} /></i></a></li>
					            <li title="Drinking Water Pump" ><a target="_blank" rel="noopener noreferrer" href="../all_rms/locrmspage.html"><i><img src={DRINKING_WATER_PUMP} /></i></a></li>
					            <li title="Patvan"><a target="_blank" rel="noopener noreferrer" href="../IAAS/menubar.html"><i><img src={PATVAN} /></i></a></li>
					            <li title="Minigrid"><a href="#" className="disabled"><i><img src={MINIGRID} /></i></a></li>
					        </ul>
					    </aside>
				)
		}
	}

	export default Sidebar;