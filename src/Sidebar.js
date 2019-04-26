import React, { Component } from "react";
import { Link } from "react-router-dom";
import RMS from "./pins/RMS.png";
import IAAS from "./pins/IAAS.png";
import MINIGRID from "./pins/Minigrid(2).png";
import HOME from "./pins/ROOFTOP.png";
import ROOFTOP from "./pins/Rooftop(2).png";
import FARMER from "./pins/user1.png";
class Sidebar extends Component {
  render() {
    return (
      <aside className="main_sidebar">
        <ul>
          <Link key="home" to="/">
            <li
              title="Home"
              className={
                this.props.history.location.pathname.search("rms") === -1 &&
                this.props.history.location.pathname.search("iaas") === -1 &&
                this.props.history.location.pathname.search("farmer") === -1
                  ? "active"
                  : ""
              }
            >
              <i>
                <img
                  alt="home"
                  style={{ width: "45%", marginLeft: "3px" }}
                  src={HOME}
                />
              </i>
            </li>
          </Link>
          <Link key="rms" to="/rms">
            <li
              title="RMS"
              className={
                this.props.history.location.pathname.search("rms") !== -1
                  ? "active"
                  : ""
              }
            >
              <i>
                <img alt="rms" src={RMS} />
              </i>
            </li>
          </Link>
          <Link key="iaas" to="/iaas">
            <li
              title="IAAS"
              className={
                this.props.history.location.pathname.search("iaas") !== -1
                  ? "active"
                  : ""
              }
            >
              <i>
                <img alt="IAAS" src={IAAS} />
              </i>
            </li>
          </Link>

          <li title="Solar Rooftop">
            <a className="disabled">
              <i>
                <img alt="Rooftop" src={ROOFTOP} />
              </i>
            </a>
          </li>

          <li title="Minigrid">
            <a className="disabled">
              <i>
                <img alt="Minigrid" src={MINIGRID} />
              </i>
            </a>
          </li>
          <Link key="farmer" to="/farmer">
            <li
              title="Farmers"
              className={
                this.props.history.location.pathname.search("farmer") !== -1
                  ? "active"
                  : ""
              }
            >
              <i>
                <img alt="farmer" src={FARMER} />
              </i>
            </li>
          </Link>
        </ul>
      </aside>
    );
  }
}

export default Sidebar;
