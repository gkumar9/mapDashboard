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

// import { withRouter } from "react-router";

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
    canvasbordercolor: "FFFFFF",
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
let chartConfigs = {};
class Farmer extends Component {
  constructor(props) {
    super(props);
    this.state = { farmers: "", states: "",backbutton:[],indiadata:[],statedata:[] };
  }
  handletable=()=>{
    console.log('table click')
  }
  handlechartclik = data => {
    console.log("handleclick", chartConfigs);
    let self=this;
    let check = false;
    dataSource.data[0].data.map(item => {
      if (item.id === data.id) {
        console.log("found it");
        check = true;
      }
    });
    if (check) {
      let checkstate=false;
      let itemstate={};
      self.state.statedata.map((item)=>{
        if(Object.keys(item)[0]===data.id){
          checkstate=true
          itemstate=item
        }
      })
      console.log(itemstate)
      if(checkstate){
        dataSource.data[0].data = itemstate[data.id].mapDataBeanList;
            chartConfigs = {
              type: data.label.replace(/ /g, "").toLowerCase(),
              width: "100%",
              height: 600,
              dataFormat: "json",
              dataSource: dataSource,
              events: {
                entityClick: function(evt, data) {
                  self.handletable();
                }
              }
            };
            // let statetemp={}
            // statetemp[data.id]=res.data.data

            document.getElementById("drillUp").style.display = "block";
            this.setState({backbutton:['india']})
            this.forceUpdate();
      }else{
        axios({
          url: config.farmerdistrict + data.id,
          method: "POST",
          data: {},
          headers: {
            "Content-Type": "application/json"
          }
        })
          .then(res => {
            // console.log(res, data.label.replace(/ /g, "").toLowerCase());
            
            dataSource.data[0].data = res.data.data.mapDataBeanList;
            chartConfigs = {
              type: data.label.replace(/ /g, "").toLowerCase(),
              width: "100%",
              height: 600,
              dataFormat: "json",
              dataSource: dataSource,
              events: {
                entityClick: function(evt, data) {
                  self.handletable();
                }
              }
            };
            let statetemp={}
            statetemp[data.id]=res.data.data
            let tempstatedata=self.state.statedata
            tempstatedata.push(statetemp)
            document.getElementById("drillUp").style.display = "block";
            this.setState({backbutton:['india'],statedata:tempstatedata})
            this.forceUpdate();
          })
          .catch(e => {
            console.log(e);
          });
      }
      
    }
  };
  componentDidMount() {
    console.log('componentdidMount')
    let self = this;
    $("#drillUp").click(function() {
      if(self.state.backbutton.length===2){
        dataSource.data[0].data = self.state.statedata;
        chartConfigs = {
          type: this.state.backbutton[-1],
          width: "100%",
          height: 600,
          dataFormat: "json",
          dataSource: dataSource,
          events: {
            entityClick: function(evt, data) {
              self.handletable(data);
            }
          }
        };
        document.getElementById("drillUp").style.display = "none";
        self.setState({backbutton:[]})
        self.forceUpdate();
      }
      else if(self.state.backbutton.length===1){
        dataSource.data[0].data = self.state.indiadata;
        chartConfigs = {
          type: "india",
          width: "100%",
          height: 600,
          dataFormat: "json",
          dataSource: dataSource,
          events: {
            entityClick: function(evt, data) {
              self.handlechartclik(data);
            }
          }
        };
        document.getElementById("drillUp").style.display = "none";
        self.setState({backbutton:[]})
        self.forceUpdate();
      }
    })
    chartConfigs = {
      type: "india",
      width: "100%",
      height: 600,
      dataFormat: "json",
      dataSource: dataSource,
      events: {
        entityClick: function(evt, data) {
          self.handlechartclik(data);
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
      console.log(res);
      if (res.data.data != null) {
        this.setState({
          farmer: res.data.data.totalNoOfFarmers,
          states: res.data.data.totalNoOfStates,
          indiadata:res.data.data.mapDataBeanList
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
              <FarmerSidebar
                farmers={this.state.farmer}
                states={this.state.states}
              />
              <div
                style={{ paddingLeft: "0" }}
                className="col-xs-10 table-responsive"
              > <button
                id="drillUp"
                style={{
                  display: "none",
                  float: "right",
                  marginRight: "30px",
                  backgroundColor: "#f2f2f2"
                }}
              >
                <span
                  className="glyphicon glyphicon-menu-left"
                  style={{ marginRight: "6px" }}
                  aria-hidden="true"
                />
                Back
              </button>
                <ReactFC {...chartConfigs} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Farmer;
