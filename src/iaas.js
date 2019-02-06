import React, { Component } from "react";
import Header from "./Header.js";
import Sidebar from "./Sidebar.js";
import { Link } from "react-router-dom";
import axios from "axios";
import config from "./config.js";
import Swal from "sweetalert2";
const $ = require("jquery");

class IaasHeader extends Component {
    render() {
      return (
        <div className="container">
          <nav id="filter" className="navbar navbar-default">
            <div
              className="container-fluid"
              style={{ textAlign: "center", marginTop: "10px" }}
            >
              <Link to="/">
                <button
                  style={{
                    marginTop: "-2px",
                    backgroundColor: "transparent",
                    float: "left"
                  }}
                  type="button"
                  className="btn btn-default"
                  aria-label="Left Align"
                >
                  <span
                    className="glyphicon glyphicon-menu-left"
                    style={{ marginRight: "6px" }}
                    aria-hidden="true"
                  />
                  Home{" "}
                </button>
              </Link>
              <span style={{ fontSize: "large", color: "blue" }}>
                Irrigation as a Service{" "}
              </span>
            </div>
          </nav>
        </div>
      );
    }
  }
class iaas extends Component {
  
  render() {
    return (
      <div>
        <Header />
        <div className="mainbody">
          <Sidebar history={this.props.history} />
          <div style={{ backgroundColor: "#F2F2F2" }} className="main">
          <IaasHeader />
          </div>
          </div>
      </div>
    );
  }
}

export default iaas;
