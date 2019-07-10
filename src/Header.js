import React, { Component } from "react";

import { Link } from "react-router-dom";
// import DRINKING_WATER_PUMP from "./pins/DRINKING_WATER_PUMP.png";
// import IRRIGATION_PUMP from "./pins/IRRIGATION_PUMP.png";
// import PATVAN from "./pins/PATVAN.png";
// import MINIGRID from "./pins/MINIGRID.png";
// import ROOFTOP from "./pins/ROOFTOP.png";
import RMS from "./pins/RMS 2.png";
import IAAS from "./pins/IAAS 2.png";
import MINIGRID from "./pins/Minigrid(2).png";

import ROOFTOP from "./pins/Rooftop(2).png";
import FARMER from "./pins/Farmer 2.png";

// import RMS from "./pins/RMS.png";
// import IAAS from "./pins/IAAS.png";
// import MINIGRID from "./pins/Minigrid(2).png";
// import HOME from "./pins/ROOFTOP.png";
import HOME from "./pins/Home.png";
// import ROOFTOP from "./pins/Rooftop(2).png";
// import FARMER from "./pins/user1.png";
class Header extends Component {
  render() {
    return (
      <div className="container">
        <nav className="navbar navbar-default">
          <div className="container-fluid">
            <div className="navbar-header">
              <button
                type="button"
                className="navbar-toggle collapsed headerbutton"
                data-toggle="collapse"
                data-target="#navbar1"
              >
                <span className="sr-only">Toggle navigation</span>
                <span className="icon-bar" />
                <span className="icon-bar" />
                <span className="icon-bar" />
              </button>
              <a className="navbar-brand" href="/">
                <img
                  src="https://claroenergy.in/wp-content/themes/claro/images/temp/logo.png"
                  alt="logo"
                />
              </a>
            </div>
            <div id="navbar1" className="navbar-collapse collapse gaurav" >
              <ul className="nav navbar-nav">
                <li className="sidebarheader">
                  <Link to="/" target="_self">
                    <img alt="irrigation" src={HOME} />
                    Home
                  </Link>
                </li>
                <li className="sidebarheader">
                  <Link to="/rms" target="_self">
                    <img alt="irrigation" src={RMS} />
                    RMS
                  </Link>
                </li>

                <li className="sidebarheader">
                  <Link to="/iaas" target="_self">
                    <img alt="patvan" src={IAAS} />
                    IAAS
                  </Link>
                </li>

                {/* <li className="sidebarheader">
                  <a>
                    <img alt="DRINKING_WATER_PUMP" src={ROOFTOP} />
                    Rooftop
                  </a>
                </li>
                <li className="sidebarheader">
                  <a>
                    <span className="verticalLine" />
                  </a>
                </li>
                <li className="sidebarheader">
                  <a>
                    <img alt="Minigrid" src={MINIGRID} />
                    Minigrid
                  </a>
                </li>
                <li className="sidebarheader">
                  <a>
                    <span className="verticalLine" />
                  </a>
                </li> */}
                <li className="sidebarheader">
                  <Link to="/farmer" target="_self">
                    <img alt="Minigrid" src={FARMER} />
                    Farmer
                  </Link>
                </li>
                {/* <li className="headerdivider" /> */}
                <li className="hideliinmobile">
                  <a
                    style={{
                      color: "#b12d28",
                      fontSize: "1.1em",
                      cursor: "default",
                      fontFamily: "gotham-light",
                      fontWeight: "600"
                    }}
                  >
                    Welcome User
                  </a>
                </li>
                <li className="hideliinmobile">
                  <a style={{ padding: "14px 1px" }}>
                    <span className="verticalLine" />
                  </a>
                </li>
                <li className="hideliinmobile">
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href="../OpsDashboard/index.html"
                    style={{
                      color: "#b12d28",
                      fontSize: "1.1em",
                      fontFamily: "gotham-light",
                      fontWeight: "600"
                    }}
                  >
                    Operations
                  </a>
                </li>
                {/* <li>
                  <a>
                    <span className="verticalLine" />
                  </a>
                </li>
                <li>
                  <a onClick={this.handleSignout}>Sign Out</a>
                </li> */}
              </ul>
            </div>
          </div>
        </nav>
      </div>
    );
  }
}

export default Header;
