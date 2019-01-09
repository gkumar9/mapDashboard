import React, { Component } from 'react';
import Map from './Maps.js'
import Header from './Header.js'
import Sidebar from './Sidebar.js'
import Filter from './Filter.js'
import axios from 'axios'
import config from './config.js'
class Main extends Component{
	constructor(props){
		super(props)
		this.state={pins:[],filter:{Irrigation:true,Patvan:true,Drinking:true,Minigrid:true,Rooftop:true}}
	}

	componentDidMount(){
		axios({
			url:config.allpins,
			method:'POST',
			data:{
				temp:"temp"
			},
			headers:{
				'Content-Type': 'application/json'
			}
		})
		.then((res)=>{
			console.log('res:',res)
			if(res!==undefined){
				this.setState({pins:res.data.data.list})
			}else{
				console.log('eror')
			}
		})
		.catch((e)=>{
			console.log('e:',e)
		})
	}

	render(){
		return(		 
				<div> 	
			  	<Header />
			  	<div className="mainbody">
				  	<Sidebar />
				  	<div className="main">
				  		<Filter filter={this.state.filter}/>
				  		<Map datapins={this.state.pins} filter={this.state.filter} />
				  	</div>
			  	</div>
			  	</div>
			)
	}
}

export default Main;