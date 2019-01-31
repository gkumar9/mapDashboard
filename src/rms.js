import React, { Component } from "react";
import Header from "./Header.js";
import Sidebar from "./Sidebar.js";
import { Link } from "react-router-dom";
import axios from "axios";
import config from "./config.js";
import RmsSidebardata from "./RmsSidebardata.js";
import { withRouter } from "react-router";
const $ = require("jquery");
$.DataTable = require("datatables.net");
class RmsHeader extends Component {
  render() {
    return (
      <div className="container ">
        <nav id="filter" className="navbar navbar-default">
          <div
            className="container-fluid"
            style={{ textAlign: "center", marginTop: "4px" }}
          >
            <Link to="/">
              <button
                style={{
                  marginTop: "1px",
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
            <span style={{ fontSize: "x-large", color: "blue" }}>
              Remote Monitoring System{" "}
            </span>
          </div>
        </nav>
      </div>
    );
  }
}

class Rmsdatatable extends Component {
  componentDidUpdate() {
    let self = this;
    var otable = $("#table_id").DataTable({
      data: this.props.data,
      scrollY: 520,
      paging: false,
      responsive: true,
      columns: [
        {
          data: "vfdSno",
          render: function(data, type, row) {
            return "<a>" + data + "</a>";
          }
        },
        { data: "customerName" },
        { data: "district" },
        { data: "state" }
      ]
    });
    $("#table_id").delegate("tr td:first-child", "click", function() {
      let rmssubdata = otable.row($(this).parents("tr")).data();
      self.props.history.push({
        pathname: "/rms/" + rmssubdata.vfdSno,
        state: { detail: rmssubdata }
      });
    });
  }
  render() {
    return (
      <div style={{ padding: "10px" }} className="col-xs-10">
        <table id="table_id" className="display" width="100%">
          {/* <table id="example" className="display" width="100%" ref={el=>this.el=el}> */}
          <thead>
            <tr>
              <th>VFD/Controller No</th>
              <th>Beneficiary</th>
              <th>District</th>
              <th>State</th>
            </tr>
          </thead>
        </table>
      </div>
    );
  }
}

class Rms extends Component {
  constructor(props) {
    super(props);
    this.state = { list: [], allassetstat: {}, states: [] };
  }
  async componentDidMount() {
    let allassetstattemp = {};
    let listtemp = [];
    let tempstate = [];
    await axios({
      url: config.allassetstat,
      method: "POST",
      data: {},
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => {
        allassetstattemp = res.data.data;
      })
      .catch(e => {
        console.log(e);
      });
    await axios({
      url: config.rmslist,
      method: "POST",
      data: {
        s: "s"
      },
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => {
        listtemp = res.data.data.list;
        tempstate = [];
        res.data.data.list.map(itemmap => {
          let check = false;
          tempstate.map(itemstate => {
            if (itemmap.state === itemstate) {
              check = true;
            }
          });
          if (check === false) {
            tempstate.push(itemmap.state);
          }
        });
      })

      .catch(e => {
        console.log(e);
      });
    this.setState({
      allassetstat: allassetstattemp,
      list: listtemp,
      states: tempstate
    });
  }
  render() {
    return (
      <div>
        <Header />
        <div className="mainbody">
          <Sidebar />
          <div style={{ backgroundColor: "#F2F2F2" }} className="main">
            <RmsHeader />
            <div className="container">
              <div className="row">
                <RmsSidebardata
                  states={this.state.states.length}
                  pump={this.state.list.length}
                  allassetstat={this.state.allassetstat}
                />
                <Rmsdatatable
                  data={this.state.list}
                  history={this.props.history}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Rms);
