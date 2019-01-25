import React, { Component } from 'react';
import CO2 from './pins/CO2.png'
import FLOW from './pins/flow.png'
import SOLARENERGY from './pins/solar.jpg'
import SUBMERSIBLE from './pins/submersible.png'
import STATES from './pins/states.png'
class RmsSidebardata extends Component{
  render(){
    return(
        
            <div style={{'borderRightStyle': 'groove','minHeight': '100vh','textAlign':'center'}} className="col-xs-2">
              <h4 style={{'marginTop':'40px','color':'gray','fontSize': '25px'}}>Our Impact</h4>
              <ul style={{'marginTop':'40px','color':'gray'}}>
                <li className="rmssidebar">
                  <div className="row">
                    <div className="col-xs-3">
                      <img className="responsive" alt="CO2" src={CO2} style={{'width':'46px'}}  />
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
                      <img className="responsive" alt="flow" src={FLOW} style={{'width':'32px'}}  />
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
                      <img className="responsive" alt="SOLARENERGY" src={SOLARENERGY} style={{'width':'37px'}}  />
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
                      <img className="responsive" alt="submersible" src={SUBMERSIBLE} style={{'width':'42px'}}  />
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
                      <img className="responsive" alt="states" src={STATES} style={{'width':'42px'}}  />
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

export default RmsSidebardata;