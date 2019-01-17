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
		this.handleReset=this.handleReset.bind(this)
		this.handleApply=this.handleApply.bind(this)
	}
	handleReset(){
		let newfilter={IRRIGATION_PUMP:true,PATVAN:true,DRINKING_WATER_PUMP:true,MINIGRID:true,ROOFTOP:true}
		this.setState(
		  prevState => ({
		    ...prevState,
		    filter:newfilter,
		    filteredpins:prevState.allpins
		  })
		  )
	}
	handleApply(){
		let filterpins=[];
		this.state.allpins.map((item,key)=>{
			if(this.state.filter[item.assetType]){
				filterpins.push(item)
			}
		})
		this.setState(
		  prevState => ({
		    ...prevState,
		    filteredpins:filterpins
		  })
		  )

	}
	handleFilterChange(filtervalue){
		this.setState(
		  prevState => ({
		    ...prevState,
		    filter: {
		      ...prevState.filter,
		      [filtervalue]: !prevState.filter[filtervalue]
		    }
		  })
		  )	
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
		          window.location.href='../login.html?redirect=maps';
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
				  		<Filter filter={this.state.filter} onChangeFilter={this.handleFilterChange} onFilterReset={this.handleReset} onFilterApply={this.handleApply}/>
				  		<Map datapins={this.state.filteredpins} filter={this.state.filter} />
				  	</div>
			  	</div>
			  	</div>
			)
	}
}

export default Main;