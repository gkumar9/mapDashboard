import React, { Component } from 'react';
import Header from './Header.js'
import Sidebar from './Sidebar.js'
const mapStyles = {
  width: '100%',
  height: '100%',
  position:'relative',
  display: 'flex', 
  flexFlow: 'row nowrap', 
  justifyContent: 'center',
};

class Rms extends Component{
	render(){
		return(
			<div >  
        <Header />
        <div className="mainbody">
          <Sidebar />
          <div className="main">
            <div>Hello</div>
          </div>
        </div>
        </div>
			)
	}
}

export default Rms;