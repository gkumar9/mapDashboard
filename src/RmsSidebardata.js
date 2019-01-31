import React, { Component } from "react";
import CO2 from "./pins/1.png";
import FLOW from "./pins/2.png";
import SOLARENERGY from "./pins/3.png";
import SUBMERSIBLE from "./pins/4.png";
import STATES from "./pins/5.png";
class RmsSidebardata extends Component {
  render() {
    return (
      <div
        style={{
          borderRightStyle: "groove",
          minHeight: "100vh",
          textAlign: "center"
        }}
        className="col-xs-2 rmssidebar"
      >
        <h4 style={{ marginTop: "40px", color: "gray", fontSize: "25px" }}>
          Our Impact
        </h4>
        <ul style={{ marginTop: "40px", color: "black" }}>
          <li className="rmssidebar">
            <div className="row">
              <div className="col-xs-3">
                <img
                  className="responsive"
                  alt="CO2"
                  src={CO2}
                  style={{ width: "46px",marginLeft:'-11px' }}
                />
              </div>
              <div className="col-xs-9">
                <span>
                  <b>{this.props.allassetstat.totalCo2Emission} tonnes</b>
                </span>
                <p>
                  <small>CO2 avoided</small>
                </p>
              </div>
            </div>
          </li>
          <li className="rmssidebar">
            <div className="row">
              <div className="col-xs-3">
                <img
                  className="responsive"
                  alt="flow"
                  src={FLOW}
                  style={{ width: "32px",marginLeft:'-11px' }}
                />
              </div>
              <div className="col-xs-9">
                <span>
                  <b>{this.props.allassetstat.totalDischarge} kL</b>
                </span>
                <p>
                  <small>Water pumped</small>
                </p>
              </div>
            </div>
          </li>
          <li className="rmssidebar">
            <div className="row">
              <div className="col-xs-3">
                <img
                  className="responsive"
                  alt="SOLARENERGY"
                  src={SOLARENERGY}
                  style={{ width: "37px",marginLeft:'-11px' }}
                />
              </div>
              <div className="col-xs-9">
                <span>
                  <b>{this.props.allassetstat.totalEnergy} GWh</b>
                </span>
                <p>
                  <small>Energy generated</small>
                </p>
              </div>
            </div>
          </li>
          <li className="rmssidebar">
            <div className="row">
              <div className="col-xs-3">
                <img
                  className="responsive"
                  alt="submersible"
                  src={SUBMERSIBLE}
                  style={{ width: "42px",marginLeft:'-11px' }}
                />
              </div>
              <div className="col-xs-9">
              {this.props.states !== undefined ? (
                  <div>
                    <span>
                      <b>{this.props.pump}</b>
                    </span>
                    <p>
                      <small>Pump Installed</small>
                    </p>
                  </div>
                ) : (
                  <div>
                    <span>
                      <b>{this.props.rmscapacity}</b>
                    </span>
                    <p>
                      <small>Capacity</small>
                    </p>
                  </div>
                )}
                
              </div>
            </div>
          </li>
          <li className="rmssidebar">
            <div className="row">
              <div className="col-xs-3">
                <img
                  className="responsive"
                  alt="states"
                  src={STATES}
                  style={{ width: "42px",marginLeft:'-11px' }}
                />
              </div>
              <div className="col-xs-9">
                {this.props.states !== undefined ? (
                  <div>
                    <span>
                      <b>{this.props.states}</b>
                    </span>
                    <p>
                      <small>States in India</small>
                    </p>
                  </div>
                ) : (
                  <div>
                    <span>
                      <b>{this.props.rmsubstate.district}</b>
                    </span>
                    <p>
                      <small>{this.props.rmsubstate.state}</small>
                    </p>
                  </div>
                )}
              </div>
            </div>
          </li>
        </ul>
      </div>
    );
  }
}

export default RmsSidebardata;
