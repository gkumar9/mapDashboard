import React, { Component } from "react";
import { Link } from "react-router-dom";

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
export default IaasHeader;