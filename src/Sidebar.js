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
					            <li title="Home" className="active"><a href="/dashboard"><i><img src={ROOFTOP} /></i></a></li>
					            <li title="Coming Soon" ><a href="/dashboard"><i><img src={DRINKING_WATER_PUMP} /></i></a></li>
					            <li title="Coming Soon"><a href="#"><i><img src={IRRIGATION_PUMP} /></i></a></li>
					            <li title="Coming Soon"><a href="#"><i><img src={PATVAN} /></i></a></li>
					            <li title="Coming Soon"><a href="#"><i><img src={MINIGRID} /></i></a></li>
					        </ul>
					    </aside>
				)
		}
	}

	export default Sidebar;