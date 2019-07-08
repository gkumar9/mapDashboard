import React, { Component } from "react";
import CO2 from "./pins/1.png";
import FLOW from "./pins/2.png";
import LAND from "./pins/land.png";
import PATVAN from "./pins/tuk-tuk.png";
import FARMER from "./pins/farmer 3.png";
import ACTIVE from "./pins/placeholder.png";

class IaasSidebar extends Component {
  render() {
    return (
      <div
        style={{
          
          textAlign: "center",
          padding: "1em"
        }}
        className="col-xs-3 rmssidebar"
      >
        <div
          style={{
            background: "#F2F2F2",
            padding: "0.3em",
            borderRadius: "0.5em"
          }}
        >
          <h4
            style={{
              marginTop: "20px",
              color: "#b12d28",
              fontSize: "large",
              fontFamily: "gotham-medium"
            }}
          >
            Our Impact
          </h4>
          <ul style={{ marginTop: "20px", color: "black", paddingInlineStart:"20px"}}>
            <li className="rmssidebar">
              <div className="row">
              <div className="col-xs-1"/>
                <div className="col-xs-4">
                  <img
                    alt="CO2"
                    src={CO2}
                    style={{ width: "42px", marginLeft: "-11px" }}
                  />
                </div>
                <div className="col-xs-5">
                  <span className="iaassidebartext">
                    <b>{this.props.statsdata.co2Saved} Kg</b>
                  </span>
                  <p>
                    <small>CO2 Saved</small>
                  </p>
                </div>
                <div className="col-xs-1"/>
              </div>
            </li>
            <li className="rmssidebar">
              <div className="row">
              <div className="col-xs-1"/>
                <div className="col-xs-4">
                  <img
                    alt="flow"
                    src={FLOW}
                    style={{ width: "36px", marginLeft: "-11px" }}
                  />
                </div>
                <div className="col-xs-5">
                  <span className="iaassidebartext">
                    <b>{this.props.statsdata.waterDischarged} kL</b>
                  </span>
                  <p>
                    <small>Water Discharged</small>
                  </p>
                </div>
                <div className="col-xs-1"/>
              </div>
            </li>
            <li className="rmssidebar">
              <div className="row">
              <div className="col-xs-1"/>
                <div className="col-xs-4">
                  <img
                    alt="Land"
                    src={LAND}
                    style={{
                      width: "34px",
                      marginLeft: "-11px",
                      filter: "contrast(0)"
                    }}
                  />
                </div>
                <div className="col-xs-5">
                  <span className="iaassidebartext">
                    <b>{this.props.statsdata.landIrrigated} Acre</b>
                  </span>
                  <p>
                    <small>Land Irrigated</small>
                  </p>
                </div>
                <div className="col-xs-1"/>
              </div>
            </li>
            <li className="rmssidebar">
              <div className="row">
              <div className="col-xs-1"/>
                <div className="col-xs-4">
                  <img
                    alt="PATVAN"
                    src={PATVAN}
                    style={{
                      width: "37px",
                      marginLeft: "-11px",
                      filter: "contrast(0)"
                    }}
                  />
                </div>
                <div className="col-xs-5">
                  <span className="iaassidebartext">
                    <b>{this.props.statsdata.noOfPatvans}</b>
                  </span>
                  <p>
                    <small>No of Patvans</small>
                  </p>
                </div>
                <div className="col-xs-1"/>
              </div>
            </li>
            <li className="rmssidebar">
              <div className="row">
              <div className="col-xs-1"/>
                <div className="col-xs-4">
                  <img
                    alt="FARMER"
                    src={FARMER}
                    style={{
                      width: "37px",
                      marginLeft: "-11px",
                      filter: "contrast(0)"
                    }}
                  />
                </div>
                <div className="col-xs-5">
                  <span className="iaassidebartext">
                    <b>{this.props.statsdata.noOfFarmers}</b>
                  </span>
                  <p>
                    <small>No of Farmers</small>
                  </p>
                </div>
                <div className="col-xs-1"/>
              </div>
            </li>
          </ul>
        </div>
        <div
          style={{
            background: "#F2F2F2",
            padding: "0.3em",
            borderRadius: "0.5em",
            marginTop: "20px"
          }}
        >
          <h4
            style={{
              marginTop: "20px",
              color: "#b12d28",
              fontSize: "large",
              fontFamily: "gotham-medium"
            }}
          >
            Most Active State
          </h4>
          <ul style={{ marginTop: "20px", color: "black", paddingInlineStart:"20px" }}>
            <li className="rmssidebar">
              <div className="row">
              <div className="col-xs-1"/>
                <div className="col-xs-4">
                  <img
                    alt="ACTIVE"
                    src={ACTIVE}
                    style={{
                      width: "42px",
                      marginLeft: "-11px",
                      filter: "contrast(0)"
                    }}
                  />
                </div>
                <div className="col-xs-5">
                  <span className="iaassidebartext">
                    <b>Bihar</b>
                  </span>
                  <p>
                    <small>95% Patvan active</small>
                  </p>
                </div>
                <div className="col-xs-1"/>
              </div>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

export default IaasSidebar;
