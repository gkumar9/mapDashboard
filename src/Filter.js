import React, { Component } from 'react';
import DRINKING_WATER_PUMP from './pins/strop3.png'
import ROOFTOP from './pins/strop2.png'
import IRRIGATION_PUMP from './pins/strop1.png'
import PATVAN from './pins/strop5patvan.png'
import MINIGRID from './pins/strop4.png'
class Filter extends Component{
	constructor(props){
		super(props)
		this.handleFilterChange=this.handleFilterChange.bind(this)
		this.handlefilterReset=this.handlefilterReset.bind(this)
		this.handlefilterApply=this.handlefilterApply.bind(this)
	}
	handleFilterChange(e){
		this.props.onChangeFilter(e.target.value);
	}
	handlefilterReset(){
		this.props.onFilterReset()
	}
	handlefilterApply(){
		this.props.onFilterApply()
	}
	render(){
		return(
			<div className="container ">
			  <nav id="filter" className="navbar navbar-default">
			    <div className="container-fluid">
			      <div className="navbar-header" data-toggle="collapse" data-target="#navbar2" aria-expanded="false" aria-controls="navbar">
			        <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar2" aria-expanded="false" aria-controls="navbar">
					  <span className="sr-only">Toggle navigation</span>
					  <span className="icon-bar top-bar"></span>
					  <span className="icon-bar middle-bar"></span>
					  <span className="icon-bar bottom-bar"></span>
					</button>
			        <div className="filterIcon"><img style={{'transform': 'rotate(90deg)','width': '7%','marginTop': '-8px'}}src="https://img.icons8.com/ios/32/000000/sorting-options.png" /> <span style={{'fontSize':'20px','margin':'5px'}}>Filters</span>
			        </div>
			      </div>
			      <div id="navbar2" className="navbar-collapse collapse">
			        <ul className="nav navbar-nav">
			          <li className="filterItem">
			          		<input type="checkbox" name="red" value="IRRIGATION_PUMP" checked={this.props.filter.IRRIGATION_PUMP} onChange={this.handleFilterChange}/>
			          		<img src={IRRIGATION_PUMP} alt="logo" className="filterImg responsive" />
			          		<span className="filterText" >Irrigation pump</span>
			          </li>
			          <li><a><span className="verticalLine"></span></a></li>
			          <li className="filterItem">
			          		<input type="checkbox" name="red" value="PATVAN" checked={this.props.filter.PATVAN} onChange={this.handleFilterChange} />
			          		<img src={PATVAN} alt="logo" className="filterImg responsive" />
			          		<span className="filterText" >Patvan</span>
			          </li>
			          <li><a><span className="verticalLine"></span></a></li>
			          <li className="filterItem">
			          		<input type="checkbox" name="red" value="DRINKING_WATER_PUMP" checked={this.props.filter.DRINKING_WATER_PUMP} onChange={this.handleFilterChange} />
			          		<img src={DRINKING_WATER_PUMP} alt="logo" className="filterImg responsive" />
			          		<span className="filterText" >Drinking water</span>
			          </li>
			          <li><a><span className="verticalLine"></span></a></li>
			          <li className="filterItem">
			          		<input type="checkbox" name="red" value="MINIGRID" checked={this.props.filter.MINIGRID} onChange={this.handleFilterChange} />
			          		<img src={MINIGRID} alt="logo" className="filterImg responsive" />
			          		<span className="filterText" >Minigrid</span>
			          </li>
			          <li><a><span className="verticalLine"></span></a></li>
			          <li className="filterItem">
			          		<input type="checkbox" name="red" value="ROOFTOP" checked={this.props.filter.ROOFTOP} onChange={this.handleFilterChange} />
			          		<img src={ROOFTOP} alt="logo" className="filterImg responsive" />
			          		<span className="filterText" >Rooftop</span>
			          </li>
			          		
			          
			        </ul>
			        <div className="filterbutton">
			        <button  type="button" className="btn btn-default filterbuttonreset" onClick={this.handlefilterReset} >Reset</button>
			        <button  type="button" className="btn btn-primary filterbuttonapply" onClick={this.handlefilterApply} >Apply</button>
			       </div>
			      </div>
			    </div>
			  </nav>
			</div>
			)
			
	}
}

export default Filter;
