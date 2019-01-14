import React, { Component } from 'react';
import Map from './Maps.js'
import Header from './Header.js'
import Sidebar from './Sidebar.js'
import Filter from './Filter.js'
import axios from 'axios'
import config from './config.js'
import Swal from 'sweetalert2'
class Main extends Component{
	constructor(props){
		super(props)
		this.state={allpins:[],filteredpins:[],filter:{IRRIGATION_PUMP:true,PATVAN:true,DRINKING_WATER_PUMP:true,MINIGRID:true,ROOFTOP:true}}
		this.handleFilterChange=this.handleFilterChange.bind(this)
	}

	handleFilterChange(filtervalue){
		let filterpins=[];
		if(this.state.filter[filtervalue]){
			this.state.filteredpins.map((item,key)=>{
			if(item.assetType!==filtervalue){
				filterpins.push(item)
			}
		})
		this.setState(
		  prevState => ({
		    ...prevState,
		    filter: {
		      ...prevState.filter,
		      [filtervalue]: !prevState.filter[filtervalue]
		    },
		    filteredpins:filterpins
		  })
		  )
		}
		else{
			this.state.allpins.map((item,key)=>{
			if(item.assetType===filtervalue){
				filterpins.push(item)
			}
		})
		this.setState(
		  prevState => ({
		    ...prevState,
		    filter: {
		      ...prevState.filter,
		      [filtervalue]: !prevState.filter[filtervalue]
		    },
		    filteredpins:prevState.filteredpins.concat(filterpins)
		  })
		  )
		}
		
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
			if(res.data.data!==null){
				this.setState({allpins:res.data.data.list,filteredpins:res.data.data.list})
			}
			else if(res.data.error!==undefined){
		        if(res.data.error.errorCode===153){
		          window.location.href='../login.html?redirect=dashboard';
		        }
		        else{
		          Swal({
		            type: 'error',
		            title: 'Oops...',
		            text: res.data.error.errorMsg,
		          })
		        }
		      }
		})
		.catch((e)=>{
			Swal({
        type: 'error',
        title: 'Oops...',
        text: e,
      })
		})
	}

	render(){
		return(		 
				<div> 	
			  	<Header />
			  	<div className="mainbody">
				  	<Sidebar />
				  	<div className="main">
				  		<Filter filter={this.state.filter} onChangeFilter={this.handleFilterChange} />
				  		<Map datapins={this.state.filteredpins} filter={this.state.filter} />
				  	</div>
			  	</div>
			  	</div>
			)
	}
}

export default Main;