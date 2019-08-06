import React, { Component } from "react";
import Header from "../../Header.js";
import Sidebar from "../../Sidebar.js";
import IaasHeader from "./iaasheader.js";
import IaasRevenue from "./iaasrevenuemobile.js";
import IaasPatvan from "./iaasmobilepatvan.js";
import Iasshourtrans from "./iaashourtrans.js";
import axios from "axios";
import config from "../../config.js";
import CO2 from "../../pins/1.png";
import FLOW from "../../pins/2.png";
import LAND from "../../pins/land.png";
import PATVAN from "../../pins/tuk-tuk.png";
import FARMER from "../../pins/farmer 3.png";
import ACTIVE from "../../pins/placeholder.png";
import Swal from "sweetalert2";

class IaasSidebarmobile extends Component {
  render() {
    return (
      <div
        style={{
          textAlign: "center",
          padding: "1em"
        }}
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
          <div
            id="carousel-example-generic"
            className="carousel slide"
            // data-ride="carousel"
            data-wrap="true"
            style={{ marginBottom: "1em" }}
          >
            <div className="carousel-inner" role="listbox" style={{height:'60px'}}>
              <div className="item active">
                <div
                  className="row"
                  style={{ marginLeft: "0", marginRight: "0" }}
                >
                  <div
                    className="col-xs-6"
                    style={{ paddingLeft: "0", paddingRight: "0" }}
                  >
                    <div
                      className="row"
                      style={{ marginLeft: "0", marginRight: "0" }}
                    >
                      <div
                        className="col-xs-5"
                        style={{ textAlign: "right", paddingRight: "0" }}
                      >
                        <img alt="CO2" src={CO2} style={{ width: "37px" }} />
                      </div>
                      <div
                        className="col-xs-7"
                        style={{ textAlign: "left", paddingRight: "0" }}
                      >
                        <span className="iaassidebartext">
                          <b>{this.props.statsdata.co2Saved} Kg</b>
                        </span>
                        <p>
                          <small>CO2 Saved</small>
                        </p>
                      </div>
                    </div>
                  </div>
                  <div
                    className="col-xs-6"
                    style={{ paddingLeft: "0", paddingRight: "0" }}
                  >
                    <div
                      className="row"
                      style={{ marginLeft: "0", marginRight: "0" }}
                    >
                      <div
                        className="col-xs-5"
                        style={{ textAlign: "right", paddingLeft: "0" }}
                      >
                        <img alt="flow" src={FLOW} style={{ width: "35px" }} />
                      </div>
                      <div
                        className="col-xs-7"
                        style={{
                          textAlign: "left",
                          paddingLeft: "0",
                          paddingRight: "0"
                        }}
                      >
                        <span className="iaassidebartext">
                          <b>{this.props.statsdata.waterDischarged} kL</b>
                        </span>
                        <p>
                          <small>Water Pumped</small>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="item">
                <div
                  className="row"
                  style={{ marginLeft: "0", marginRight: "0" }}
                >
                  <div
                    className="col-xs-6"
                    style={{ paddingLeft: "0", paddingRight: "0" }}
                  >
                    <div
                      className="row"
                      style={{ marginLeft: "0", marginRight: "0" }}
                    >
                      <div
                        className="col-xs-5"
                        style={{ textAlign: "right", paddingRight: "0" }}
                      >
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
                      <div
                        className="col-xs-7"
                        style={{ textAlign: "left", paddingRight: "0" }}
                      >
                        <span className="iaassidebartext">
                          <b>{this.props.statsdata.landIrrigated} Acre</b>
                        </span>
                        <p>
                          <small>Land Irrigated</small>
                        </p>
                      </div>
                    </div>
                  </div>
                  <div
                    className="col-xs-6"
                    style={{ paddingLeft: "0", paddingRight: "0" }}
                  >
                    <div
                      className="row"
                      style={{ marginLeft: "0", marginRight: "0" }}
                    >
                      <div
                        className="col-xs-5"
                        style={{ textAlign: "right", paddingRight: "0" }}
                      >
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
                      <div
                        className="col-xs-7"
                        style={{ textAlign: "left", paddingRight: "0" }}
                      >
                        <span className="iaassidebartext">
                          <b>{this.props.statsdata.noOfPatvans}</b>
                        </span>
                        <p>
                          <small>Patvans</small>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="item">
                <div
                  className="row"
                  style={{ marginLeft: "0", marginRight: "0" }}
                >
                  <div
                    className="col-xs-5"
                    style={{ paddingLeft: "0", paddingRight: "0" }}
                  >
                    <div
                      className="row"
                      style={{ marginLeft: "0", marginRight: "0" }}
                    >
                      <div
                        className="col-xs-5"
                        style={{ textAlign: "right", paddingRight: "0" }}
                      >
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
                      <div
                        className="col-xs-7"
                        style={{ textAlign: "left", paddingRight: "0" }}
                      >
                        <span className="iaassidebartext">
                          <b>{this.props.statsdata.noOfFarmers}</b>
                        </span>
                        <p>
                          <small>Farmers</small>
                        </p>
                      </div>
                    </div>
                  </div>
                  <div
                    className="col-xs-7"
                    style={{ paddingLeft: "0", paddingRight: "0" }}
                  >
                    <div
                      className="row"
                      style={{ marginLeft: "0", marginRight: "0" }}
                    >
                      <div className="col-xs-5" style={{ textAlign: "right" }}>
                        <img
                          alt="ACTIVE"
                          src={ACTIVE}
                          style={{
                            width: "35px",
                            filter: "contrast(0)"
                          }}
                        />
                      </div>
                      <div
                        className="col-xs-7"
                        style={{
                          textAlign: "left",
                          paddingLeft: "0",
                          paddingRight: "0"
                        }}
                      >
                        <span className="iaassidebartext">
                          <b>Bihar</b>
                        </span>
                        <p>
                          <small>95% Patvan active</small>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <a
              className="left carousel-control"
              href="#carousel-example-generic"
              role="button"
              data-slide="prev"
            >
              <span
                className="glyphicon glyphicon-chevron-left"
                aria-hidden="true"
              />
              <span className="sr-only">Previous</span>
            </a>
            <a
              className="right carousel-control"
              href="#carousel-example-generic"
              role="button"
              data-slide="next"
            >
              <span
                className="glyphicon glyphicon-chevron-right"
                aria-hidden="true"
              />
              <span className="sr-only">Next</span>
            </a>
          </div>
        </div>
      </div>
    );
  }
}

