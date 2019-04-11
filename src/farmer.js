import React, { Component } from "react";
import Header from "./Header.js";
import Sidebar from "./Sidebar.js";
import FusionCharts from "fusioncharts";
import Maps from "fusioncharts/fusioncharts.maps";
import India from "./fusioncharts.india";
import Bihar from "./fusioncharts.bihar";
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";
import ReactFC from "react-fusioncharts";

ReactFC.fcRoot(FusionCharts, Maps, India, Bihar, FusionTheme);

// import axios from "axios";
// import config from "./config.js";
// import { withRouter } from "react-router";


class FarmerHeader extends Component {
  render() {
    return (
      <div className="container ">
        <nav style={{ backgroundColor: '#edeef0', borderBottomColor: 'darkgray' }} className="navbar navbar-default">
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
            <span style={{ fontSize: "large", color: "blue" }}>
              Farmers
            </span>
          </div>
        </nav>
      </div>
    );
  }
}


const dataSource = {
  chart: {
    bgColor: "#FFFFFF",
    bgAlpha: "0",
    animation: "0",
    showLabels: "0",
    usehovercolor: "1",
    canvasbordercolor: "FFFFFF",
    bordercolor: "#aaa",
    showlegend: "0",
    showshadow: "0",
    legendposition: "BOTTOM",
    legendborderalpha: "0",
    legendbordercolor: "ffffff",
    legendallowdrag: "0",
    legendshadow: "0",
    caption: "State-wise Cash In-flow of India",
    hoverFillalpha: "20",
    hovercolor: "#b3ffec",
    showborder: "1"
  },
  colorrange: {
    minvalue: "0",
    startlabel: "Low",
    endlabel: "High",
    code: "#e65c00",
    gradient: "1",
    color: [
      {
        maxvalue: "200000",
        displayvalue: "Average",
        code: "#ffc34d"
      },
      {
        maxvalue: "400000",
        displayvalue: "Above Average",
        code: "#80bfff"
      },
      {
        maxvalue: "600000",
        code: "#00b386"
      }
    ],
    maxvalue: 0
  },

  data: [
    {
      data: [
        {
          id: "005",
          value: "245000",
          link: "newchart-json-BR"
        }
      ]
    }
  ],

  linkeddata: [
    {
      id: "BR",
      linkedchart: {
        chart: {
          showLabels: "0"
        },
        data: [
          {
            data: []
          }
        ]
      }
    }
  ]
};
const chartConfigs = {
  type: "india",
  width: 600,
  height: 600,
  dataFormat: "json",
  dataSource: dataSource,
  events: {
    renderComplete: function(e) {
      e.sender.configureLink({
        type: "bihar"
      });
    }
  }
};
class Farmer extends Component {
  
  render() {
    return (
      <div>
        <Header />
        <div className="mainbody">
          <Sidebar history={this.props.history} />
          <div style={{ backgroundColor: "#F2F2F2" }} className="main">
            <FarmerHeader />
            <div className="container">
            <div className="row">
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
