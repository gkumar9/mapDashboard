import React, { Component } from "react";
import Header from "./Header.js";
import Sidebar from "./Sidebar.js";
import axios from "axios";
import { Link } from "react-router-dom";
import farmerimg from "./pins/user.png";
import config from "./config.js";

class FarmerHeader extends Component {
  render() {
    return (
      <div className="container ">
        <nav
          style={{ backgroundColor: "#edeef0", borderBottomColor: "darkgray" }}
          className="navbar navbar-default"
        >
          <div
            className="container-fluid "
            style={{ textAlign: "center", marginTop: "10px" }}
          >
            <Link to="/farmer">
              <button
                type="button"
                className="btn btn-default"
                aria-label="Left Align"
                id="drillUp"
                style={{
                  // display: "none",
                  // borderColor: "darkgray",
                  float: "left",
                  outline: "none",
                  backgroundColor: "transparent"
                }}
              >
                <span
                  className="glyphicon glyphicon-menu-left"
                  style={{ marginRight: "6px" }}
                  aria-hidden="true"
                />
                Back
              </button>
            </Link>
            {/* <Link to="/farmeradd">
              <div className="newfarmer">
                <button
                  type="button"
                  className=" btn btn-default"
                  aria-label="Left Align"
                  id="drillUp"
                  style={{
                    // display: "none",
                    // borderColor: "darkgray",
                    float: "right",
                    outline: "none",
                    backgroundColor: "transparent"
                  }}
                >
                  <span
                    className="glyphicon glyphicon-plus"
                    style={{ marginRight: "6px" }}
                    aria-hidden="true"
                  />
                  Add Farmer
                </button>
              </div>
            </Link> */}
            <span style={{ fontSize: "large", color: "blue" }}>
              Farmer database in India
            </span>
          </div>
        </nav>
      </div>
    );
  }
}

class Farmer extends Component {
  constructor(props) {
    super(props);
    this.state = { farmerlist: [], famerinfo: {} };
  }
  handleclick = item => {
    axios({
      url: config.getfarmer + item.id,
      method: "POST",
      data: {
        temp: "temp"
      },
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => {
        console.log(res.data.data);
        this.setState({ famerinfo: res.data.data });
        document.getElementById("showsidetab").style.display = "block";
      })
      .catch(e => {
        console.log(e);
      });
  };
  handleclickaddfarmer = () => {
    alert("add farmer clicked");
  };
  componentDidMount() {
    axios({
      url: config.farmerlist + "1",
      method: "POST",
      data: {
        temp: "temp"
      },
      headers: {
        "Content-Type": "application/json"
      }
    }).then(res => {
      this.setState({ farmerlist: res.data.data.list });
    });
  }

  render() {
    return (
      <div className="gauravwww">
        <Header />
        <div className="mainbody">
          <Sidebar history={this.props.history} />
          <div style={{ backgroundColor: "#F2F2F2" }} className="main">
            <FarmerHeader label={this.state.label} />
            <div className="row">
              <div
                className="col-xs-3"
                style={{ height: "90vh", overflow: "scroll" }}
              >
                <div className="list-group">
                  <a
                    onClick={this.handleclickaddfarmer}
                    className="list-group-item "
                  >
                    <h4
                      style={{ textAlign: "right" }}
                      className="list-group-item-heading"
                    >
                      <span
                        className="glyphicon glyphicon-plus"
                        style={{ marginRight: "6px" }}
                        aria-hidden="true"
                      />
                      <span>Add Farmer</span>
                    </h4>
                    {/* <p class="list-group-item-text" /> */}
                  </a>
                  <div className="input-group">
                    <div className=" input-group-btn">
                      <button
                        style={{ border: "1px solid #ccc" }}
                        type="button"
                        className="btn btn-default dropdown-toggle"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                      >
                        Filter <span className="caret" />
                      </button>
                      <ul className="dropdown-menu">
                        <li>
                          <a href="#">Action</a>
                        </li>
                        <li>
                          <a href="#">Another action</a>
                        </li>
                        <li>
                          <a href="#">Something else here</a>
                        </li>
                        <li role="separator" className="divider" />
                        <li>
                          <a href="#">Separated link</a>
                        </li>
                      </ul>
                    </div>
                    <input
                      type="search"
                      className="form-control"
                      placeholder="Search"
                      aria-label="..."
                    />
                  </div>
                  {this.state.farmerlist !== [] &&
                    this.state.farmerlist.map((item, index) => (
                      <a
                        key={index}
                        onClick={this.handleclick.bind(this, item)}
                        className="list-group-item "
                      >
                        <h4 className="list-group-item-heading">{item.name}</h4>
                        <p className="list-group-item-text">
                          {item.uidType}: {item.uid}
                          <span style={{ float: "right" }}>
                            {item.contactNo}
                          </span>
                        </p>
                      </a>
                    ))}
                </div>
              </div>
              <div className="col-xs-9 famerinfobox">
                <div id="showsidetab" style={{ display: "none" }}>
                  <div className="row farmerinfoheader">
                    <div className="col-xs-4">
                      {this.state.famerinfo.farmerImage !== null &&
                      this.state.famerinfo.farmerImage !== "NA" &&
                      this.state.famerinfo.farmerImage !== "N.A" ? (
                        <img
                          src={this.state.famerinfo.farmerImage}
                          alt="farmerimg"
                        />
                      ) : (
                        <img
                          width="45%"
                          src={farmerimg}
                          alt="placeholder farmerimg"
                        />
                      )}
                    </div>
                    <div className="col-xs-8 famerinfoheaderbox">
                      <div className="row">
                        {/* <div className="col-xs-6">Name</div> */}
                        <div className="col-xs-6">
                          <span style={{fontSize:'1.4em'}}>{this.state.famerinfo.name}</span>,{" "}
                          {this.state.famerinfo.gender}
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-xs-6">
                          {this.state.famerinfo.uidType} :{" "}
                          {this.state.famerinfo.uid}
                        </div>
                      </div>
                      <div className="row">
                        {/* <div className="col-xs-6">Contact No</div> */}
                        <div className="col-xs-6">
                          {this.state.famerinfo.contactNo !== "N.A" && (
                            <span>+91{this.state.famerinfo.contactNo}</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Farmer;
