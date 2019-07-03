import React, { Component } from "react";


class IaasHeader extends Component {
    render() {
      return (
        <div className="container">
          <nav  style={{ backgroundColor: '#edeef0', borderBottomColor: 'darkgray' }} className="navbar navbar-default">
            <div
              className="container-fluid"
              style={{ textAlign: "center", marginTop: "15px" }}
            >
              {/* <Link to="/">
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
              </Link> */}
              <span style={{ fontSize: "large", color: "#b12d28",fontFamily:'gotham-medium' }}>
              IRRIGATION AS A SERVICE
              </span>
            </div>
          </nav>
        </div>
      );
    }
  }
export default IaasHeader;