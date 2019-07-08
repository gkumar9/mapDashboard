import React, { Component } from "react";
import Header from "./Header.js";
import Sidebar from "./Sidebar.js";
import IaasHeader from "./iaasheader.js";
import IaasSidebar from "./iaassidebar.js";
import IaasRevenue from "./iaasrevenue2.js";
import IaasPatvan from "./iaaspatvan.js";
import Iasshourtrans from "./iaashourtrans.js";
import axios from "axios";
import config from "./config.js";

class iaas extends Component {
  constructor(props) {
    super(props);
    this.state = { statsdata: {} };
  }

  componentDidMount() {
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
        console.log(e);
      });
  }

  render() {
    return (
      <div>
        <Header />
        <div className="mainbody">
          <Sidebar history={this.props.history} />
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
                <IaasSidebar statsdata={this.state.statsdata} />
                <div
                  className="col-xs-10"
                  style={{
                    // minHeight: "100vh",
                    // textAlign: "center",
                    padding: "1em"
                  }}
                >
                  <div
                  className="iaasoverall"
                    
                  >
                    <ul className="nav nav-tabs" role="tablist">
                      <li role="presentation" className="active">
                        <a
                          style={{
                            color: "#666666",
                            fontFamily: "gotham-medium",
                            padding: "4px 25px"
                          }}
                          href="#home"
                          aria-controls="home"
                          role="tab"
                          data-toggle="tab"
                        >
                          Revenue
                        </a>
                      </li>
                      <li role="presentation" className="">
                        <a
                          style={{
                            color: "#666666",
                            fontFamily: "gotham-medium",
                            padding: "4px 25px"
                          }}
                          href="#profile"
                          aria-controls="profile"
                          role="tab"
                          data-toggle="tab"
                        >
                          Patvan's Revenue
                        </a>
                      </li>
                      <li role="presentation" className="">
                        <a
                          style={{
                            color: "#666666",
                            fontFamily: "gotham-medium",
                            padding: "4px 25px"
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

                    <div className="tab-content" >
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
}

export default iaas;
