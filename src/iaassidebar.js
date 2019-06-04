import React, { Component } from "react";
import CO2 from "./pins/1.png";
import FLOW from "./pins/2.png";
import SOLARENERGY from "./pins/3.png";
import SUBMERSIBLE from "./pins/4.png";
import STATES from "./pins/5.png";

class IaasSidebar extends Component {
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
        <h4 style={{ marginTop: "40px", color: "gray", fontSize: "large" }}>
          Our Impact
        </h4>
        <ul style={{ marginTop: "40px", color: "black" }}>
          <li className="rmssidebar">
            <div className="row">
              <div className="col-xs-3">
                <img
                  alt="CO2"
                  src={CO2}
                  style={{ width: "46px", marginLeft: "-11px" }}
                />
              </div>
              <div className="col-xs-9">
                <span>
                  <b>{this.props.statsdata.co2Saved} Kg</b>
                </span>
                <p>
                  <small>CO2 Saved</small>
                </p>
              </div>
            </div>
          </li>
          <li className="rmssidebar">
            <div className="row">
              <div className="col-xs-3">
                <img
                  alt="flow"
                  src={FLOW}
                  style={{ width: "32px", marginLeft: "-11px" }}
                />
              </div>
              <div className="col-xs-9">
                <span>
                  <b>{this.props.statsdata.waterDischarged} kL</b>
                </span>
                <p>
                  <small>Water Discharged</small>
                </p>
              </div>
            </div>
          </li>
          <li className="rmssidebar">
            <div className="row">
              <div className="col-xs-3">
                <img
                  alt="SOLARENERGY"
                  src={SOLARENERGY}
                  style={{ width: "37px", marginLeft: "-11px" }}
                />
              </div>
              <div className="col-xs-9">
                <span>
                  <b>{this.props.statsdata.landIrrigated} Acre</b>
                </span>
                <p>
                  <small>Land Irrigated</small>
                </p>
              </div>
            </div>
          </li>
          <li className="rmssidebar">
            <div className="row">
              <div className="col-xs-3">
                <img
                  alt="submersible"
                  src={SUBMERSIBLE}
                  style={{ width: "42px", marginLeft: "-11px" }}
                />
              </div>
              <div className="col-xs-9">
                <span>
                  <b>{this.props.statsdata.noOfPatvans}</b>
                </span>
                <p>
                  <small>No of Patvans</small>
                </p>
              </div>
            </div>
          </li>
          <li className="rmssidebar">
            <div className="row">
              <div className="col-xs-3">
                <img
                  alt="states"
                  src={STATES}
                  style={{ width: "42px", marginLeft: "-11px" }}
                />
              </div>
              <div className="col-xs-9">
                <span>
                  <b>{this.props.statsdata.noOfFarmers}</b>
                </span>
                <p>
                  <small>No of Farmers</small>
                </p>
              </div>
            </div>
          </li>
        </ul>
      </div>
    );
  }
}

export default IaasSidebar;