class Iaas extends Component {
  constructor(props) {
    super(props);
    this.state = { statsdata: {} };
  }

  componentDidMount() {
    // eslint-disable-next-line no-undef
    if (window.screen.width >= 480) {
      this.props.history.push("/iaas");
      
    }else{
      
      axios({
        url: config.iaasstats,
        method: "POST",
        data: { requestId: 1 },
        headers: {
          "Content-Type": "application/json"
        }
      })
        .then(res => {
          // console.log('res',res.data.data)
          res.data.data.co2Saved = parseInt(
            res.data.data.co2Saved
          ).toLocaleString("en-IN");
          res.data.data.landIrrigated = parseInt(
            res.data.data.landIrrigated
          ).toLocaleString("en-IN");
          res.data.data.noOfFarmers = parseInt(
            res.data.data.noOfFarmers
          ).toLocaleString("en-IN");
          res.data.data.noOfPatvans = parseInt(
            res.data.data.noOfPatvans
          ).toLocaleString("en-IN");
          res.data.data.waterDischarged = parseInt(
            res.data.data.waterDischarged
          ).toLocaleString("en-IN");
          this.setState({
            statsdata: res.data.data
          });
        })
        .catch(e => {
          if (e.response.status===401) {
            Swal({
              type: "error",
              title: "Unauthorized",
              text: "Please login again."
            });
            this.props.history.push({
              pathname: "/"
            });
          } else if (e.response.status===403) {
            Swal({
              type: "error",
              title: "Forbidden"
            });
            // this.props.history.push({
            //   pathname: "/rms"
            // });
          } else {
            // this.setState({ isloaderactive: false });
            Swal({
              type: "error",
              title: "Oops...",
              text: e
            });
            // this.props.history.push({
            //   pathname: "/rms"
            // });
          }
        });
    }
    
  }

  render() {
    // eslint-disable-next-line no-undef
    if(window.screen.width<480){
      return (
        <div>
          <Header />
          <div className="mainbody iaasmobile">
            <Sidebar kc={this.props.kc} history={this.props.history} />
            <div className="main">
              <IaasHeader />
              <div className="container">
                <div
                  className="row row-eq-height"
                  style={{
                    marginRight: "0",
                    marginLeft: "0",
                    fontFamily: "gotham-light"
                  }}
                >
                  <IaasSidebarmobile statsdata={this.state.statsdata} />
                </div>
                <div
                  className="row row-eq-height"
                  style={{
                    marginRight: "0",
                    marginLeft: "0",
                    fontFamily: "gotham-light"
                  }}
                >
                  <div
                    style={{
                      // minHeight: "100vh",
                      // textAlign: "center",
                      padding: "1em"
                    }}
                  >
                    <div className="iaasoverall">
                      <ul
                        className="nav nav-tabs"
                        role="tablist"
                        style={{'paddingTop':'0.3em'}}
                      >
                        <li role="presentation" className="active" style={{width:'50%'}}>
                          <a
                            style={{
                              color: "#666666",
                              fontFamily: "gotham-medium",
                              textAlign:'center'
                            }}
                            href="#home"
                            aria-controls="home"
                            role="tab"
                            data-toggle="tab"
                          >
                            Revenue Timeline
                          </a>
                        </li>
                        <li role="presentation" className="" style={{width:'50%',borderLeft: '1px solid #ddd'}}>
                          <a
                            style={{
                              color: "#666666",
                              fontFamily: "gotham-medium",
                              textAlign:'center'
                            }}
                            href="#profile"
                            aria-controls="profile"
                            role="tab"
                            data-toggle="tab"
                          >
                            Patvan's Revenue
                          </a>
                        </li>
                        <li role="presentation" className="" style={{width:'100%'}}>
                          <a
                            style={{
                              color: "#666666",
                              fontFamily: "gotham-medium",
                              textAlign: "center"
                            }}
                            href="#messages"
                            aria-controls="messages"
                            role="tab"
                            data-toggle="tab"
                          >
                            Operations per Transaction
                          </a>
                        </li>
                      </ul>
  
                      <div className="tab-content">
                        <div
                          role="tabpanel"
                          className="tab-pane active"
                          id="home"
                        >
                          <IaasRevenue />
                        </div>
                        <div role="tabpanel" className="tab-pane" id="profile">
                          <IaasPatvan />
                        </div>
                        <div role="tabpanel" className="tab-pane" id="messages">
                          <Iasshourtrans />
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
    else{
      return(<center>Sorry for Inconvenience. Please reload page.</center>)
    }
    
  }
}

export default Iaas;
