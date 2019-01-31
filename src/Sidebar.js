import React, { Component } from "react";
import { Link } from "react-router-dom";
import RMS from "./pins/RMS.png";
import IAAS from "./pins/IAAS.png";
import MINIGRID from "./pins/Minigrid(2).png";
import HOME from "./pins/ROOFTOP.png";
import ROOFTOP from "./pins/Rooftop(2).png";
class Sidebar extends Component {
  render() {
    return (
      <aside className="main_sidebar">
        <ul>
          <Link to="/">
            <li title="Home" className="active">
              <i>
                <img
                  alt="home"
                  style={{ width: "45%", marginLeft: "3px" }}
                  src={HOME}
                />
              </i>
            </li>
          </Link>
          <li title="RMS">
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="../all_rms/locrmspage.html"
            >
              <i>
                <img alt="rms" src={RMS} />
              </i>
            </a>
          </li>
          <li title="IAAS">
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="../IAAS/menubar.html"
            >
              <i>
                <img alt="IAAS" src={IAAS} />
              </i>
            </a>
          </li>
          <Link to="/rms">
            <li title="Solar Rooftop">
              <i>
                <img alt="Rooftop" src={ROOFTOP} />
              </i>
            </li>
          </Link>
          <li title="Minigrid">
            <a className="disabled">
              <i>
                <img alt="Minigrid" src={MINIGRID} />
              </i>
            </a>
          </li>
        </ul>
      </aside>
    );
  }
}

export default Sidebar;
