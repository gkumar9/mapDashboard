import React, { Component } from "react";
import logo from "./logo.png";
import axios from "axios";
import config from "./config.js";
import { Link } from "react-router-dom";
// import DRINKING_WATER_PUMP from "./pins/DRINKING_WATER_PUMP.png";
// import IRRIGATION_PUMP from "./pins/IRRIGATION_PUMP.png";
// import PATVAN from "./pins/PATVAN.png";
// import MINIGRID from "./pins/MINIGRID.png";
// import ROOFTOP from "./pins/ROOFTOP.png";

import RMS from "./pins/RMS.png";
import IAAS from "./pins/IAAS.png";
import MINIGRID from "./pins/Minigrid(2).png";
// import HOME from "./pins/ROOFTOP.png";
import ROOFTOP from "./pins/Rooftop(2).png";
class Header extends Component {
  constructor(props) {
    super(props);
    this.handleSignout = this.handleSignout.bind(this);
  }
  handleSignout() {
    console.log("sign out");
    axios.get(config.LogoutServlet).then(() => {
      window.location.href = "../login.html?redirect=maps";
    });
  }
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
              <a className="navbar-brand" href="/home">
                <img src={logo} alt="logo" />
              </a>
            </div>
            <div id="navbar1" className="navbar-collapse collapse gaurav">
              <ul className="nav navbar-nav">
              {/* <li className="sidebarheader">
                <Link to="/">
                    <img alt="irrigation" src={HOME} />
                    Home
                    </Link>
                </li> */}
                <li className="sidebarheader">
                <Link to="/rms">
                    <img alt="irrigation" src={RMS} />
                    RMS
                    </Link>
                </li>
                
                <li className="sidebarheader">
                  <a>
                    <span className="verticalLine" />
                  </a>
                </li>
                <li className="sidebarheader">
                <Link to="/iaas">
                    <img alt="patvan" src={IAAS} />
                    IAAS
                </Link>
                </li>
                <li className="sidebarheader">
                  <a>
                    <span className="verticalLine" />
                  </a>
                </li>
                <li className="sidebarheader">
                  <a >
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
                  <a >
                    <img alt="Minigrid" src={MINIGRID} />
                    Minigrid
                  </a>
                </li>
                <li className="sidebarheader">
                  <a>
                    <span className="verticalLine" />
                  </a>
                </li>
                
                <li className="headerdivider" />
                <li>
                  <a>Welcome User</a>
                </li>
                <li>
                  <a>
                    <span className="verticalLine" />
                  </a>
                </li>
                <li>
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href="../OpsDashboard/index.html"
                  >
                    Operations
                  </a>
                </li>
                <li>
                  <a>
                    <span className="verticalLine" />
                  </a>
                </li>
                <li>
                  <a onClick={this.handleSignout}>Sign Out</a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    );
  }
}

export default Header;
