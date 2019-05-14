import React, { Component } from "react";
import Header from "./Header.js";
import Sidebar from "./Sidebar.js";
import { Link } from "react-router-dom";

import axios from "axios";
import config from "./config.js";
class RmsHeader extends Component {
  render() {
    return (
      <div className="container ">
        <nav
          style={{ backgroundColor: "#edeef0", borderBottomColor: "darkgray" }}
          className="navbar navbar-default"
        >
          <div
            className="container-fluid"
            style={{ textAlign: "center", marginTop: "10px" }}
          >
            <Link to="/rms">
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
                RMS{" "}
              </button>
            </Link>
            <span style={{ fontSize: "large", color: "blue" }}>
              RMS edit portal{" "}
            </span>
          </div>
        </nav>
      </div>
    );
  }
}
class Rmsedit extends Component {
  componentDidMount() {
    if (this.props.location.state !== undefined) {
      console.log(this.props.location.state.detail);
    } else {
      this.props.history.push({
        pathname: "/rms"
      });
    }
  }
  render() {
    return (
      <div>
        <Header />
        <div className="mainbody">
          <Sidebar history={this.props.history} />
          <div style={{ backgroundColor: "#F2F2F2" }} className="main">
            <RmsHeader />
            <div className="container">
              <div className="row">
                <div className="col-md-4">
                  <div className="rmsedithead">
                    <h2>Personal Information</h2>
                  </div>
                  <div className="rmseditbody">
                    <form class="form-horizontal">
                      <div class="form-group">
                        <label for="inputtextname" class="col-sm-2 control-label">
                          Name
                        </label>
                        <div class="col-sm-10">
                          <input
                            type="text"
                            class="form-control"
                            id="inputtextname"
                            placeholder="Name"
                          />
                        </div>
                      </div>
                      <div class="form-group">
                        <label
                          for="inputPassword3"
                          class="col-sm-2 control-label"
                        >
                          Password
                        </label>
                        <div class="col-sm-10">
                          <input
                            type="password"
                            class="form-control"
                            id="inputPassword3"
                            placeholder="Password"
                          />
                        </div>
                      </div>
                      <div class="form-group">
                        <div class="col-sm-offset-2 col-sm-10">
                          <div class="checkbox">
                            <label>
                              <input type="checkbox" /> Remember me
                            </label>
                          </div>
                        </div>
                      </div>
                      <div class="form-group">
                        <div class="col-sm-offset-2 col-sm-10">
                          <button type="submit" class="btn btn-default">
                            Sign in
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
                <div className="col-md-4" />
                <div className="col-md-4" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Rmsedit;
