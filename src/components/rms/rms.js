import React, { Component } from "react";
import Header from "../../Header.js";
import Sidebar from "../../Sidebar.js";
import axios from "axios";
import config from "../../config.js";
import RmsSidebardata from "./RmsSidebardata.js";
import { withRouter } from "react-router";
import Swal from "sweetalert2";
const $ = require("jquery");
$.DataTable = require("datatables.net");
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
            style={{ textAlign: "center", marginTop: "14px" }}
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
            <span style={{ fontFamily:'gotham-medium',fontSize: "large", color: "#b12d28" }}>
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
      scrollY: 440,
      destroy: true,
      order: [[5, "desc"]],
      paging: true,
      pageLength: 100,
      scrollX: true,
      ordering: true,
      responsive: true,
      columns: [
        {
          data: "deviceId",
          render: function(data, type, row) {
            return "<a style='color:blue'>" + data + "</a>";
          }
        },
        { data: "customerId" },
        { data: "customerName" },

        { data: "district" },
        { data: "state" },
        { data: "lastActive" },
        {
          data: "assetType",
          render: function(data, type, row) {
            return '<i style="cursor:pointer" title="edit this cell" class="fa fa-pencil-square-o"></i>';
          }
        }
      ]
    });
    $("#table_id").delegate("tr td:first-child", "click", function() {
      let rmssubdata = otable.row($(this).parents("tr")).data();
      if (rmssubdata && rmssubdata.deviceId !== "0") {
        self.props.history.push({
          pathname: "/rms/" + rmssubdata.deviceId,
          state: { detail: rmssubdata }
        });
      }
    });
    $("#table_id").delegate("tr td:last-child", "click", function() {
      let rmssubdata = otable.row($(this).parents("tr")).data();
      // if(rmssubdata.assetType!=='rooftop'){
        self.props.history.push({
          pathname: "/rmsedit",
          state: { detail: rmssubdata }
        });
      // }
      
    });
  }
  render() {
    return (
      <div style={{ padding: "10px" }} className="col-xs-10 table-responsive">
        <table
          id="table_id"
          className="table table-striped table-hover"
          style={{ width: "100%",padding:'0.5em' }}
        >
          {/* <table id="example" className="display" width="100%" ref={el=>this.el=el}> */}
          <thead>
            <tr>
              <th>Device ID</th>
              <th>Customer ID</th>
              <th>Beneficiary</th>
              <th>District</th>
              <th>State</th>
              <th>Last Active</th>
              <th>Edit</th>
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
        if (res.data.data !== null) {
          allassetstattemp = res.data.data;
          allassetstattemp.totalCo2Emission = parseInt(
            allassetstattemp.totalCo2Emission
          ).toLocaleString("en-IN");
          allassetstattemp.totalDischarge = parseInt(
            allassetstattemp.totalDischarge
          ).toLocaleString("en-IN");
          allassetstattemp.totalEnergy = parseInt(
            allassetstattemp.totalEnergy
          ).toLocaleString("en-IN");
        } else if (res.data.error !== undefined) {
          if (res.data.error.errorCode === 153) {
            window.location.href = "../login.html?redirect=maps";
          } else {
            Swal({
              type: "error",
              title: "Oops...",
              text: res.data.error.errorMsg
            });
          }
        }
      })
      .catch(e => {
        if (e.response.status==401) {
          Swal({
            type: "error",
            title: "Unauthorized",
            text: "Please login again."
          });
          this.props.history.push({
            pathname: "/"
          });
        } else if (e.response.status==403) {
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
        if (res.data.data !== null) {
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
        } else if (res.data.error !== undefined) {
          if (res.data.error.errorCode === 153) {
            window.location.href = "../login.html?redirect=maps";
          } else {
            Swal({
              type: "error",
              title: "Oops...",
              text: res.data.error.errorMsg
            });
          }
        }
      })

      .catch(e => {
        if (e.response.status==401) {
          Swal({
            type: "error",
            title: "Unauthorized",
            text: "Please login again."
          });
          this.props.history.push({
            pathname: "/"
          });
        } else if (e.response.status==403) {
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
          <Sidebar kc={this.props.kc} history={this.props.history} />
          <div style={{ backgroundColor: "#F2F2F2" }} className="main">
            <RmsHeader />
            <div className="container">
              <div className="row">
                <RmsSidebardata
                  states={this.state.states.length.toLocaleString("en-IN")}
                  pump={this.state.list.length.toLocaleString("en-IN")}
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
