import React, { Component } from "react";
import Header from "./Header.js";
import Sidebar from "./Sidebar.js";
import { Link } from "react-router-dom";
import notify from "bootstrap-notify";

// import { MyMapComponent } from "./rmseditmap.js";
import axios from "axios";
import config from "./config.js";
import Swal from "sweetalert2";
import statedistrict from "./state_json.js";
const $ = require("jquery");
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
            <span style={{ fontSize: "large", color: "blue" }}>
              RMS edit portal{" "}
            </span>
          </div>
        </nav>
      </div>
    );
  }
}
class FormLeft extends Component {
  render() {
    return (
      <form className="form-horizontal">
        {this.props.rmsvalues.rmsVendorId !== undefined && (
          <div>
            <div className="form-group">
              <label
                htmlFor="inputrmsVendorId"
                className="col-sm-6 farmerinforowtitle"
              >
                RMS Vendor ID
              </label>
              <div className="col-sm-6">
                {/* <input
                name="rmsVendorId"
                type="text"
                className="form-control"
                id="inputrmsVendorId"
                value={this.props.rmsvalues.rmsVendorId || ""}
                onChange={this.props.handleInputChange}
                placeholder="RMS Vendor ID"
              /> */}
                <select
                  name="rmsVendorId"
                  value={this.props.rmsvalues.rmsVendorId || ""}
                  onChange={this.props.handleInputChange}
                  className="form-control"
                  id="selrmsvendorid"
                >
                  {this.props.rmsvendoridlist.map((item, index) => (
                    <option key={index} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="form-group">
              <label
                htmlFor="rmsvendorname"
                className="col-sm-6 farmerinforowtitle"
              >
                RMS Vendor Name
              </label>
              <div className="col-sm-6">
                <input
                  className="form-control"
                  disabled
                  value={this.props.rmsvendoridlistnameselected}
                />
              </div>
            </div>
          </div>
        )}

        <div className="form-group">
          <label
            htmlFor="inputinstallationDate"
            className="col-sm-6 farmerinforowtitle"
          >
            Installation Date
          </label>
          <div className="col-sm-6">
            <input
              name="installationDate"
              type="date"
              pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}"
              className="form-control"
              // id="installationDate"
              value={this.props.rmsvalues.installationDate || ""}
              onChange={this.props.handleInputChange}
              placeholder="Installation Date"
            />
          </div>
        </div>
        {/* )} */}
        {/* {this.props.rmsvalues.registrationSource !== undefined && (
          <div className="form-group">
            <label
              htmlFor="inputregsource"
              className="col-sm-6 farmerinforowtitle"
            >
              Regstration Source
            </label>
            <div className="col-sm-6">
              <input
                name="registrationSource"
                type="text"
                disabled
                className="form-control"
                id="inputregsource"
                value={this.props.rmsvalues.registrationSource || ""}
                onChange={this.props.handleInputChange}
                placeholder="Regstration Source"
              />
            </div>
          </div>
        )} */}

        {/* {this.props.rmsvalues.deviceId !== undefined && (
          <div className="form-group">
            <label
              htmlFor="inputdeviceid"
              className="col-sm-6 farmerinforowtitle"
            >
              Device Id
            </label>
            <div className="col-sm-6">
              <input
                name="deviceId"
                type="text"
                className="form-control"
                id="inputdeviceid"
                value={this.props.rmsvalues.deviceId || ""}
                onChange={this.props.handleInputChange}
                placeholder="Device Id"
              />
            </div>
          </div>
        )} */}
        {this.props.rmsvalues.projectCode !== undefined && (
          <div className="form-group">
            <label
              htmlFor="inputProjectCode"
              className="col-sm-6 farmerinforowtitle"
            >
              Project Code
            </label>
            <div className="col-sm-6">
              <input
                name="projectCode"
                type="text"
                className="form-control"
                id="inputProjectCode"
                value={this.props.rmsvalues.projectCode || ""}
                onChange={this.props.handleInputChange}
                placeholder="Project Code"
              />
            </div>
          </div>
        )}
        {this.props.rmsvalues.vfdMake !== undefined && (
          <div className="form-group">
            <label
              htmlFor="inputvfdMake"
              className="col-sm-6 farmerinforowtitle"
            >
              VFD Make
            </label>
            <div className="col-sm-6">
              <input
                name="vfdMake"
                type="text"
                className="form-control"
                id="inputvfdMake"
                value={this.props.rmsvalues.vfdMake || ""}
                onChange={this.props.handleInputChange}
                placeholder="VFD Make"
              />
            </div>
          </div>
        )}

        {this.props.rmsvalues.powerType !== undefined && (
          <div className="form-group">
            <label
              htmlFor="inputpowerType"
              className="col-sm-6 farmerinforowtitle"
            >
              Power Type
            </label>
            <div className="col-sm-6">
              {/* <input
                name="powerType"
                type="text"
                className="form-control"
                id="inputpowerType"
                value={this.props.rmsvalues.powerType}
                onChange={this.props.handleInputChange}
                placeholder="Power Type"
              /> */}
              <select
                name="powerType"
                onChange={this.props.handleInputChange}
                value={this.props.rmsvalues.powerType || "AC"}
                className="form-control"
                id="sel221"
              >
                <option value="AC">AC</option>
                <option value="DC">DC</option>
              </select>
            </div>
          </div>
        )}
        {this.props.rmsvalues.pumpCapability !== undefined && (
          <div className="form-group">
            <label
              htmlFor="inputpumpCapability"
              className="col-sm-6 farmerinforowtitle"
            >
              Pump Capability
            </label>
            <div className="col-sm-6">
              <select
                name="pumpCapability"
                onChange={this.props.handleInputChange}
                value={this.props.rmsvalues.pumpCapability || "NA"}
                className="form-control"
                id="sel221"
              >
                <option value="1HP">1HP</option>
                <option value="2HP">2HP</option>
                <option value="3HP">3HP</option>
                <option value="5HP">5HP</option>
                <option value="7.5HP">7.5HP</option>
                <option value="10HP">10HP</option>
                <option value="NA">NA</option>
              </select>
            </div>
          </div>
        )}
        {/* {this.props.rmsvalues.pumpType !== undefined && (
          <div className="form-group">
            <label
              htmlFor="inputpumpType"
              className="col-sm-6 farmerinforowtitle"
            >
              Pump Type
            </label>
            <div className="col-sm-6">
              <input
                name="pumpType"
                type="text"
                disabled
                className="form-control"
                id="inputpumpType"
                value={this.props.rmsvalues.pumpType || ""}
                onChange={this.props.handleInputChange}
                placeholder="Pump Type"
              />
            </div>
          </div>
        )} */}
        {this.props.rmsvalues.pumpMake !== undefined && (
          <div className="form-group">
            <label
              htmlFor="inputpumpMake"
              className="col-sm-6 farmerinforowtitle"
            >
              Pump Make
            </label>
            <div className="col-sm-6">
              <input
                name="pumpMake"
                type="text"
                className="form-control"
                id="inputpumpMake"
                value={this.props.rmsvalues.pumpMake || ""}
                onChange={this.props.handleInputChange}
                placeholder="Pump Make"
              />
            </div>
          </div>
        )}
        {this.props.rmsvalues.pumpSno !== undefined && (
          <div className="form-group">
            <label
              htmlFor="inputpumpSno"
              className="col-sm-6 farmerinforowtitle"
            >
              Pump Sno
            </label>
            <div className="col-sm-6">
              <input
                name="pumpSno"
                type="text"
                className="form-control"
                id="inputpumpSno"
                value={this.props.rmsvalues.pumpSno || ""}
                onChange={this.props.handleInputChange}
                placeholder="Pump Sno"
              />
            </div>
          </div>
        )}

        {this.props.rmsvalues.panelMake !== undefined && (
          <div className="form-group">
            <label
              htmlFor="inputpanelMake"
              className="col-sm-6 farmerinforowtitle"
            >
              Panel Make
            </label>
            <div className="col-sm-6">
              <input
                name="panelMake"
                type="text"
                className="form-control"
                id="inputpanelMake"
                value={this.props.rmsvalues.panelMake || ""}
                onChange={this.props.handleInputChange}
                placeholder="Panel Make"
              />
            </div>
          </div>
        )}
        {this.props.rmsvalues.panelWP !== undefined && (
          <div className="form-group">
            <label
              htmlFor="inputpanelWP"
              className="col-sm-6 farmerinforowtitle"
            >
              Panel WP
            </label>
            <div className="col-sm-6">
              <input
                name="panelWP"
                type="text"
                className="form-control"
                id="inputpanelWP"
                value={this.props.rmsvalues.panelWP || ""}
                onChange={this.props.handleInputChange}
                placeholder="Panel WP"
              />
            </div>
          </div>
        )}
      </form>
    );
  }
}
class FormRight extends Component {
  render() {
    return (
      <form className="form-horizontal">
        {/* {this.props.rmsvalues.rmsAvailability !== undefined && (
          <div className="form-group">
            <label
              htmlFor="inputrmsAvailability"
              className="col-sm-6 farmerinforowtitle"
            >
              RMS Availability
            </label>
            <div className="col-sm-6">
              <input
                name="rmsAvailability"
                type="text"
                disabled
                className="form-control"
                id="inputrmsAvailability"
                value={this.props.rmsvalues.rmsAvailability || ""}
                onChange={this.props.handleInputChange}
                placeholder="RMS Availability"
              />
            </div>
          </div>
        )} */}
        {this.props.rmsvendorimeicheck === true ? (
          <div className="form-group">
            <label
              htmlFor="inputimei"
              className="col-sm-6 farmerinforowtitle "
              data-toggle="popover"
              data-placement="right"
              data-content="Vivamus sagittis lacus vel augue laoreet rutrum faucibus."
            >
              Imei
            </label>
            <div className="col-sm-6">
              <input
                name="imei"
                type="text"
                className="form-control"
                id="inputimei"
                value={this.props.rmsvalues.imei || ""}
                onChange={this.props.handleInputChange}
                placeholder="Imei"
              />
            </div>
          </div>
        ) : (
          <div className="form-group">
            <label
              htmlFor="inputvfdSno"
              className="col-sm-6 farmerinforowtitle"
            >
              VFD Sno
            </label>
            <div className="col-sm-6">
              <input
                name="vfdSno"
                type="text"
                className="form-control"
                id="inputvfdSno"
                value={this.props.rmsvalues.vfdSno || ""}
                onChange={this.props.handleInputChange}
                placeholder="VFD Sno"
              />
            </div>
          </div>
        )}

        {/* {this.props.rmsvalues.farmerId !== undefined && (
          <div className="form-group">
            <label
              htmlFor="inputfarmerId"
              className="col-sm-6 farmerinforowtitle"
            >
              Farmer ID
            </label>
            <div className="col-sm-6">
              <input
                name="farmerId"
                type="text"
                disabled
                className="form-control"
                id="inputfarmerId"
                value={this.props.rmsvalues.farmerId || ""}
                onChange={this.props.handleInputChange}
                placeholder="Farmer ID"
              />
            </div>
          </div>
        )} */}
        {this.props.rmsvalues.state !== undefined && (
          <div className="form-group">
            <label
              htmlFor="inputinstate"
              className="col-sm-6 farmerinforowtitle"
            >
              State
            </label>
            <div className="col-sm-6">
              {/* <input
                name="state"
                type="text"
                className="form-control"
                id="inputinstate"
                value={this.props.rmsvalues.state || ""}
                onChange={this.props.handleInputChange}
                placeholder="State"
              /> */}
              <select
                name="state"
                value={this.props.rmsvalues.state || ""}
                onChange={this.props.handleInputChange}
                className="form-control"
                id="inputinstate"
              >
                {Object.keys(statedistrict).map(item => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}
        {this.props.rmsvalues.district !== undefined && (
          <div className="form-group">
            <label
              htmlFor="inputdistrict"
              className="col-sm-6 farmerinforowtitle"
            >
              District
            </label>
            <div className="col-sm-6">
              {/* <input
                name="district"
                type="text"
                className="form-control"
                id="inputdistrict"
                value={this.props.rmsvalues.district || ""}
                onChange={this.props.handleInputChange}
                placeholder="District"
              /> */}
              {this.props.rmsvalues.state !== null &&
                this.props.rmsvalues.state !== undefined && (
                  <select
                    name="district"
                    id="inputdistrict"
                    value={this.props.rmsvalues.district || ""}
                    onChange={this.props.handleInputChange}
                    className="form-control"
                  >
                    {statedistrict[this.props.rmsvalues.state].map(item => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                )}
            </div>
          </div>
        )}

        {this.props.rmsvalues.block !== undefined && (
          <div className="form-group">
            <label htmlFor="inputblock" className="col-sm-6 farmerinforowtitle">
              Block
            </label>
            <div className="col-sm-6">
              <input
                name="block"
                type="text"
                className="form-control"
                id="inputblock"
                value={this.props.rmsvalues.block || ""}
                onChange={this.props.handleInputChange}
                placeholder="Block"
              />
            </div>
          </div>
        )}
        {this.props.rmsvalues.village !== undefined && (
          <div className="form-group">
            <label
              htmlFor="inputvillage"
              className="col-sm-6 farmerinforowtitle"
            >
              Village
            </label>
            <div className="col-sm-6">
              <input
                name="village"
                type="text"
                className="form-control"
                id="inputvillage"
                value={this.props.rmsvalues.village || ""}
                onChange={this.props.handleInputChange}
                placeholder="Village"
              />
            </div>
          </div>
        )}
        {this.props.rmsvalues.habitation !== undefined && (
          <div className="form-group">
            <label
              htmlFor="inputhabitation"
              className="col-sm-6 farmerinforowtitle"
            >
              Habitation
            </label>
            <div className="col-sm-6">
              <input
                name="habitation"
                type="text"
                className="form-control"
                id="inputhabitation"
                value={this.props.rmsvalues.habitation || ""}
                onChange={this.props.handleInputChange}
                placeholder="Habitation"
              />
            </div>
          </div>
        )}
        {this.props.rmsvalues.depth !== undefined && (
          <div className="form-group">
            <label htmlFor="inputdepth" className="col-sm-6 farmerinforowtitle">
              Depth (meter)
            </label>
            <div className="col-sm-6">
              <input
                name="depth"
                type="text"
                className="form-control"
                id="inputdepth"
                value={this.props.rmsvalues.depth || ""}
                onChange={this.props.handleInputChange}
                placeholder="Depth"
              />
            </div>
          </div>
        )}
        {/* {this.props.rmsvalues.modifiedBy !== undefined && (
          <div className="form-group">
            <label
              htmlFor="inputmodifiedBy"
              className="col-sm-6 farmerinforowtitle"
            >
              Power Type
            </label>
            <div className="col-sm-6">
            <select
              name="powerType"
              onChange={this.props.handleInputChange}
              value={this.props.rmsvalues ||"AC"}
              className="form-control"
              id="sel1"
            >
              <option value="name">AC</option>
              <option value="uid">DC</option>
              
            </select>
            </div>
          </div>
        )} */}
        {this.props.rmsvalues.application !== undefined && (
          <div className="form-group">
            <label
              htmlFor="inputapplication"
              className="col-sm-6 farmerinforowtitle"
            >
              Application
            </label>
            <div className="col-sm-6">
              {/* <input
                name="application"
                type="text"
                className="form-control"
                id="inputapplication"
                value={this.props.rmsvalues.application || ""}
                onChange={this.props.handleInputChange}
                placeholder="Application"
              /> */}
              <select
                name="application"
                id="inputapplication"
                value={this.props.rmsvalues.application || ""}
                onChange={this.props.handleInputChange}
                className="form-control"
              >
                <option value="Agriculture">Agriculture</option>
                <option value="Irrigation">Irrigation</option>
                <option value="Drinking Water">Drinking Water</option>
                <option value="Rooftop">Rooftop</option>
                <option value="NA">NA</option>
              </select>
            </div>
          </div>
        )}
        {this.props.rmsvalues.latitude !== undefined && (
          <div className="form-group">
            <label
              htmlFor="inputlatitude"
              className="col-sm-6 farmerinforowtitle"
            >
              Latitude
            </label>
            <div className="col-sm-6">
              <input
                name="latitude"
                type="number"
                className="form-control"
                id="inputlatitude"
                value={this.props.rmsvalues.latitude}
                onChange={this.props.handleInputChange}
                placeholder="Latitude"
              />
            </div>
          </div>
        )}
        {this.props.rmsvalues.longitude !== undefined && (
          <div className="form-group">
            <label
              htmlFor="inputlongitude"
              className="col-sm-6 farmerinforowtitle"
            >
              Longitude
            </label>
            <div className="col-sm-6">
              <input
                name="longitude"
                type="number"
                className="form-control"
                id="inputlongitude"
                value={this.props.rmsvalues.longitude}
                onChange={this.props.handleInputChange}
                placeholder="Longitude"
              />
            </div>
          </div>
        )}
      </form>
    );
  }
}
class Rmsedit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rmsvalues: {},
      rmsvendorimeicheck: false,
      rmsvendoridlistnameselected: ""
    };
    this.rmsvendoridlist = [
      "1001",
      "1006",
      "1005",
      "1002",
      "1003",
      "1004",
      "NA",
      "1008",
      "1007",
      "1010",
      "1009"
    ];
    this.rmsvendoridlistname = [
      { "1001": "Unique" },
      { "1002": "Analogics" },
      { "1003": "Rotosol" },
      { "1004": "Shakti_AC" },
      { "1005": "Shakti_DC" },
      { "1006": "CLARO_AC" },
      { "1007": "Metrics" },
      { "1008": "FUJI" },
      { "1009": "Raydean" },
      { "1010": "Ecozen" },
      { NA: "NA" }
    ];
    this.imeilist = ["1001", "1006", "1007", "1008", "1009"];
  }
  handlermsvendoridchange = async () => {
    await this.setState({
      rmsvendorimeicheck: false
    });
    await this.imeilist.map(async item => {
      if (item === this.state.rmsvalues.rmsVendorId) {
        await this.setState({
          rmsvendorimeicheck: true
        });
      }
    });
    this.forceUpdate();
  };
  componentDidMount() {
    if (this.props.location.state !== undefined) {
      // console.log(this.props.location.state.detail);
      axios({
        url: config.rmseditget + this.props.location.state.detail.id + "/",
        method: "POST",
        data: {},
        headers: {
          "Content-Type": "application/json"
        }
      })
        .then(res => {
          if (res.data.data !== null) {
            let tempinstallationdate = res.data.data.installationDate.split(
              "-"
            );
            res.data.data.installationDate =
              tempinstallationdate[2] +
              "-" +
              tempinstallationdate[1] +
              "-" +
              tempinstallationdate[0];
            this.setState({ rmsvalues: res.data.data });
            this.rmsvendoridlistname.map(async (item, index) => {
              if (Object.keys(item)[0] === res.data.data.rmsVendorId) {
                let temp = this.rmsvendoridlistname[index][
                  res.data.data.rmsVendorId
                ];
                this.setState({ rmsvendoridlistnameselected: temp });
              }
            });
            this.handlermsvendoridchange();
          } else {
            Swal({
              type: "error",
              title: "Oops...",
              text: res.data.error.errorMsg
            });
            this.props.history.push({
              pathname: "/rms"
            });
          }
        })
        .catch(e => {
          Swal({
            type: "error",
            title: "Oops...",
            text: e
          });
        });
    } else {
      this.props.history.push({
        pathname: "/rms"
      });
    }
  }
  handlesave = async () => {
    if (
      this.state.rmsvalues.latitude > 37 ||
      this.state.rmsvalues.latitude < 8
    ) {
      $.notify(
        {
          // options
          message: "Please set valid Latitude value.(Lattitude - 8′N to 37′N)"
        },
        {
          // settings
          type: "danger",
          placement: {
            from: "top",
            align: "center"
          }
        }
      );
      // alert("Please set valid Latitude value.(Lattitude - 8′N to 37′N)");

      return;
    }
    if (
      this.state.rmsvalues.longitude > 97 ||
      this.state.rmsvalues.longitude < 68
    ) {
      $.notify(
        {
          // options
          message: "Please set valid Longitude value.(Longitude - 68′E to 97′E)"
        },
        {
          // settings
          type: "danger",
          placement: {
            from: "top",
            align: "center"
          }
        }
      );
      // alert("Please set valid Longitude value.(Longitude - 68′E to 97′E)");

      return;
    }
    let tempdatechangedobject = this.state.rmsvalues;
    if (this.state.rmsvalues.installationDate) {
      let tempdatearray = this.state.rmsvalues.installationDate.split("-");
      // let tempdatechangedobject=this.state.rmsvalues
      tempdatechangedobject.installationDate =
        tempdatearray[2] + "-" + tempdatearray[1] + "-" + tempdatearray[0];
      // await this.setState({rmsvalues:tempdatechangedobject})
    }
    axios({
      url: config.updatermsedit,
      method: "POST",
      data: tempdatechangedobject,
      headers: {
        "Content-Type": "application/json"
      }
    }).then(res => {
      // console.log(res.data.data)
      if (res.data.data !== null && res.data.data.result) {
        Swal({
          type: "success",
          title: "Successfully data updated"
          // text: res.data.error.errorMsg
        });
        this.props.history.push({
          pathname: "/rms"
        });
        // this.forceUpdate();
      } else {
        alert(res.data.error.errorMsg);
      }
    });
  };
  handlecancel = () => {
    this.props.history.push({
      pathname: "/rms"
    });
  };
  handleInputChange = async event => {
    let namefield = event.target.name;
    let temp = this.state.rmsvalues;
    temp[event.target.name] = event.target.value;
    if (event.target.name === "state") {
      temp.district = statedistrict[event.target.value][0];
    }
    if (namefield === "rmsVendorId") {
      this.rmsvendoridlistname.map(async (item, index) => {
        if (Object.keys(item)[0] === event.target.value) {
          await this.setState({
            rmsvendoridlistnameselected: this.rmsvendoridlistname[index][
              event.target.value
            ]
          });
        }
      });
    }
    await this.setState({ rmsvalues: temp });
    if (namefield === "rmsVendorId") {
      this.handlermsvendoridchange();
    }
  };

  render() {
    return (
      <div>
        <Header />
        <div className="mainbody">
          <Sidebar history={this.props.history} />
          <div style={{ backgroundColor: "#F2F2F2" }} className="main">
            <RmsHeader />
            <div className="container">
              <div
                className="row"
                style={{
                  padding: "1em 5em 1px 5em "
                }}
              >
                <div className="form-group">
                  <label htmlFor="" className="col-sm-9" />
                  <div className="col-sm-3">
                    <button
                      onClick={this.handlesave}
                      type="submit"
                      className="btn btn-default"
                      aria-label="Right Align"
                      id="drillUp"
                      style={{
                        // display: "none",
                        width: "28%",
                        borderRadius: "0px",
                        // marginBottom: "1em",
                        borderColor: "darkgray",
                        float: "left",
                        outline: "none",
                        color: "white",
                        backgroundColor: "blue"
                      }}
                    >
                      Save
                    </button>
                    <button
                      onClick={this.handlecancel}
                      type="button"
                      className="cancelbutton btn btn-default"
                      aria-label="Right Align"
                      id="drillUp"
                      style={{
                        // display: "none",
                        width: "28%",
                        marginLeft: "1em",

                        borderRadius: "0px",
                        borderColor: "blue",
                        float: "left",
                        outline: "none",
                        color: "blue",
                        backgroundColor: "white"
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
              <div
                className="row"
                style={{
                  maxHeight: "90vh",
                  overflow: "scroll",
                  padding: "0 3em"
                }}
              >
                <div className="col-md-1" />
                <div className="col-md-4">
                  <div className="rmseditbody">
                    <FormLeft
                      rmsvalues={this.state.rmsvalues}
                      handleInputChange={this.handleInputChange}
                      rmsvendoridlist={this.rmsvendoridlist}
                      rmsvendoridlistnameselected={
                        this.state.rmsvendoridlistnameselected
                      }
                    />
                  </div>
                </div>
                <div className="col-md-1" />
                <div className="col-md-4">
                  <div className="rmseditbody">
                    <FormRight
                      rmsvalues={this.state.rmsvalues}
                      handleInputChange={this.handleInputChange}
                      rmsvendorimeicheck={this.state.rmsvendorimeicheck}
                    />
                  </div>
                </div>
                <div className="col-md-2" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Rmsedit;
