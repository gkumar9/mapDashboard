import React, { Component } from "react";
import Header from "./Header.js";
import Sidebar from "./Sidebar.js";
import FusionCharts from "fusioncharts";
import Maps from "fusioncharts/fusioncharts.maps";
import India from "./fusioncharts.india";
import Bihar from "./fusioncharts.bihar";
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.gammel";
import ReactFC from "react-fusioncharts";
import user from "./pins/user.png";
import states from "./pins/5.png";
import axios from "axios";
import config from "./config.js";
const $ = require("jquery");
ReactFC.fcRoot(FusionCharts, Maps, India, Bihar, FusionTheme);

class FarmerSidebar extends Component {
  render() {
    return (
      <div
        style={{
          borderRightStyle: "groove",
          minHeight: "100vh",
          textAlign: "center"
        }}
        className="col-xs-2 rmssidebar"
      >
        <h4 style={{ marginTop: "40px", color: "gray", fontSize: "large" }}>
          Our Impact
        </h4>
        <ul style={{ marginTop: "40px", color: "black" }}>
          <li className="rmssidebar">
            <div className="row">
              <div className="col-xs-3">
                <img
                  className="responsive"
                  alt="user"
                  src={user}
                  style={{ width: "46px", marginLeft: "-11px" }}
                />
              </div>
              <div className="col-xs-9">
                <span>
                  <b>{this.props.farmers}</b>
                </span>
                <p>
                  <small>Number of farmers</small>
                </p>
              </div>
            </div>
          </li>
          {this.props.states !== null && (
            <li className="rmssidebar">
              <div className="row">
                <div className="col-xs-3">
                  <img
                    className="responsive"
                    alt="states"
                    src={states}
                    style={{ width: "32px", marginLeft: "-11px" }}
                  />
                </div>
                <div className="col-xs-9">
                  <span>
                    <b>{this.props.states}</b>
                  </span>
                  <p>
                    <small>Number of states</small>
                  </p>
                </div>
              </div>
            </li>
          )}
          {this.props.district !== null && (
            <li className="rmssidebar">
              <div className="row">
                <div className="col-xs-3">
                  <img
                    className="responsive"
                    alt="states"
                    src={states}
                    style={{ width: "32px", marginLeft: "-11px" }}
                  />
                </div>
                <div className="col-xs-9">
                  <span>
                    <b>{this.props.district}</b>
                  </span>
                  <p>
                    <small>Number of district</small>
                  </p>
                </div>
              </div>
            </li>
          )}
        </ul>
      </div>
    );
  }
}
class FarmerHeader extends Component {
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
            <span style={{ fontSize: "large", color: "blue" }}>Farmers</span>
          </div>
        </nav>
      </div>
    );
  }
}
const dataSource = {
  chart: {
    // canvasBgAlpha: "0",
    bgColor: "#F2F2F2",
    // bgAlpha: "50",
    // animation: "0",
    showLabels: "0",
    usehovercolor: "1",
    showToolTip: "0",
    toolTipBorderColor: "#666666",
    toolTipBgColor: "#efefef",
    toolTipBgAlpha: "80",
    showToolTipShadow: "1",
    canvasbordercolor: "#F2F2F2",
    bordercolor: "#aaa",
    showlegend: "0",
    showshadow: "0",
    // legendposition: "BOTTOM",
    // legendborderalpha: "0",
    // legendbordercolor: "ffffff",
    // legendallowdrag: "0",
    // legendshadow: "0",
    // caption: "State-wise Cash In-flow of India",
    hoverFillalpha: "20",
    hovercolor: "#b3ffec",
    showborder: "1"
    // borderColor:'#ffffff',
    // theme: "gammel"
  },
  colorrange: {
    minvalue: "0",
    startlabel: "Low",
    endlabel: "High",
    code: "#e65c00",
    gradient: "1",
    color: [
      {
        maxvalue: "100",
        code: "#ffc34d"
      },
      {
        maxvalue: "800",
        code: "#80bfff"
      },
      {
        maxvalue: "1000",
        code: "#00b386"
      }
    ],
    maxvalue: 0
  },

  data: [
    {
      data: [
        // {
        //   id: "005",
        //   value: "245000",
        //   link: "newchart-json-BI"
        // }
      ]
    }
  ]
};
class Farmer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      farmers: "",
      states: null,
      district: null,
      backbutton: [],
      indiadata: [],
      statedata: [],
      chart: null,
      tabledata: [],
      ch: {},
      actualValue: "Hover on the plot to see the value along with the label",
      message: "Hover on the plot to see the value along with the label"
    };
  }
  tableshow = data => {
    let number = 1;
    axios({
      url: config.farmertable + data.id + "/farmerlist/" + number,
      method: "POST",
      data: {},
      headers: {
        "Content-Type": "application/json"
      }
    }).then(res => {
      console.log(res);
      this.setState({ tabledata: res.data.data.list });
    });
  };
  handletable = data => {
    // this.state.ch.dispose();
    let datatemp = Object.assign({}, data);
    // let self = this;

    let check = false;
    dataSource.data[0].data.map(item => {
      if (item.id === datatemp.originalId) {
        console.log("found it");
        check = true;
      }
    });
    if (check) {
      this.setState({ backbutton: ["india", "state"] });

      document.getElementById("chartmap").style.display = "none";
      document.getElementById("farmersidebar").style.display = "none";
      document.getElementById("maptable").style.display = "block";
      this.tableshow(data);
    }
  };
  handlechartclik = data => {
    let datatemp = Object.assign({}, data);
    let self = this;

    let check = false;
    dataSource.data[0].data.map(item => {
      if (item.id === datatemp.id) {
        console.log("found it");
        check = true;
      }
    });

    if (check) {
      let checkstate = false;
      let itemstate = {};
      self.state.statedata.map(item => {
        if (Object.keys(item)[0] === datatemp.id) {
          checkstate = true;
          itemstate = item;
        }
      });
      if (checkstate) {
        dataSource.data[0].data = itemstate[datatemp.id].mapDataBeanList;
        let chartConfigs = {
          type: datatemp.label.replace(/ /g, "").toLowerCase(),
          width: "100%",
          height: 600,
          dataFormat: "json",
          dataSource: dataSource,
          events: {
            entityClick: function(evt, data) {
              self.handletable(data);
            },
            entityRollOver: function(evt, data) {
              self.dataplotrollover(evt, data);
            },
            entityRollOut: function(evt, data) {
              self.dataplotrollout(evt, data);
            }
          }
        };

        this.setState({
          backbutton: ["india"],
          farmers: itemstate[datatemp.id].totalNoOfFarmers,
          states: null,
          chart: chartConfigs,
          district: itemstate[datatemp.id].totalNoOfDistricts
        });
        document.getElementById("drillUp").style.display = "block";
      } else {
        axios({
          url: config.farmerdistrict + datatemp.id,
          method: "POST",
          data: {},
          headers: {
            "Content-Type": "application/json"
          }
        })
          .then(res => {
            dataSource.data[0].data = res.data.data.mapDataBeanList;
            let chartConfigs = {
              type: datatemp.label.replace(/ /g, "").toLowerCase(),
              width: "100%",
              height: 600,
              dataFormat: "json",
              dataSource: dataSource,
              events: {
                entityClick: function(evt, data) {
                  self.handletable(data);
                },
                entityRollOver: function(evt, data) {
                  self.dataplotrollover(evt, data);
                },
                entityRollOut: function(evt, data) {
                  self.dataplotrollout(evt, data);
                }
              }
            };
            let statetemp = {};
            statetemp[datatemp.id] = res.data.data;
            let tempstatedata = self.state.statedata;
            tempstatedata.push(statetemp);

            this.setState({
              backbutton: ["india"],
              statedata: tempstatedata,
              farmers: res.data.data.totalNoOfFarmers,
              states: null,
              chart: chartConfigs,
              district: res.data.data.totalNoOfDistricts
            });
            document.getElementById("drillUp").style.display = "block";
          })
          .catch(e => {
            console.log(e);
          });
      }
    }
  };
  renderComplete = ch => {
    this.setState({ ch });
  };
  dataplotrollover = (eventObj, dataObj) => {
    if (dataObj.dataValue !== null) {
      this.setState({
        message: [
          "You are currently hovering over ",
          <strong>{dataObj.label}</strong>,
          " whose value is ",
          <strong>{dataObj.dataValue}</strong>
        ]
      });
    }
  };

  // Event callback handler for 'dataplotRollOut'.
  // Resets to the original message.
  dataplotrollout = (eventObj, dataObj) => {
    this.setState({
      message: this.state.actualValue
    });
  };
  componentDidMount() {
    let self = this;

    $("#drillUp").click(function() {
      if (self.state.backbutton.length === 2) {
        // // console.log(dataSource)
        // // console.log(self.state.statedata[0][Object.keys(self.state.statedata[0])[0]].mapDataBeanList)
        // // dataSource.data[0].data = self.state.statedata[0][Object.keys(self.state.statedata[0])[0]].mapDataBeanList;
        // let chartConfigss = {
        //   type: "india",
        //   width: "100%",
        //   height: 600,
        //   dataFormat: "json",
        //   dataSource: dataSource,
        //   events: {
        //     entityClick: function(evt, data) {
        //       self.handletable(data);
        //     }
        //   }
        // };
        document.getElementById("chartmap").style.display = "block";
        document.getElementById("farmersidebar").style.display = "block";
        document.getElementById("maptable").style.display = "none";
        self.setState({ backbutton: ["india"] });
        self.forceUpdate();
      } else if (self.state.backbutton.length === 1) {
        dataSource.data[0].data = self.state.indiadata.mapDataBeanList;
        let chartConfigs = {
          type: "india",
          width: "100%",
          height: 600,
          dataFormat: "json",
          dataSource: dataSource,
          events: {
            entityClick: function(evt, data) {
              self.handlechartclik(data);
            },
            entityRollOver: function(evt, data) {
              self.dataplotrollover(evt, data);
            },
            entityRollOut: function(evt, data) {
              self.dataplotrollout(evt, data);
            }
          }
        };
        document.getElementById("drillUp").style.display = "none";
        self.setState({
          backbutton: [],
          farmers: self.state.indiadata.totalNoOfFarmers,
          states: self.state.indiadata.totalNoOfStates,
          chart: chartConfigs,
          district: null
        });
        self.forceUpdate();
      }
    });
    let chartConfigs = {
      type: "india",
      width: "100%",
      height: 600,
      dataFormat: "json",
      dataSource: dataSource,
      events: {
        entityClick: function(evt, data) {
          self.handlechartclik(data);
        },
        entityRollOver: function(evt, data) {
          self.dataplotrollover(evt, data);
        },
        entityRollOut: function(evt, data) {
          self.dataplotrollout(evt, data);
        }
      }
    };
    axios({
      url: config.farmerstate,
      method: "POST",
      data: {},
      headers: {
        "Content-Type": "application/json"
      }
    }).then(res => {
      if (res.data.data != null) {
        this.setState({
          farmer: res.data.data.totalNoOfFarmers,
          states: res.data.data.totalNoOfStates,
          indiadata: res.data.data,
          chart: chartConfigs
        });
        dataSource.data[0].data = res.data.data.mapDataBeanList;
      } else if (res.data.error !== undefined) {
        if (res.data.error.errorCode === 153) {
          window.location.href = "../login.html?redirect=maps";
        }
      }
      this.forceUpdate();
    });
  }
  render() {
    return (
      <div>
        <Header />
        <div className="mainbody">
          <Sidebar history={this.props.history} />
          <div style={{ backgroundColor: "#F2F2F2" }} className="main">
            <FarmerHeader />
            <div style={{ marginLeft: "0" }} className="row">
              <div id="farmersidebar">
                <FarmerSidebar
                  farmers={this.state.farmer}
                  district={this.state.district}
                  states={this.state.states}
                />
              </div>
              <div style={{ paddingLeft: "0" }} className=" table-responsive">
                {" "}
                <button
                  className="btn btn-outline-secondary btn-sm"
                  id="drillUp"
                  style={{
                    display: "none",
                    float: "right",
                    marginRight: "30px",
                    marginTop: "10px",
                    color: "blue"
                    // backgroundColor: "#f2f2f2"
                  }}
                >
                  <span
                    className="glyphicon glyphicon-menu-left"
                    style={{ marginRight: "6px" }}
                    aria-hidden="true"
                  />
                  Back
                </button>
                <p
                  style={{
                    padding: "10px",
                    background: "#f5f2f0",
                    textAlign: "center"
                  }}
                >
                  {this.state.message}
                </p>
                <div id="chartmap">
                  <ReactFC {...this.state.chart} />
                </div>
                <div
                  id="maptable"
                  style={{
                    display: "none",
                    overflow: "scroll",
                    maxHeight: "80vh"
                  }}
                >
                  {this.state.tabledata.map(item,number => {
                    return (
                      {number % 2 === 0?(
                        <div
                        style={{ padding: "2px",marginBottom:'5px',backgroundColor:'lightgray' }}
                        class="panel panel-default"
                      >
                      ):(
                        <div
                        style={{ padding: "2px",marginBottom:'5px' }}
                        class="panel panel-default"
                      >
                      )}
                      
                        <div
                          class="panel-heading"
                          style={{ backgroundColor: "transparent" }}
                        >
                          <div className="row">
                            <div className="col-md-10">
                              <span style={{ fontSize: "large" }}>
                                <b>{item.name}</b>,{" "}
                                <small>{item.contactNo}</small>
                              </span>
                            </div>
                            <div className="col-md-2">
                              <div>
                                <span>Last Update:{item.lastUpdate}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="panel-body">
                          <div className="row">
                            <div className="col-md-4">
                              <span>S/O {item.fatherName}</span>
                              <br />
                              <span>
                                DOB: {item.dob},{" "}
                                {item.gender === "M" ? "Male" : "Female"}
                              </span>
                              <br />
                              <span>
                                Farmer registration date: {item.farmerRegDate}
                              </span>
                            </div>
                            <div className="col-md-4">
                              <span>
                                Community: {item.community}, {item.subCommunity}
                              </span>
                              <br />
                              <span>
                                Govt. card Holder: {item.govtCardHolder}
                              </span>
                              <br />
                              <span>Land Size: {item.totalLandSize}</span>
                              <br />
                            </div>
                            <div className="col-md-4">
                              <span>House type: {item.houseType}</span>
                              <br />
                              <span>
                                {item.block}, {item.district}, {item.village}
                              </span>
                              <br />
                              <span>
                                {item.state}, PIN: {item.pincode}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
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
