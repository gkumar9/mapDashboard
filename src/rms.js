import React, { Component } from 'react';
import Header from './Header.js'
import Sidebar from './Sidebar.js'
import Filter from './Filter.js'
import CO2 from './pins/CO2.png'
import FLOW from './pins/flow.png'
import SOLARENERGY from './pins/solar.jpg'
import SUBMERSIBLE from './pins/submersible.png'
import STATES from './pins/states.png'
// import Tbl from './tbl.js'
const $ = require('jquery')
$.DataTable=require('datatables.net')

const mapStyles = {
  width: '100%',
  height: '100%',
  position:'relative',
  display: 'flex', 
  flexFlow: 'row nowrap', 
};

class RmsHeader extends Component{
  render(){
    return(
        <div className="container ">
          <nav id="filter" className="navbar navbar-default">
            <div className="container-fluid" style={{'text-align':'center'}}>                 
            <button style={{'marginTop':'6px','background-color': 'lightgray','float': 'left'}} type="button" class="btn btn-default" aria-label="Left Align"><span  class="glyphicon glyphicon-menu-left" style={{'marginRight':'6px'}} aria-hidden="true"></span>Home </button>
            <span style={{'font-size': 'x-large','color':'blue'}}>Remote Monitoring System </span>
            </div>
          </nav>
        </div>
      )
  }
}
class RmsSidebardata extends Component{
  render(){
    return(
        
            <div style={{'border-right-style': 'groove','min-height': '100vh','text-align':'center'}} className="col-xs-3">
              <h4 style={{'marginTop':'40px','color':'gray','font-size': '25px'}}>Our Impact</h4>
              <ul style={{'marginTop':'40px','color':'gray'}}>
                <li className="rmssidebar">
                  <div className="row">
                    <div className="col-xs-3">
                      <img src={CO2} style={{'width':'46px'}}  />
                    </div>
                    <div className="col-xs-9">
                    <span><b>10127.93 tonnes</b></span>
                    <p ><small>CO2 avoided</small></p>
                    </div>
                  </div>
                </li>
                <li className="rmssidebar">
                  <div className="row">
                    <div className="col-xs-3">
                      <img src={FLOW} style={{'width':'32px'}}  />
                    </div>
                    <div className="col-xs-9">
                    <span ><b>105442.0 kL</b></span>
                    <p ><small>Water pumped</small></p>
                    </div>
                  </div>
                </li>
                <li className="rmssidebar">
                  <div className="row">
                    <div className="col-xs-3">
                      <img src={SOLARENERGY} style={{'width':'37px'}}  />
                    </div>
                    <div className="col-xs-9">
                    <span ><b>10.4 GWh</b></span>
                    <p ><small>Energy generated</small></p>
                    </div>
                  </div>
                </li>
                <li className="rmssidebar">
                  <div className="row">
                    <div className="col-xs-3">
                      <img src={SUBMERSIBLE} style={{'width':'42px'}}  />
                    </div>
                    <div className="col-xs-9">
                    <span ><b>6581</b></span>
                    <p ><small>Pump Installed</small></p>
                    </div>
                  </div>
                </li>
                <li className="rmssidebar">
                  <div className="row">
                    <div className="col-xs-3">
                      <img src={STATES} style={{'width':'42px'}}  />
                    </div>
                    <div className="col-xs-9">
                    <span ><b>14</b></span>
                    <p ><small>States in India</small></p>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
            
      )
  }
}
class Rmsdatatable extends Component {
  componentDidMount(){
    this.$el=$(this.el)
    this.$el.DataTable(
    {
      data: this.props.data,
      columns: [
          { title: "Name" },
          { title: "Position" },
          { title: "Office" },
          { title: "Extn." },
          { title: "Start date" },
          { title: "Salary" }
      ]
    }
      )
  }
  componentWillUnMount(){

  }
  render(){
    return(
      <div style={{'max-height': '651px', 'overflow':'auto'}} className="col-xs-9">
        <table className="display" width="100%" ref={el=>this.el=el}></table>
      </div>
          
      )
  }
} 
class Rms extends Component{
  dataSet = [
    [ "Tiger Nixon", "System Architect", "Edinburgh", "5421", "2011/04/25", "$320,800" ],
    [ "Garrett Winters", "Accountant", "Tokyo", "8422", "2011/07/25", "$170,750" ],
    [ "Ashton Cox", "Junior Technical Author", "San Francisco", "1562", "2009/01/12", "$86,000" ],
    [ "Cedric Kelly", "Senior Javascript Developer", "Edinburgh", "6224", "2012/03/29", "$433,060" ],
    [ "Airi Satou", "Accountant", "Tokyo", "5407", "2008/11/28", "$162,700" ],
    [ "Brielle Williamson", "Integration Specialist", "New York", "4804", "2012/12/02", "$372,000" ],
    [ "Herrod Chandler", "Sales Assistant", "San Francisco", "9608", "2012/08/06", "$137,500" ],
    [ "Rhona Davidson", "Integration Specialist", "Tokyo", "6200", "2010/10/14", "$327,900" ],
    [ "Colleen Hurst", "Javascript Developer", "San Francisco", "2360", "2009/09/15", "$205,500" ],
    [ "Sonya Frost", "Software Engineer", "Edinburgh", "1667", "2008/12/13", "$103,600" ],
    [ "Jena Gaines", "Office Manager", "London", "3814", "2008/12/19", "$90,560" ],
    [ "Quinn Flynn", "Support Lead", "Edinburgh", "9497", "2013/03/03", "$342,000" ],
    [ "Charde Marshall", "Regional Director", "San Francisco", "6741", "2008/10/16", "$470,600" ],
    [ "Haley Kennedy", "Senior Marketing Designer", "London", "3597", "2012/12/18", "$313,500" ],
    [ "Tatyana Fitzpatrick", "Regional Director", "London", "1965", "2010/03/17", "$385,750" ],
    [ "Michael Silva", "Marketing Designer", "London", "1581", "2012/11/27", "$198,500" ],
    [ "Paul Byrd", "Chief Financial Officer (CFO)", "New York", "3059", "2010/06/09", "$725,000" ],
    [ "Gloria Little", "Systems Administrator", "New York", "1721", "2009/04/10", "$237,500" ],
    [ "Bradley Greer", "Software Engineer", "London", "2558", "2012/10/13", "$132,000" ],
    [ "Dai Rios", "Personnel Lead", "Edinburgh", "2290", "2012/09/26", "$217,500" ],
    [ "Jenette Caldwell", "Development Lead", "New York", "1937", "2011/09/03", "$345,000" ],
    [ "Yuri Berry", "Chief Marketing Officer (CMO)", "New York", "6154", "2009/06/25", "$675,000" ],
    [ "Caesar Vance", "Pre-Sales Support", "New York", "8330", "2011/12/12", "$106,450" ],
    [ "Doris Wilder", "Sales Assistant", "Sidney", "3023", "2010/09/20", "$85,600" ],
    [ "Angelica Ramos", "Chief Executive Officer (CEO)", "London", "5797", "2009/10/09", "$1,200,000" ],
    [ "Gavin Joyce", "Developer", "Edinburgh", "8822", "2010/12/22", "$92,575" ],
    [ "Jennifer Chang", "Regional Director", "Singapore", "9239", "2010/11/14", "$357,650" ],
    [ "Brenden Wagner", "Software Engineer", "San Francisco", "1314", "2011/06/07", "$206,850" ],
    [ "Fiona Green", "Chief Operating Officer (COO)", "San Francisco", "2947", "2010/03/11", "$850,000" ],
    [ "Shou Itou", "Regional Marketing", "Tokyo", "8899", "2011/08/14", "$163,000" ],
    [ "Michelle House", "Integration Specialist", "Sidney", "2769", "2011/06/02", "$95,400" ],
    [ "Suki Burks", "Developer", "London", "6832", "2009/10/22", "$114,500" ],
    [ "Prescott Bartlett", "Technical Author", "London", "3606", "2011/05/07", "$145,000" ],
    [ "Gavin Cortez", "Team Leader", "San Francisco", "2860", "2008/10/26", "$235,500" ],
    [ "Martena Mccray", "Post-Sales support", "Edinburgh", "8240", "2011/03/09", "$324,050" ],
    [ "Unity Butler", "Marketing Designer", "San Francisco", "5384", "2009/12/09", "$85,675" ]
];
	render(){
		return(
			<div >  
        <Header />
        <div className="mainbody">
          <Sidebar />
          <div style={{'background-color':'#F2F2F2'}}className="main">
            <RmsHeader />
            <div className="container">
              <div className="row">
              <RmsSidebardata />
              <Rmsdatatable data={this.dataSet} />
              </div>
            </div>
            
          </div>
        </div>
        </div>
			)
	}
}

export default Rms;