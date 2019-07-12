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
        className="col-xs-2 rmssidebar"
      >
        <div
          style={{
            background: "#F2F2F2",
            padding: "0.1em",
            borderRadius: "0.5em"
          }}
        >
          <h4
            style={{
              marginTop: "20px",
              color: "#b12d28",
              fontSize: "medium",
              fontFamily: "gotham-medium"
            }}
          >
            Our Impact
          </h4>
          <ul
            style={{
              marginTop: "20px",
              color: "black",
              paddingInlineStart: "0px"
            }}
          >
            <li className="rmssidebar">
              <div
                className="row"
                style={{ marginLeft: "0", marginRight: "0" }}
              >
                {/* <div className="col-xs-1"/> */}
                <div className="col-xs-5" style={{ textAlign: "right" }}>
                  <img alt="CO2" src={CO2} style={{ width: "37px" }} />
                </div>
                <div className="col-xs-7" style={{ textAlign: "left" }}>
                  <span className="iaassidebartext">
                    <b>{this.props.statsdata.co2Saved} Kg</b>
                  </span>
                  <p>
                    <small>CO2 Saved</small>
                  </p>
                </div>
                {/* <div className="col-xs-1"/> */}
              </div>
            </li>
            <li className="rmssidebar">
              <div
                className="row"
                style={{ marginLeft: "0", marginRight: "0" }}
              >
                {/* <div className="col-xs-1"/> */}
                <div className="col-xs-5" style={{ textAlign: "right" }}>
                  <img alt="flow" src={FLOW} style={{ width: "35px" }} />
                </div>
                <div className="col-xs-7" style={{ textAlign: "left" }}>
                  <span className="iaassidebartext">
                    <b>{this.props.statsdata.waterDischarged} kL</b>
                  </span>
                  <p>
                    <small>Water Pumped</small>
                  </p>
                </div>
                {/* <div className="col-xs-1"/> */}
              </div>
            </li>
            <li className="rmssidebar">
              <div
                className="row"
                style={{ marginLeft: "0", marginRight: "0" }}
              >
                {/* <div className="col-xs-1" /> */}
                <div className="col-xs-5" style={{ textAlign: "right" }}>
                  <img
                    alt="Land"
                    src={LAND}
                    style={{
                      width: "30px",
                      marginLeft: "-11px",
                      filter: "contrast(0)"
                    }}
                  />
                </div>
                <div className="col-xs-7" style={{ textAlign: "left" }}>
                  <span className="iaassidebartext">
                    <b>{this.props.statsdata.landIrrigated} Acre</b>
                  </span>
                  <p>
                    <small>Land Irrigated</small>
                  </p>
                </div>
                {/* <div className="col-xs-1" /> */}
              </div>
            </li>
            <li className="rmssidebar">
              <div
                className="row"
                style={{ marginLeft: "0", marginRight: "0" }}
              >
                {/* <div className="col-xs-1" /> */}
                <div className="col-xs-5" style={{ textAlign: "right" }}>
                  <img
                    alt="PATVAN"
                    src={PATVAN}
                    style={{
                      width: "30px",
                      marginLeft: "-11px",
                      filter: "contrast(0)"
                    }}
                  />
                </div>
                <div className="col-xs-7" style={{ textAlign: "left" }}>
                  <span className="iaassidebartext">
                    <b>{this.props.statsdata.noOfPatvans}</b>
                  </span>
                  <p>
                    <small>Patvans</small>
                  </p>
                </div>
                {/* <div className="col-xs-1" /> */}
              </div>
            </li>
            <li className="rmssidebar">
              <div
                className="row"
                style={{ marginLeft: "0", marginRight: "0" }}
              >
                {/* <div className="col-xs-1" /> */}
                <div className="col-xs-5" style={{ textAlign: "right" }}>
                  <img
                    alt="FARMER"
                    src={FARMER}
                    style={{
                      width: "30px",
                      marginLeft: "-11px",
                      filter: "contrast(0)"
                    }}
                  />
                </div>
                <div className="col-xs-7" style={{ textAlign: "left" }}>
                  <span className="iaassidebartext">
                    <b>{this.props.statsdata.noOfFarmers}</b>
                  </span>
                  <p>
                    <small>Farmers</small>
                  </p>
                </div>
                {/* <div className="col-xs-1" /> */}
              </div>
            </li>
          </ul>
        </div>
        <div
          style={{
            background: "#F2F2F2",
            padding: "0.1em",
            borderRadius: "0.5em",
            marginTop: "28px"
          }}
        >
          <h4
            style={{
              marginTop: "20px",
              color: "#b12d28",
              fontSize: "medium",
              fontFamily: "gotham-medium"
            }}
          >
            Most Active State
          </h4>
          <ul
            style={{
              marginTop: "20px",
              color: "black",
              paddingInlineStart: "0px"
            }}
          >
            <li className="rmssidebar">
              <div
                className="row"
                style={{ marginLeft: "0", marginRight: "0" }}
              >
                {/* <div className="col-xs-1" /> */}
                <div className="col-xs-5" style={{ textAlign: "right" }}>
                  <img
                    alt="ACTIVE"
                    src={ACTIVE}
                    style={{
                      width: "32px",
                      filter: "contrast(0)"
                    }}
                  />
                </div>
                <div className="col-xs-7" style={{ textAlign: "left" }}>
                  <span className="iaassidebartext">
                    <b>Bihar</b>
                  </span>
                  <p>
                    <small>95% Patvan active</small>
                  </p>
                </div>
                {/* <div className="col-xs-1" /> */}
              </div>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

export default IaasSidebar;
