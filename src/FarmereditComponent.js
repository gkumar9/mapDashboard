import React, { Component } from "react";
import statedistrict from "./state_json.js";
class Farmeredit extends Component {
  render() {
    return (
      <div
        id="showsidetabeditfarmer"
        style={{
          maxHeight: "90vh",
          overflow: "scroll",
          display: "none"
        }}
        className="farmerinfobody"
      >
        <ul className="nav nav-tabs" role="tablist">
          <li role="presentation" className="active">
            <a
              style={{ color: "rgb(102, 102, 102)" }}
              href="#profile1"
              aria-controls="profile1"
              role="tab"
              data-toggle="tab"
            >
              KYC of farmer
            </a>
          </li>
          <li role="presentation">
            <a
              style={{ color: "rgb(102, 102, 102)" }}
              href="#family1"
              aria-controls="family1"
              role="tab"
              data-toggle="tab"
            >
              {/* {this.props.famerinfo.vertical}  */}
              Family
            </a>
          </li>
          <li role="presentation">
            <a
              style={{ color: "rgb(102, 102, 102)" }}
              href="#vertical1"
              aria-controls="vertical1"
              role="tab"
              data-toggle="tab"
            >
              {/* {this.props.famerinfo.vertical}  */}
              Tech specs
            </a>
          </li>
          <li role="presentation">
            <a
              style={{ color: "rgb(102, 102, 102)" }}
              href="#crop1"
              aria-controls="crop1"
              role="tab"
              data-toggle="tab"
            >
              Crop info
            </a>
          </li>
          <li role="presentation">
            <a
              style={{ color: "rgb(102, 102, 102)" }}
              href="#images1"
              aria-controls="images"
              role="tab"
              data-toggle="tab"
            >
              Multimedia
            </a>
          </li>
          <li role="presentation" style={{ float: "right", padding: "0.2em" }}>
            <button
              onClick={this.props.handleeditfarmersave}
              type="submit"
              className="btn btn-default"
              aria-label="Right Align"
              id="drillUp"
              style={{
                // display: "none",
                width: "40%",
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
              onClick={this.props.handlecancelfarmer}
              type="button"
              className="cancelbutton btn btn-default"
              aria-label="Right Align"
              id="drillUp"
              style={{
                // display: "none",
                // width: "35%",
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
          </li>
          <li />
        </ul>

        <div
          className="tab-content"
          style={{
            padding: "0.5em",
            maxHeight: "80vh",
            overflow: "scroll"
          }}
        >
          <div role="tabpanel" className="tab-pane active" id="profile1">
            <div className="row kycbody">
              <div style={{ paddingLeft: "1em" }}>
                <h3>Primary</h3>
              </div>
              <div className="col-md-5">
                <div className="kycbody">
                  <div className="row farmerinforow">
                    <div className="col-xs-6 farmerinforowtitle">
                      <span>Name</span>
                    </div>
                    <div className="col-xs-6">
                      <input
                        name="name"
                        type="text"
                        className="form-control"
                        id="name"
                        value={this.props.famerinfo.name || ""}
                        onChange={this.props.handleInputChange}
                        placeholder="Name"
                      />
                    </div>
                  </div>
                  <div className="row farmerinforow">
                    <div className="col-xs-6 farmerinforowtitle">
                      Contact No
                    </div>
                    <div className="col-xs-6">
                      <input
                        name="contactNo"
                        type="number"
                        className="form-control"
                        id="contactno"
                        value={this.props.famerinfo.contactNo || ""}
                        onChange={this.props.handleInputChange}
                        placeholder="Contact Number "
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-1" />
              <div className="col-md-5">
                <div className="kycbody">
                  <div className="row farmerinforow">
                    <div className="col-xs-6 farmerinforowtitle">
                      <span>UID Type</span>
                    </div>
                    <div className="col-xs-6">
                      <div>
                        <select
                          name="uidType"
                          onChange={this.props.handleInputChange}
                          value={this.props.famerinfo.uidType}
                          className="form-control"
                          id="sel2"
                        >
                          <option value="AADHAAR">AADHAAR</option>
                          <option value="VOTER ID">VOTER ID</option>
                          <option value="LICENSE">LICENSE</option>
                          <option value="PAYGO">PAYGO</option>
                          <option value="CLARO ID">CLARO ID</option>
                          <option value="SYSTEM_GENERATED">
                            SYSTEM_GENERATED
                          </option>
                          <option value="OTHERS">OTHERS</option>
                          <option value="NA">NA</option>
                        </select>
                      </div>
                      {/* <input
                      name="uidType"
                      type="text"
                      className="form-control"
                      id="uidType"
                      value={this.props.famerinfo.uidType}
                      onChange={this.props.handleInputChange}
                      placeholder="UID Type"
                    /> */}
                    </div>
                  </div>
                  <div className="row farmerinforow">
                    <div className="col-xs-6 farmerinforowtitle">
                      <span>UID</span>
                    </div>
                    <div className="col-xs-6">
                      <input
                        name="uid"
                        type="text"
                        className="form-control"
                        id="uid"
                        value={this.props.famerinfo.uid || ""}
                        onChange={this.props.handleInputChange}
                        placeholder="UID "
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row kycbody">
              <div className="col-md-5">
                <div className="kycheading">
                  <h3>Personal</h3>
                </div>
                <div className="kycbody">
                  <div className="row farmerinforow">
                    <div className="col-xs-6 farmerinforowtitle">
                      <span>Father Name</span>
                    </div>
                    <div className="col-xs-6">
                      <input
                        name="fatherName"
                        type="text"
                        className="form-control"
                        id="fathername"
                        value={this.props.famerinfo.fatherName || ""}
                        onChange={this.props.handleInputChange}
                        placeholder="Father Name"
                      />
                    </div>
                  </div>
                  <div className="row farmerinforow">
                    <div className="col-xs-6 farmerinforowtitle">
                      Contact No
                    </div>
                    <div className="col-xs-6">
                      <input
                        name="contactNo"
                        type="number"
                        className="form-control"
                        id="contactno"
                        value={this.props.famerinfo.contactNo || ""}
                        onChange={this.props.handleInputChange}
                        placeholder="Contact Number "
                      />
                    </div>
                  </div>
                  <div className="row farmerinforow">
                    <div className="col-xs-6 farmerinforowtitle">
                      Alternate Number
                    </div>
                    <div className="col-xs-6">
                      <input
                        name="alternateNumber"
                        type="text"
                        className="form-control"
                        id="alternateNumber"
                        value={this.props.famerinfo.alternateNumber || ""}
                        onChange={this.props.handleInputChange}
                        placeholder="Alternate Number"
                      />
                    </div>
                  </div>
                  <div className="row farmerinforow">
                    <div className="col-xs-6 farmerinforowtitle">Gender</div>
                    <div className="col-xs-6">
                      <div>
                        <select
                          name="gender"
                          onChange={this.props.handleInputChange}
                          value={this.props.famerinfo.gender || "NA"}
                          className="form-control"
                          id="sel1"
                        >
                          <option value="M">M</option>
                          <option value="F">F</option>
                          <option value="NA">NA</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="row farmerinforow">
                    <div className="col-xs-6 farmerinforowtitle">DOB</div>
                    <div className="col-xs-6">
                      <input
                        name="dob"
                        type="date"
                        className="form-control"
                        id="dob"
                        value={this.props.famerinfo.dob || ""}
                        onChange={this.props.handleInputChange}
                        placeholder="DOB(dd/mm/yyyy)"
                      />
                    </div>
                  </div>
                  <div className="row farmerinforow">
                    <div className="col-xs-6 farmerinforowtitle">
                      Govt Card Holder
                    </div>
                    <div className="col-xs-6">
                      <input
                        name="govtCardHolder"
                        type="text"
                        className="form-control"
                        id="govtCardHolder"
                        value={this.props.famerinfo.govtCardHolder || ""}
                        onChange={this.props.handleInputChange}
                        placeholder="Govt. Card Holder (Y/N)"
                      />
                    </div>
                  </div>
                  <div className="row farmerinforow">
                    <div className="col-xs-6 farmerinforowtitle">BPL Card</div>
                    <div className="col-xs-6">
                      <input
                        name="bplCard"
                        type="text"
                        className="form-control"
                        id="bplCard"
                        value={this.props.famerinfo.bplCard || ""}
                        onChange={this.props.handleInputChange}
                        placeholder="BPL Card Holder"
                      />
                    </div>
                  </div>
                  <div className="row farmerinforow">
                    <div className="col-xs-6 farmerinforowtitle">
                      House Type
                    </div>
                    <div className="col-xs-6">
                      <input
                        name="houseType"
                        type="text"
                        className="form-control"
                        id="houseType"
                        value={this.props.famerinfo.houseType || ""}
                        onChange={this.props.handleInputChange}
                        placeholder="House Type"
                      />
                    </div>
                  </div>
                  <div className="row farmerinforow">
                    <div className="col-xs-6 farmerinforowtitle">
                      Total Land Size
                    </div>
                    <div className="col-xs-6">
                      <input
                        name="totalLandSize"
                        type="number"
                        className="form-control"
                        id="totalLandSize"
                        value={this.props.famerinfo.totalLandSize || ""}
                        onChange={this.props.handleInputChange}
                        placeholder="Land Size in Sq. Ft."
                      />
                    </div>
                  </div>
                  <div className="row farmerinforow">
                    <div className="col-xs-6 farmerinforowtitle">
                      Income from Land
                    </div>
                    <div className="col-xs-6">
                      <input
                        name="incomeFromLand"
                        type="number"
                        className="form-control"
                        id="incomeFromLand"
                        value={this.props.famerinfo.incomeFromLand || ""}
                        onChange={this.props.handleInputChange}
                        placeholder="Income From Land in rupee"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-1" />
              <div className="col-md-5">
                <div className="kycheading">
                  <h3>Location</h3>
                </div>
                <div className="kycbody">
                  <div className="row farmerinforow">
                    <div className="col-xs-6 farmerinforowtitle">State</div>
                    <div className="col-xs-6">
                      <select
                        name="state"
                        onChange={this.props.handleInputChange}
                        value={this.props.famerinfo.state || "NA"}
                        className="form-control"
                        id="state"
                      >
                        {Object.keys(statedistrict).map(item => (
                          <option key={item} value={item}>
                            {item}
                          </option>
                        ))}
                        <option value="NA">NA</option>
                      </select>
                    </div>
                  </div>
                  <div className="row farmerinforow">
                    <div className="col-xs-6 farmerinforowtitle">District</div>
                    <div className="col-xs-6">
                      {this.props.famerinfo.state !== null &&
                        this.props.famerinfo.state !== undefined && (
                          <select
                            name="district"
                            onChange={this.props.handleInputChange}
                            value={this.props.famerinfo.district || "NA"}
                            className="form-control"
                            id="district"
                          >
                            {statedistrict[this.props.famerinfo.state].map(
                              item => (
                                <option key={item} value={item}>
                                  {item}
                                </option>
                              )
                            )}
                            <option value="NA">NA</option>
                          </select>
                        )}
                    </div>
                  </div>
                  <div className="row farmerinforow">
                    <div className="col-xs-6 farmerinforowtitle">Block</div>
                    <div className="col-xs-6">
                      <input
                        name="block"
                        type="text"
                        className="form-control"
                        id="block"
                        value={this.props.famerinfo.block || ""}
                        onChange={this.props.handleInputChange}
                        placeholder="Block"
                      />
                    </div>
                  </div>
                  <div className="row farmerinforow">
                    <div className="col-xs-6 farmerinforowtitle">Community</div>
                    <div className="col-xs-6">
                      <input
                        name="community"
                        type="text"
                        className="form-control"
                        id="community"
                        value={this.props.famerinfo.community || ""}
                        onChange={this.props.handleInputChange}
                        placeholder="Community"
                      />
                    </div>
                  </div>
                  <div className="row farmerinforow">
                    <div className="col-xs-6 farmerinforowtitle">
                      Sub-community
                    </div>
                    <div className="col-xs-6">
                      <input
                        name="subCommunity"
                        type="text"
                        className="form-control"
                        id="subCommunity"
                        value={this.props.famerinfo.subCommunity || ""}
                        onChange={this.props.handleInputChange}
                        placeholder="Sub Community"
                      />
                    </div>
                  </div>
                  <div className="row farmerinforow">
                    <div className="col-xs-6 farmerinforowtitle">Village</div>
                    <div className="col-xs-6">
                      <input
                        name="village"
                        type="text"
                        className="form-control"
                        id="village"
                        value={this.props.famerinfo.village || ""}
                        onChange={this.props.handleInputChange}
                        placeholder="Village"
                      />
                    </div>
                  </div>
                  <div className="row farmerinforow">
                    <div className="col-xs-6 farmerinforowtitle">Pincode</div>
                    <div className="col-xs-6">
                      <input
                        name="pincode"
                        type="number"
                        className="form-control"
                        id="pincode"
                        value={this.props.famerinfo.pincode || ""}
                        onChange={this.props.handleInputChange}
                        placeholder="Pincode"
                      />
                    </div>
                  </div>
                  <div className="row farmerinforow">
                    <div className="col-xs-6 farmerinforowtitle">Latitude</div>
                    <div className="col-xs-6">
                      <input
                        name="latitude"
                        max="8"
                        min="36"
                        type="number"
                        className="form-control"
                        id="latitude"
                        value={this.props.famerinfo.latitude || ""}
                        onChange={this.props.handleInputChange}
                        placeholder="Latitude"
                        required
                      />
                    </div>
                  </div>
                  <div className="row farmerinforow">
                    <div className="col-xs-6 farmerinforowtitle">Longitude</div>
                    <div className="col-xs-6">
                      <input
                        name="longitude"
                        type="number"
                        className="form-control"
                        id="longitude"
                        value={this.props.famerinfo.longitude || ""}
                        onChange={this.props.handleInputChange}
                        placeholder="Longitude"
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div role="tabpanel" className="vertical tab-pane" id="vertical1">
            {this.props.famerinfo !== undefined &&
            this.props.famerinfo.pumplist !== undefined &&
            this.props.famerinfo.pumplist.length !== 0 ? (
              <div>
                <ul class=" nav nav-tabs" role="tablist">
                  {this.props.famerinfo.pumplist !== undefined &&
                    this.props.famerinfo.pumplist.map((item, index) =>
                      index === 0 ? (
                        <li role="presentation" className="active">
                          <a
                            href={`#` + item.deviceId}
                            aria-controls={item.deviceId}
                            role="tab"
                            data-toggle="tab"
                          >
                            Device {index + 1}
                          </a>
                        </li>
                      ) : (
                        <li role="presentation">
                          <a
                            href={`#` + item.deviceId}
                            aria-controls={item.deviceId}
                            role="tab"
                            data-toggle="tab"
                          >
                            Device {index + 1}
                          </a>
                        </li>
                      )
                    )}
                </ul>
                <div class="tab-content">
                  {this.props.famerinfo.pumplist !== undefined &&
                    this.props.famerinfo.pumplist.map((item, index) => (
                      <div
                        role="tabpanel"
                        class="tab-pane active"
                        id={item.deviceId}
                      >
                        <div className="col-md-5">
                          <div className="kycbody">
                            <div className="row farmerinforow">
                              <div className="col-xs-6 farmerinforowtitle">
                                Installation date
                              </div>
                              <div className="col-xs-6">
                                <input
                                  name="installationDate"
                                  type="date"
                                  data-date-format="DD-MM-YYYY"
                                  className="form-control"
                                  id="pumplist.installationDate"
                                  value={item.installationDate || ""}
                                  onChange={this.props.pumphandleInputChange.bind(
                                    this,
                                    index
                                  )}
                                  placeholder="Installation date"
                                />
                              </div>
                            </div>
                            <div className="row farmerinforow">
                              <div className="col-xs-6 farmerinforowtitle">
                                Project code
                              </div>
                              <div className="col-xs-6">
                                <input
                                  name="projectCode"
                                  type="text"
                                  className="form-control"
                                  id="projectCode"
                                  value={item.projectCode || ""}
                                  onChange={this.props.pumphandleInputChange.bind(
                                    this,
                                    index
                                  )}
                                  placeholder="Project code"
                                />
                              </div>
                            </div>
                            <div className="row farmerinforow">
                              <div className="col-xs-6 farmerinforowtitle">
                                Habitation
                              </div>
                              {/* <div className="col-xs-6">
                                {item.habitation || "NA"}
                              </div> */}
                              <div className="col-xs-6">
                                <input
                                  name="habitation"
                                  type="text"
                                  className="form-control"
                                  id="habitation"
                                  value={item.habitation || ""}
                                  onChange={this.props.pumphandleInputChange.bind(
                                    this,
                                    index
                                  )}
                                  placeholder="Habitation"
                                />
                              </div>
                            </div>
                            <div className="row farmerinforow">
                              <div className="col-xs-6 farmerinforowtitle">
                                Application
                              </div>
                              {/* <div className="col-xs-6">
                                {item.application || "NA"}
                              </div> */}
                              <div className="col-xs-6">
                                <input
                                  name="application"
                                  type="text"
                                  className="form-control"
                                  id="application"
                                  value={item.application || ""}
                                  onChange={this.props.pumphandleInputChange.bind(
                                    this,
                                    index
                                  )}
                                  placeholder="Application"
                                />
                              </div>
                            </div>
                            <div className="row farmerinforow">
                              <div className="col-xs-6 farmerinforowtitle">
                                VFD make
                              </div>
                              {/* <div className="col-xs-6">
                                {item.vfdMake || "NA"}
                              </div> */}
                              <div className="col-xs-6">
                                <input
                                  name="vfdMake"
                                  type="text"
                                  className="form-control"
                                  id="vfdMake"
                                  value={item.vfdMake || ""}
                                  onChange={this.props.pumphandleInputChange.bind(
                                    this,
                                    index
                                  )}
                                  placeholder="VFD Make"
                                />
                              </div>
                            </div>
                            <div className="row farmerinforow">
                              <div className="col-xs-6 farmerinforowtitle">
                                VFD sno
                              </div>
                              {/* <div className="col-xs-6">
                                {item.vfdSno || "NA"}
                              </div> */}
                              <div className="col-xs-6">
                                <input
                                  name="vfdSno"
                                  type="text"
                                  className="form-control"
                                  id="vfdSno"
                                  value={item.vfdSno || ""}
                                  onChange={this.props.pumphandleInputChange.bind(
                                    this,
                                    index
                                  )}
                                  placeholder="VFD Sno"
                                />
                              </div>
                            </div>
                            <div className="row farmerinforow">
                              <div className="col-xs-6 farmerinforowtitle">
                                VFD vendor id
                              </div>
                              {/* <div className="col-xs-6">
                                {item.vfdVendorId || "NA"}
                              </div> */}
                              <div className="col-xs-6">
                                <input
                                  name="vfdVendorId"
                                  type="text"
                                  className="form-control"
                                  id="vfdVendorId"
                                  value={item.vfdVendorId || ""}
                                  onChange={this.props.pumphandleInputChange.bind(
                                    this,
                                    index
                                  )}
                                  placeholder="VFD Vendor Id"
                                />
                              </div>
                            </div>
                            <div className="row farmerinforow">
                              <div className="col-xs-6 farmerinforowtitle">
                                IMEI
                              </div>
                              {/* <div className="col-xs-6">
                                {item.imei || "NA"}
                              </div> */}
                              <div className="col-xs-6">
                                <input
                                  name="imei"
                                  type="text"
                                  className="form-control"
                                  id="imei"
                                  value={item.imei || ""}
                                  onChange={this.props.pumphandleInputChange.bind(
                                    this,
                                    index
                                  )}
                                  placeholder="IMEI"
                                />
                              </div>
                            </div>
                            <div className="row farmerinforow">
                              <div className="col-xs-6 farmerinforowtitle">
                                Depth
                              </div>
                              {/* <div className="col-xs-6">
                                {item.depth || "NA"}
                              </div> */}
                              <div className="col-xs-6">
                                <input
                                  name="depth"
                                  type="text"
                                  className="form-control"
                                  id="depth"
                                  value={item.depth || ""}
                                  onChange={this.props.pumphandleInputChange.bind(
                                    this,
                                    index
                                  )}
                                  placeholder="Depth"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-1" />
                        <div className="col-md-5">
                          <div className="kycbody">
                            <div className="row farmerinforow">
                              <div className="col-xs-6 farmerinforowtitle">
                                Device id
                              </div>
                              {/* <div className="col-xs-6">
                                {item.deviceId || "NA"}
                              </div> */}
                              <div className="col-xs-6">
                                <input
                                  name="deviceId"
                                  type="text"
                                  className="form-control"
                                  id="deviceId"
                                  value={item.deviceId || ""}
                                  onChange={this.props.pumphandleInputChange.bind(
                                    this,
                                    index
                                  )}
                                  placeholder="Device Id"
                                />
                              </div>
                            </div>
                            <div className="row farmerinforow">
                              <div className="col-xs-6 farmerinforowtitle">
                                Panel make
                              </div>
                              {/* <div className="col-xs-6">
                                {item.panelMake || "NA"}
                              </div> */}
                              <div className="col-xs-6">
                                <input
                                  name="panelMake"
                                  type="text"
                                  className="form-control"
                                  id="panelMake"
                                  value={item.panelMake || ""}
                                  onChange={this.props.pumphandleInputChange.bind(
                                    this,
                                    index
                                  )}
                                  placeholder="Device Id"
                                />
                              </div>
                            </div>
                            <div className="row farmerinforow">
                              <div className="col-xs-6 farmerinforowtitle">
                                Panel WP
                              </div>
                              {/* <div className="col-xs-6">
                                {item.panelWp || "NA"}
                              </div> */}
                              <div className="col-xs-6">
                                <input
                                  name="panelWp"
                                  type="text"
                                  className="form-control"
                                  id="panelWp"
                                  value={item.panelWp || ""}
                                  onChange={this.props.pumphandleInputChange.bind(
                                    this,
                                    index
                                  )}
                                  placeholder="Panel Wp"
                                />
                              </div>
                            </div>
                            <div className="row farmerinforow">
                              <div className="col-xs-6 farmerinforowtitle">
                                Pump make
                              </div>
                              {/* <div className="col-xs-6">
                                {item.pumpMake || "NA"}
                              </div> */}
                              <div className="col-xs-6">
                                <input
                                  name="pumpMake"
                                  type="text"
                                  className="form-control"
                                  id="pumpMake"
                                  value={item.pumpMake || ""}
                                  onChange={this.props.pumphandleInputChange.bind(
                                    this,
                                    index
                                  )}
                                  placeholder="Pump Make"
                                />
                              </div>
                            </div>
                            <div className="row farmerinforow">
                              <div className="col-xs-6 farmerinforowtitle">
                                Pump sno
                              </div>
                              {/* <div className="col-xs-6">
                                {item.pumpSno || "NA"}
                              </div> */}
                              <div className="col-xs-6">
                                <input
                                  name="pumpSno"
                                  type="text"
                                  className="form-control"
                                  id="pumpSno"
                                  value={item.pumpSno || ""}
                                  onChange={this.props.pumphandleInputChange.bind(
                                    this,
                                    index
                                  )}
                                  placeholder="Pump Sno"
                                />
                              </div>
                            </div>
                            <div className="row farmerinforow">
                              <div className="col-xs-6 farmerinforowtitle">
                                Pump type
                              </div>
                              {/* <div className="col-xs-6">
                                {item.pumpType || "NA"}
                              </div> */}
                              <div className="col-xs-6">
                                <input
                                  name="pumpType"
                                  type="text"
                                  className="form-control"
                                  id="pumpType"
                                  value={item.pumpType || ""}
                                  onChange={this.props.pumphandleInputChange.bind(
                                    this,
                                    index
                                  )}
                                  placeholder="Pump Type"
                                />
                              </div>
                            </div>
                            <div className="row farmerinforow">
                              <div className="col-xs-6 farmerinforowtitle">
                                Pump capability
                              </div>
                              {/* <div className="col-xs-6">
                                {item.pumpCapability || "NA"}
                              </div> */}
                              <div className="col-xs-6">
                                <input
                                  name="pumpCapability"
                                  type="text"
                                  className="form-control"
                                  id="pumpCapability"
                                  value={item.pumpCapability || ""}
                                  onChange={this.props.pumphandleInputChange.bind(
                                    this,
                                    index
                                  )}
                                  placeholder="Pump Capability"
                                />
                              </div>
                            </div>
                            <div className="row farmerinforow">
                              <div className="col-xs-6 farmerinforowtitle">
                                Power type
                              </div>
                              {/* <div className="col-xs-6">
                                {item.powerType || "NA"}
                              </div> */}
                              <div className="col-xs-6">
                                <input
                                  name="powerType"
                                  type="text"
                                  className="form-control"
                                  id="powerType"
                                  value={item.powerType || ""}
                                  onChange={this.props.pumphandleInputChange.bind(
                                    this,
                                    index
                                  )}
                                  placeholder="Power Type"
                                />
                              </div>
                            </div>
                            <div className="row farmerinforow">
                              <div className="col-xs-6 farmerinforowtitle">
                                Registration source
                              </div>
                              {/* <div className="col-xs-6">
                                {item.registrationSource || "NA"}
                              </div> */}
                              <div className="col-xs-6">
                                <input
                                  name="registrationSource"
                                  type="text"
                                  className="form-control"
                                  id="registrationSource"
                                  value={item.registrationSource || ""}
                                  onChange={this.props.pumphandleInputChange.bind(
                                    this,
                                    index
                                  )}
                                  placeholder="Registration Source"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            ) : (
              <center style={{ marginTop: "2em" }}>
                <h4>No data found !!!</h4>
              </center>
            )}
          </div>
          <div role="tabpanel" className="tab-pane" id="family1">
            <div className="col-md-5">
              <div className="kycbody">
                <div className="row farmerinforow">
                  <div className="col-xs-6 farmerinforowtitle">
                    No of dependants
                  </div>
                  <div className="col-xs-6">
                    <input
                      name="numberOfDependents"
                      type="number"
                      className="form-control"
                      id="numberOfDependents"
                      value={this.props.famerinfo.numberOfDependents || ""}
                      onChange={this.props.handleInputChange}
                      placeholder="Number Of Dependents"
                    />
                  </div>
                </div>
                <div className="row farmerinforow">
                  <div className="col-xs-6 farmerinforowtitle">
                    No of siblings
                  </div>

                  <div className="col-xs-6">
                    <input
                      name="numberOfSiblings"
                      type="number"
                      className="form-control"
                      id="numberOfSiblings"
                      value={this.props.famerinfo.numberOfSiblings || ""}
                      onChange={this.props.handleInputChange}
                      placeholder="Number Of Siblings"
                    />
                  </div>
                </div>
                <div className="row farmerinforow">
                  <div className="col-xs-6 farmerinforowtitle">
                    Profession of father
                  </div>

                  <div className="col-xs-6">
                    <input
                      name="fathersProfession"
                      type="text"
                      className="form-control"
                      id="fathersProfession"
                      value={this.props.famerinfo.fathersProfession || ""}
                      onChange={this.props.handleInputChange}
                      placeholder="Profession of father"
                    />
                  </div>
                </div>
                <div className="row farmerinforow">
                  <div className="col-xs-6 farmerinforowtitle">
                    Education level of farmer
                  </div>

                  <div className="col-xs-6">
                    <input
                      name="highestEducation"
                      type="text"
                      className="form-control"
                      id="highestEducation"
                      value={this.props.famerinfo.highestEducation || ""}
                      onChange={this.props.handleInputChange}
                      placeholder="Education level of farmer"
                    />
                  </div>
                </div>
                <div className="row farmerinforow">
                  <div className="col-xs-6 farmerinforowtitle">
                    Age when started farming
                  </div>

                  <div className="col-xs-6">
                    <input
                      name="farmingStartedAt"
                      type="number"
                      className="form-control"
                      id="farmingStartedAt"
                      value={this.props.famerinfo.farmingStartedAt || ""}
                      onChange={this.props.handleInputChange}
                      placeholder="Age when started farming"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div role="tabpanel" className="vertical tab-pane" id="crop1">
            {this.props.famerinfo !== undefined &&
            this.props.famerinfo.croplist !== undefined &&
            this.props.famerinfo.croplist.length !== 0 ? (
              <div>
                <ul class=" nav nav-tabs" role="tablist">
                  {this.props.famerinfo.croplist !== undefined &&
                    this.props.famerinfo.croplist.map((item, index) =>
                      index === 0 ? (
                        <li role="presentation" className="active">
                          <a
                            href={`#` + item.creationTime}
                            aria-controls={item.deviceId}
                            role="tab"
                            data-toggle="tab"
                          >
                            Crop {index + 1}
                          </a>
                        </li>
                      ) : (
                        <li role="presentation">
                          <a
                            href={`#` + item.creationTime}
                            aria-controls={item.deviceId}
                            role="tab"
                            data-toggle="tab"
                          >
                            Crop {index + 1}
                          </a>
                        </li>
                      )
                    )}
                </ul>
                <div class="tab-content">
                  {this.props.famerinfo.croplist !== undefined &&
                    this.props.famerinfo.croplist.map((item, index) => (
                      <div
                        role="tabpanel"
                        class="vertical tab-pane active"
                        id={item.creationTime}
                      >
                        <div className="col-md-5">
                          <div className="kycbody">
                            <div className="row farmerinforow">
                              <div className="col-xs-6 farmerinforowtitle">
                                Name
                              </div>
                              {/* <div className="col-xs-6">
                                      {item.name || "NA"}
                                    </div> */}
                              <div className="col-xs-6">
                                <input
                                  name="name"
                                  type="text"
                                  className="form-control"
                                  id="name"
                                  value={item.name || ""}
                                  onChange={this.props.crophandleInputChange.bind(
                                    this,
                                    index
                                  )}
                                  placeholder="Crop Name"
                                />
                              </div>
                            </div>
                            <div className="row farmerinforow">
                              <div className="col-xs-6 farmerinforowtitle">
                                Crop season
                              </div>
                              {/* <div className="col-xs-6">
                                      {item.cropSeason || "NA"}
                                    </div> */}
                              <div className="col-xs-6">
                                <input
                                  name="cropSeason"
                                  type="text"
                                  className="form-control"
                                  id="cropSeason"
                                  value={item.cropSeason || ""}
                                  onChange={this.props.crophandleInputChange.bind(
                                    this,
                                    index
                                  )}
                                  placeholder="Crop Season"
                                />
                              </div>
                            </div>
                            <div className="row farmerinforow">
                              <div className="col-xs-6 farmerinforowtitle">
                                Crop variety
                              </div>
                              {/* <div className="col-xs-6">
                                      {item.cropVariety || "NA"}
                                    </div> */}
                              <div className="col-xs-6">
                                <input
                                  name="cropVariety"
                                  type="text"
                                  className="form-control"
                                  id="cropVariety"
                                  value={item.cropVariety || ""}
                                  onChange={this.props.crophandleInputChange.bind(
                                    this,
                                    index
                                  )}
                                  placeholder="Crop Variety"
                                />
                              </div>
                            </div>
                            <div className="row farmerinforow">
                              <div className="col-xs-6 farmerinforowtitle">
                                Sowing month
                              </div>
                              {/* <div className="col-xs-6">
                                      {item.sowingMonth || "NA"}
                                    </div> */}
                              <div className="col-xs-6">
                                <input
                                  name="sowingMonth"
                                  type="text"
                                  className="form-control"
                                  id="sowingMonth"
                                  value={item.sowingMonth || ""}
                                  onChange={this.props.crophandleInputChange.bind(
                                    this,
                                    index
                                  )}
                                  placeholder="sowing Month"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-1" />
                        <div className="col-md-5">
                          <div className="kycbody">
                            <div className="row farmerinforow">
                              <div className="col-xs-6 farmerinforowtitle">
                                Harvesting time
                              </div>
                              {/* <div className="col-xs-6">
                                      {item.harvestingTime || "NA"}
                                    </div> */}
                              <div className="col-xs-6">
                                <input
                                  name="harvestingTime"
                                  type="text"
                                  className="form-control"
                                  id="harvestingTime"
                                  value={item.harvestingTime || ""}
                                  onChange={this.props.crophandleInputChange.bind(
                                    this,
                                    index
                                  )}
                                  placeholder="Harvesting Time"
                                />
                              </div>
                            </div>
                            <div className="row farmerinforow">
                              <div className="col-xs-6 farmerinforowtitle">
                                Estimated Yield
                              </div>
                              {/* <div className="col-xs-6">
                                      {item.estimateYield || "NA"}
                                    </div> */}
                              <div className="col-xs-6">
                                <input
                                  name="estimateYield"
                                  type="text"
                                  className="form-control"
                                  id="estimateYield"
                                  value={item.estimateYield || ""}
                                  onChange={this.props.crophandleInputChange.bind(
                                    this,
                                    index
                                  )}
                                  placeholder="Estimate Yield"
                                />
                              </div>
                            </div>
                            <div className="row farmerinforow">
                              <div className="col-xs-6 farmerinforowtitle">
                                Grown area
                              </div>
                              {/* <div className="col-xs-6">
                                      {item.grownArea || "NA"}
                                    </div> */}
                              <div className="col-xs-6">
                                <input
                                  name="grownArea"
                                  type="text"
                                  className="form-control"
                                  id="grownArea"
                                  value={item.grownArea || ""}
                                  onChange={this.props.crophandleInputChange.bind(
                                    this,
                                    index
                                  )}
                                  placeholder="Grown Area"
                                />
                              </div>
                            </div>
                            <div className="row farmerinforow">
                              <div className="col-xs-6 farmerinforowtitle">
                                Remark
                              </div>
                              {/* <div className="col-xs-6">
                                      {item.remarks || "NA"}
                                    </div> */}
                              <div className="col-xs-6">
                                <input
                                  name="remarks"
                                  type="textarea"
                                  className="form-control"
                                  id="remarks"
                                  value={item.remarks || ""}
                                  onChange={this.props.crophandleInputChange.bind(
                                    this,
                                    index
                                  )}
                                  placeholder="remarks"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            ) : (
              <center style={{ marginTop: "2em" }}>
                <h4>No data found !!!</h4>
              </center>
            )}
          </div>
          <div role="tabpanel" className="tab-pane" id="images1" >
          {this.props.famerinfo !== undefined &&
                  this.props.famerinfo.imglist !== undefined &&
                  this.props.famerinfo.imglist.length !== 0 ? (
                    <div style={{ padding: "1em" }}>
                      <div className="row">
                        {this.props.famerinfo.imglist.map((item, number) => (
                          <div className="col-xs-6">
                            <div className="imglistheading">
                              <h3>{item.mediaType}</h3>
                            </div>
                            <div className="imglistbody">
                              <img
                                class="img-rounded"
                                src={item.link}
                                alt={item.mediaType}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <center style={{ marginTop: "2em" }}>
                      <h4>No data found !!!</h4>
                    </center>
                  )}
          </div>
        </div>
      </div>
    );
  }
}
export default Farmeredit;
