import React, { Component } from "react";
import Header from "./Header.js";
import Sidebar from "./Sidebar.js";
import { Link } from "react-router-dom";
import { MyMapComponent } from "./rmseditmap.js";
import axios from "axios";
import config from "./config.js";
import Swal from "sweetalert2";
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
class FormLeft extends Component {
  render() {
    return (
      <form className="form-horizontal">
        {this.props.rmsvalues.imei !== undefined && (
          <div className="form-group">
            <label htmlFor="inputimei" className="col-sm-6 farmerinforowtitle ">
              Imei
            </label>
            <div className="col-sm-6">
              <input
                name="imei"
                type="text"
                className="form-control"
                id="inputimei"
                value={this.props.rmsvalues.imei}
                onChange={this.props.handleInputChange}
                placeholder="Imei"
              />
            </div>
          </div>
        )}
        {this.props.rmsvalues.installationDate !== undefined && (
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
                data-date-format="DD-MM-YYYY"
                className="form-control"
                id="inputinstallationDate"
                value={this.props.rmsvalues.installationDate}
                onChange={this.props.handleInputChange}
                placeholder="Installation Date"
              />
            </div>
          </div>
        )}
        {this.props.rmsvalues.registrationSource !== undefined && (
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
                className="form-control"
                id="inputregsource"
                value={this.props.rmsvalues.registrationSource}
                onChange={this.props.handleInputChange}
                placeholder="Regstration Source"
              />
            </div>
          </div>
        )}

        {this.props.rmsvalues.deviceId !== undefined && (
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
                value={this.props.rmsvalues.deviceId}
                onChange={this.props.handleInputChange}
                placeholder="Device Id"
              />
            </div>
          </div>
        )}
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
                value={this.props.rmsvalues.projectCode}
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
                value={this.props.rmsvalues.vfdMake}
                onChange={this.props.handleInputChange}
                placeholder="VFD Make"
              />
            </div>
          </div>
        )}
        {this.props.rmsvalues.vfdSno !== undefined && (
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
                value={this.props.rmsvalues.vfdSno}
                onChange={this.props.handleInputChange}
                placeholder="VFD Sno"
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
              <input
                name="powerType"
                type="text"
                className="form-control"
                id="inputpowerType"
                value={this.props.rmsvalues.powerType}
                onChange={this.props.handleInputChange}
                placeholder="Power Type"
              />
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
              <input
                name="pumpCapability"
                type="text"
                className="form-control"
                id="inputpumpCapability"
                value={this.props.rmsvalues.pumpCapability}
                onChange={this.props.handleInputChange}
                placeholder="Pump Capability"
              />
            </div>
          </div>
        )}
        {this.props.rmsvalues.pumpType !== undefined && (
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
                className="form-control"
                id="inputpumpType"
                value={this.props.rmsvalues.pumpType}
                onChange={this.props.handleInputChange}
                placeholder="Pump Type"
              />
            </div>
          </div>
        )}
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
                value={this.props.rmsvalues.pumpMake}
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
                value={this.props.rmsvalues.pumpSno}
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
                value={this.props.rmsvalues.panelMake}
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
                value={this.props.rmsvalues.panelWP}
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
        {this.props.rmsvalues.rmsAvailability !== undefined && (
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
                className="form-control"
                id="inputrmsAvailability"
                value={this.props.rmsvalues.rmsAvailability}
                onChange={this.props.handleInputChange}
                placeholder="RMS Availability"
              />
            </div>
          </div>
        )}
        {this.props.rmsvalues.rmsVendorId !== undefined && (
          <div className="form-group">
            <label
              htmlFor="inputrmsVendorId"
              className="col-sm-6 farmerinforowtitle"
            >
              RMS Vendor ID
            </label>
            <div className="col-sm-6">
              <input
                name="rmsVendorId"
                type="text"
                className="form-control"
                id="inputrmsVendorId"
                value={this.props.rmsvalues.rmsVendorId}
                onChange={this.props.handleInputChange}
                placeholder="RMS Vendor ID"
              />
            </div>
          </div>
        )}
        {this.props.rmsvalues.farmerId !== undefined && (
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
                className="form-control"
                id="inputfarmerId"
                value={this.props.rmsvalues.farmerId}
                onChange={this.props.handleInputChange}
                placeholder="Farmer ID"
              />
            </div>
          </div>
        )}
        {this.props.rmsvalues.state !== undefined && (
          <div className="form-group">
            <label
              htmlFor="inputinstate"
              className="col-sm-6 farmerinforowtitle"
            >
              State
            </label>
            <div className="col-sm-6">
              <input
                name="state"
                type="text"
                className="form-control"
                id="inputinstate"
                value={this.props.rmsvalues.state}
                onChange={this.props.handleInputChange}
                placeholder="State"
              />
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
              <input
                name="district"
                type="text"
                className="form-control"
                id="inputdistrict"
                value={this.props.rmsvalues.district}
                onChange={this.props.handleInputChange}
                placeholder="District"
              />
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
                value={this.props.rmsvalues.block}
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
                value={this.props.rmsvalues.village}
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
                value={this.props.rmsvalues.habitation}
                onChange={this.props.handleInputChange}
                placeholder="Habitation"
              />
            </div>
          </div>
        )}
        {this.props.rmsvalues.depth !== undefined && (
          <div className="form-group">
            <label htmlFor="inputdepth" className="col-sm-6 farmerinforowtitle">
              Depth
            </label>
            <div className="col-sm-6">
              <input
                name="depth"
                type="text"
                className="form-control"
                id="inputdepth"
                value={this.props.rmsvalues.depth}
                onChange={this.props.handleInputChange}
                placeholder="Depth"
              />
            </div>
          </div>
        )}
        {this.props.rmsvalues.modifiedBy !== undefined && (
          <div className="form-group">
            <label
              htmlFor="inputmodifiedBy"
              className="col-sm-6 farmerinforowtitle"
            >
              Power Type
            </label>
            <div className="col-sm-6">
              <input
                name="modifiedBy"
                type="text"
                className="form-control"
                id="inputmodifiedBy"
                value={this.props.rmsvalues.modifiedBy}
                onChange={this.props.handleInputChange}
                placeholder="Modified By"
              />
            </div>
          </div>
        )}
        {this.props.rmsvalues.application !== undefined && (
          <div className="form-group">
            <label
              htmlFor="inputapplication"
              className="col-sm-6 farmerinforowtitle"
            >
              Application
            </label>
            <div className="col-sm-6">
              <input
                name="application"
                type="text"
                className="form-control"
                id="inputapplication"
                value={this.props.rmsvalues.application}
                onChange={this.props.handleInputChange}
                placeholder="Application"
              />
            </div>
          </div>
        )}
        {this.props.rmsvalues.application !== undefined && (
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
        {this.props.rmsvalues.application !== undefined && (
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
    this.state = { rmsvalues: {} };
  }
  componentDidMount() {
    if (this.props.location.state !== undefined) {
      console.log(this.props.location.state.detail);
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
            this.setState({ rmsvalues: res.data.data });
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
  handlesave = () => {
    console.log("save called", this.state.rmsvalues);
    axios({
      url: config.updatermsedit,
      method: "POST",
      data: this.state.rmsvalues,
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
  handleInputChange = event => {
    console.log(event.target.name);
    let temp = this.state.rmsvalues;
    temp[event.target.name] = event.target.value;
    this.setState({ rmsvalues: temp });
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
                  <label htmlFor="" className="col-sm-10" />
                  <div className="col-sm-2">
                    <button
                      style={{
                        float: "left",
                        marginRight: "2em",
                        border: "1px solid #ccc",
                        background: "white",
                        color: "blue"
                      }}
                      onClick={this.handlecancel}
                      type="button"
                      className="btn btn-default"
                      aria-label="Left Align"
                    >
                      <span
                        className="glyphicon glyphicon-remove"
                        style={{ marginRight: "6px" }}
                        aria-hidden="true"
                      />
                      Cancel
                    </button>
                    <button
                      style={{
                        float: "right",
                        border: "1px solid #ccc",
                        background: "blue",
                        color: "white"
                      }}
                      onClick={this.handlesave}
                      type="button"
                      className="btn btn-default"
                      aria-label="Left Align"
                    >
                      <span
                        className="glyphicon glyphicon-upload"
                        style={{ marginRight: "6px" }}
                        aria-hidden="true"
                      />
                      Save
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
                    />
                  </div>
                </div>
                <div className="col-md-1" />
                <div className="col-md-4">
                  <div className="rmseditbody">
                    <FormRight
                      rmsvalues={this.state.rmsvalues}
                      handleInputChange={this.handleInputChange}
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
