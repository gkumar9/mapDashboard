import React, { Component } from "react";
import statedistrict from "./state_json.js";
class Farmeredit extends Component {
  render() {
    return (
      <div
        id="showsidetabeditfarmer"
        style={{
          // maxHeight: "90vh",
          // overflow: "scroll",
          display: "none"
        }}
        className="farmerinfobody"
      >
        <ul className="nav nav-tabs" role="tablist">
          <li role="presentation" className="active">
            <a
              style={{ color: "black" }}
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
              style={{ color: "black" }}
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
              style={{ color: "black" }}
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
              style={{ color: "black" }}
              href="#images1"
              aria-controls="images"
              role="tab"
              data-toggle="tab"
            >
              Multimedia
            </a>
          </li>
        </ul>

        <div
          className="tab-content"
          style={{
            padding: "0.5em",
            maxHeight: "80vh",
            overflowY: "scroll",
            overflowX: "hidden"
          }}
        >
          <div role="tabpanel" className="tab-pane active" id="profile1">
            <div className="row kycbody" style={{ margin: "0.7em 0.1em" }}>
              {/* <div className="row" style={{marginBottom: '0.7em',marginLeft: '0.3em' }}> */}
              <div className="col-xs-9">
                <h3 style={{ marginTop: "5px" }}>Primary</h3>
              </div>
              <div
                className="col-xs-3"
                style={{ display: "flex", justifyContent: "flex-end" }}
              >
                <button
                  onClick={this.props.handleeditfarmersave}
                  type="submit"
                  className="btn btn-default"
                  aria-label="Right Align"
                  id="drillUp"
                  style={{
                    // display: "none",
                    width: "36%",
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
                    width: "36%",
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
            <div className="row kycbody" style={{ margin: "0.7em 0.1em" }}>
              <div className="col-md-5">
                <div className="kycbody">
                  <div className="row farmerinforow">
                    <div className="col-xs-6 farmerinforowtitle">
                      <span>
                        Name{" "}
                        <i
                          title="Mandatory fields"
                          style={{ marginTop: "0.5em", marginLeft: "0.5em" }}
                          className="fa fa-info-circle"
                          aria-hidden="true"
                        />
                      </span>
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
                      Status{" "}
                      <i
                        title="Mandatory fields"
                        style={{ marginTop: "0.5em", marginLeft: "0.5em" }}
                        className="fa fa-info-circle"
                        aria-hidden="true"
                      />
                    </div>
                    <div className="col-xs-6">
                      <div>
                        <select
                          name="entryStatus"
                          onChange={this.props.handleInputChange}
                          value={this.props.famerinfo.entryStatus || "NA"}
                          className="form-control"
                          id="sel3"
                        >
                          <option value="ACTIVE">ACTIVE</option>
                          <option value="INACTIVE">INACTIVE</option>
                          <option value="NA">NA</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="row farmerinforow">
                    <div className="col-xs-6 farmerinforowtitle">
                      Contact No{" "}
                      <i
                        title="Mandatory fields"
                        style={{ marginTop: "0.5em", marginLeft: "0.5em" }}
                        className="fa fa-info-circle"
                        aria-hidden="true"
                      />
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
                      <span>
                        UID Type{" "}
                        <i
                          title="Mandatory fields"
                          style={{ marginTop: "0.5em", marginLeft: "0.5em" }}
                          className="fa fa-info-circle"
                          aria-hidden="true"
                        />
                      </span>
                    </div>
                    <div className="col-xs-6">
                      <div>
                        <select
                          name="uidType"
                          onChange={this.props.handleInputChange}
                          value={this.props.famerinfo.uidType || "NA"}
                          className="form-control"
                          id="sel2"
                        >
                          <option value="AADHAR">AADHAR</option>
                          <option value="VOTER ID">VOTER ID</option>
                          <option value="LICENSE">LICENSE</option>
                          <option value="PAY-GO">PAYGO</option>
                          {/* <option value="CLARO ID">CLARO ID</option> */}
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
                      <span>
                        UID{" "}
                        <i
                          title="Mandatory fields"
                          style={{ marginTop: "0.5em", marginLeft: "0.5em" }}
                          className="fa fa-info-circle"
                          aria-hidden="true"
                        />
                      </span>
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
                  <div className="row farmerinforow">
                    <div className="col-xs-6 farmerinforowtitle">
                      Vertical{" "}
                      <i
                        title="Mandatory fields"
                        style={{ marginTop: "0.5em", marginLeft: "0.5em" }}
                        className="fa fa-info-circle"
                        aria-hidden="true"
                      />
                    </div>
                    <div className="col-xs-6">
                      <select
                        name="vertical"
                        onChange={this.props.handleInputChange}
                        value={this.props.famerinfo.vertical || "N.A"}
                        className="form-control"
                        id="vertical"
                      >
                        <option value="Solar Irrigation Pump">
                          Solar Irrigation Pump
                        </option>
                        <option value="Solar Drinking Water Pump">
                          Solar Drinking Water Pump
                        </option>
                        <option value="Solar Mini Grid">Solar Mini Grid</option>
                        <option value="Solar Irrigation Service">
                          Solar Irrigation Service
                        </option>
                        <option value="N.A">N.A</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* </div> */}
            <div className="row kycbody" style={{ margin: "0.7em 0.1em" }}>
              <div className="col-md-5">
                <div className="kycheading">
                  <h3>Personal</h3>
                </div>
                <div className="kycbody">
                  <div className="row farmerinforow">
                    <div className="col-xs-6 farmerinforowtitle">
                      Gender{" "}
                      <i
                        title="Mandatory fields"
                        style={{ marginTop: "0.5em", marginLeft: "0.5em" }}
                        className="fa fa-info-circle"
                        aria-hidden="true"
                      />
                    </div>
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
                      Alternate Number
                    </div>
                    <div className="col-xs-6">
                      <input
                        name="alternateNumber"
                        type="number"
                        className="form-control"
                        id="alternateNumber"
                        value={this.props.famerinfo.alternateNumber || ""}
                        onChange={this.props.handleInputChange}
                        placeholder="Alternate Number"
                      />
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
                      Intervention Size
                    </div>
                    <div className="col-xs-6">
                      <input
                        name="interventionSize"
                        type="number"
                        className="form-control"
                        id="interventionSize"
                        value={this.props.famerinfo.interventionSize || ""}
                        onChange={this.props.handleInputChange}
                        placeholder="interventionSize"
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
                      <select
                        name="houseType"
                        onChange={this.props.handleInputChange}
                        value={this.props.famerinfo.houseType || "NA"}
                        className="form-control"
                        id="selhouse"
                      >
                        <option value="brick">Brick</option>
                        <option value="mud">Mud</option>
                        <option value="NA">NA</option>
                      </select>
                      {/* <input
                        name="houseType"
                        type="text"
                        className="form-control"
                        id="houseType"
                        value={this.props.famerinfo.houseType || ""}
                        onChange={this.props.handleInputChange}
                        placeholder="House Type"
                      /> */}
                    </div>
                  </div>
                  <div className="row farmerinforow">
                    <div className="col-xs-6 farmerinforowtitle">
                      Total Land Size (ha)
                    </div>
                    <div className="col-xs-6">
                      <input
                        name="totalLandSize"
                        type="number"
                        className="form-control"
                        id="totalLandSize"
                        value={this.props.famerinfo.totalLandSize || "0"}
                        onChange={this.props.handleInputChange}
                        placeholder="Land Size in Sq. Ft."
                      />
                    </div>
                  </div>
                  <div className="row farmerinforow">
                    <div className="col-xs-6 farmerinforowtitle">
                      Income from Land (INR)
                    </div>
                    <div className="col-xs-6">
                      <input
                        name="incomeFromLand"
                        type="number"
                        className="form-control"
                        id="incomeFromLand"
                        value={this.props.famerinfo.incomeFromLand || "0"}
                        onChange={this.props.handleInputChange}
                        placeholder="Income From Land in Rupees"
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
                    <div className="col-xs-6 farmerinforowtitle">
                      State{" "}
                      <i
                        title="Mandatory fields"
                        style={{ marginTop: "0.5em", marginLeft: "0.5em" }}
                        className="fa fa-info-circle"
                        aria-hidden="true"
                      />
                    </div>
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
                    <div className="col-xs-6 farmerinforowtitle">
                      District{" "}
                      <i
                        title="Mandatory fields"
                        style={{ marginTop: "0.5em", marginLeft: "0.5em" }}
                        className="fa fa-info-circle"
                        aria-hidden="true"
                      />
                    </div>
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
                        value={this.props.famerinfo.pincode || "0"}
                        onChange={this.props.handleInputChange}
                        placeholder="Pincode"
                      />
                    </div>
                  </div>
                  <div className="row farmerinforow">
                    <div className="col-xs-6 farmerinforowtitle">
                      Latitude{" "}
                      <i
                        title="Mandatory fields"
                        style={{ marginTop: "0.5em", marginLeft: "0.5em" }}
                        className="fa fa-info-circle"
                        aria-hidden="true"
                      />
                    </div>
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
                    <div className="col-xs-6 farmerinforowtitle">
                      Longitude{" "}
                      <i
                        title="Mandatory fields"
                        style={{ marginTop: "0.5em", marginLeft: "0.5em" }}
                        className="fa fa-info-circle"
                        aria-hidden="true"
                      />
                    </div>
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
          <div role="tabpanel" className="tab-pane" id="family1">
            <div className="row kycbody" style={{ margin: "0.7em 0" }}>
              <div className="col-xs-5">
                <div className="">
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
                        value={this.props.famerinfo.numberOfDependents || "0"}
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
                        value={this.props.famerinfo.numberOfSiblings || "0"}
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
                      {/* <select
                        name="fathersProfession"
                        onChange={this.props.handleInputChange}
                        value={
                          this.props.famerinfo.fathersProfession ||
                          "Less than 10th Pass"
                        }
                        className="form-control"
                        id="fathersProfession"
                      >
                        <option value="Less than 10th Pass">
                          Less than 10th Pass
                        </option>
                        <option value="10th Pass">10th Pass</option>
                        <option value="12th Pass">12th Pass</option>
                        <option value="Graduate">Graduate</option>
                        <option value="Postgraduate">Postgraduate</option>
                      </select> */}
                    </div>
                  </div>
                  <div className="row farmerinforow">
                    <div className="col-xs-6 farmerinforowtitle">
                      Education level of farmer
                    </div>

                    <div className="col-xs-6">
                      {/* <input
                        name="highestEducation"
                        type="text"
                        className="form-control"
                        id="highestEducation"
                        value={this.props.famerinfo.highestEducation || ""}
                        onChange={this.props.handleInputChange}
                        placeholder="Education level of farmer"
                      /> */}
                      <select
                        name="highestEducation"
                        onChange={this.props.handleInputChange}
                        value={
                          this.props.famerinfo.highestEducation ||
                          "Less than 10th Pass"
                        }
                        className="form-control"
                        id="highestEducation"
                      >
                        <option value="Less than 10th Pass">
                          Less than 10th Pass
                        </option>
                        <option value="10th Pass">10th Pass</option>
                        <option value="12th Pass">12th Pass</option>
                        <option value="Graduate">Graduate</option>
                        <option value="Postgraduate">Postgraduate</option>
                      </select>
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
                        value={this.props.famerinfo.farmingStartedAt || "0"}
                        onChange={this.props.handleInputChange}
                        placeholder="Age when started farming"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xs-4" />
              <div
                className="col-xs-3"
                style={{ display: "flex", justifyContent: "flex-end" }}
              >
                <button
                  onClick={this.props.handleeditfarmersave}
                  type="submit"
                  className="btn btn-default"
                  aria-label="Right Align"
                  id="drillUp"
                  style={{
                    // display: "none",
                    width: "36%",
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
                    width: "36%",
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
          <div role="tabpanel" className="vertical tab-pane" id="crop1">
            {this.props.famerinfo !== undefined &&
            this.props.famerinfo.croplist !== undefined &&
            this.props.famerinfo.croplist.length !== 0 ? (
              <div>
                <ul
                  className=" nav nav-tabs"
                  role="tablist"
                  style={{ marginTop: "8px" }}
                >
                  {this.props.famerinfo.croplist !== undefined &&
                    this.props.famerinfo.croplist.map((item, index) =>
                      index === 0 ? (
                        <li key={item} role="presentation" className="active">
                          <a
                            href={`#` + item.creationTime}
                            aria-controls={item.deviceId}
                            role="tab"
                            data-toggle="tab"
                          >
                            Crop
                          </a>
                        </li>
                      ) : (
                        <li key={item} role="presentation">
                          <a
                            href={`#` + item.creationTime}
                            aria-controls={item.deviceId}
                            role="tab"
                            data-toggle="tab"
                          >
                            Crop
                          </a>
                        </li>
                      )
                    )}
                  <li
                    role="presentation"
                    style={{
                      display: "flex",
                      justifyContent: "flex-end",
                      float: "right",
                      padding: "0.2em 1.5em"
                    }}
                  >
                    <button
                      onClick={this.props.handleeditfarmersavecroplist}
                      type="submit"
                      className="btn btn-default"
                      aria-label="Right Align"
                      id="drillUp"
                      style={{
                        // display: "none",
                        width: "50%",
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
                        width: "45%",
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
                  <li style={{ float: "right" }} />
                </ul>
                <div className="tab-content">
                  {this.props.famerinfo.croplist !== undefined &&
                    this.props.famerinfo.croplist.map((item, index) => (
                      <div
                        key={item}
                        role="tabpanel"
                        className="vertical tab-pane active"
                        id={item.creationTime}
                      >
                        <div className="col-md-5">
                          <div className="kycbody">
                            <div className="row farmerinforow">
                              <div className="col-xs-6 farmerinforowtitle">
                                Name{" "}
                                <i
                                  title="Mandatory fields"
                                  style={{
                                    marginTop: "0.5em",
                                    marginLeft: "0.5em"
                                  }}
                                  className="fa fa-info-circle"
                                  aria-hidden="true"
                                />
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
                                Crop season{" "}
                                <i
                                  title="Mandatory fields"
                                  style={{
                                    marginTop: "0.5em",
                                    marginLeft: "0.5em"
                                  }}
                                  className="fa fa-info-circle"
                                  aria-hidden="true"
                                />
                              </div>
                              {/* <div className="col-xs-6">
                                      {item.cropSeason || "NA"}
                                    </div> */}
                              <div className="col-xs-6">
                                {/* <input
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
                                /> */}
                                <select
                                  name="cropSeason"
                                  onChange={this.props.crophandleInputChange.bind(
                                    this,
                                    index
                                  )}
                                  value={item.cropSeason || "NA"}
                                  className="form-control"
                                  id="cropSeason"
                                >
                                  <option value="Kharif (June/July)">
                                    Kharif (June/July)
                                  </option>
                                  <option value="Rabi (Nov/Dec)">
                                    Rabi (Nov/Dec)
                                  </option>
                                  <option value="Garma (March/April)">
                                    Garma (March/April)
                                  </option>
                                  <option value="NA">NA</option>
                                </select>
                              </div>
                            </div>
                            <div className="row farmerinforow">
                              <div className="col-xs-6 farmerinforowtitle">
                                Crop variety{" "}
                                <i
                                  title="Mandatory fields"
                                  style={{
                                    marginTop: "0.5em",
                                    marginLeft: "0.5em"
                                  }}
                                  className="fa fa-info-circle"
                                  aria-hidden="true"
                                />
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
                                Sowing month{" "}
                                <i
                                  title="Mandatory fields"
                                  style={{
                                    marginTop: "0.5em",
                                    marginLeft: "0.5em"
                                  }}
                                  className="fa fa-info-circle"
                                  aria-hidden="true"
                                />
                              </div>
                              {/* <div className="col-xs-6">
                                      {item.sowingMonth || "NA"}
                                    </div> */}
                              <div className="col-xs-6">
                                {/* <input
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
                                /> */}
                                <select
                                  name="sowingMonth"
                                  onChange={this.props.crophandleInputChange.bind(
                                    this,
                                    index
                                  )}
                                  value={item.sowingMonth || "NA"}
                                  className="form-control"
                                  id="sowingMonth"
                                >
                                  <option value="Jan">Jan</option>
                                  <option value="Feb">Feb</option>
                                  <option value="Mar">Mar</option>
                                  <option value="Apr">Apr</option>
                                  <option value="May">May</option>
                                  <option value="Jun">Jun</option>
                                  <option value="Jul">Jul</option>
                                  <option value="Aug">Aug</option>
                                  <option value="Sep">Sep</option>
                                  <option value="Oct">Oct</option>
                                  <option value="Nov">Nov</option>
                                  <option value="Dec">Dec</option>
                                  <option value="NA">NA</option>
                                </select>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-1" />
                        <div className="col-md-5">
                          <div className="kycbody">
                            <div className="row farmerinforow">
                              <div className="col-xs-6 farmerinforowtitle">
                                Harvesting time{" "}
                                <i
                                  title="Mandatory fields"
                                  style={{
                                    marginTop: "0.5em",
                                    marginLeft: "0.5em"
                                  }}
                                  className="fa fa-info-circle"
                                  aria-hidden="true"
                                />
                              </div>
                              {/* <div className="col-xs-6">
                                      {item.harvestingTime || "NA"}
                                    </div> */}
                              <div className="col-xs-6">
                                {/* <input
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
                                /> */}
                                <select
                                  name="harvestingTime"
                                  onChange={this.props.crophandleInputChange.bind(
                                    this,
                                    index
                                  )}
                                  value={item.harvestingTime || "NA"}
                                  className="form-control"
                                  id="harvestingTime"
                                >
                                  <option value="Jan">Jan</option>
                                  <option value="Feb">Feb</option>
                                  <option value="Mar">Mar</option>
                                  <option value="Apr">Apr</option>
                                  <option value="May">May</option>
                                  <option value="Jun">Jun</option>
                                  <option value="Jul">Jul</option>
                                  <option value="Aug">Aug</option>
                                  <option value="Sep">Sep</option>
                                  <option value="Oct">Oct</option>
                                  <option value="Nov">Nov</option>
                                  <option value="Dec">Dec</option>
                                  <option value="NA">NA</option>
                                </select>
                              </div>
                            </div>
                            <div className="row farmerinforow">
                              <div className="col-xs-6 farmerinforowtitle">
                                Estimated Yield (Kg)
                              </div>
                              {/* <div className="col-xs-6">
                                      {item.estimateYield || "NA"}
                                    </div> */}
                              <div className="col-xs-6">
                                <input
                                  name="estimatedYield"
                                  type="number"
                                  className="form-control"
                                  id="estimateYield"
                                  value={item.estimatedYield || ""}
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
                                Grown area (katha)
                                <i
                                  title="Mandatory fields"
                                  style={{
                                    marginTop: "0.5em",
                                    marginLeft: "0.5em"
                                  }}
                                  className="fa fa-info-circle"
                                  aria-hidden="true"
                                />
                              </div>
                              {/* <div className="col-xs-6">
                                      {item.grownArea || "NA"}
                                    </div> */}
                              <div className="col-xs-6">
                                <input
                                  name="grownArea"
                                  type="number"
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
          <div role="tabpanel" className="tab-pane" id="images1">
            {this.props.famerinfo !== undefined &&
            this.props.famerinfo.imglist !== undefined &&
            this.props.famerinfo.imglist.length !== 0 ? (
              <div style={{ padding: "1em" }}>
                {this.props.famerinfo.imglist.map((item, number) => (
                  <div
                    key={number}
                    className="row"
                    style={{ marginBottom: "2em" }}
                  >
                    <div className="col-xs-2">
                      <div className="imglistheading">
                        <h4>{item.mediaType}</h4>
                      </div>
                    </div>
                    <div className="col-xs-3">
                      <div className="imglistbody">
                        <img
                          // class="img-rounded"
                          src={item.link}
                          alt={item.mediaType}
                        />
                      </div>
                    </div>
                    <div className="col-xs-4">
                      <label>
                        <b>Upload Image:</b>
                        <input
                          onChange={this.props.handleChangeimage.bind(
                            this,
                            number,
                            item.mediaType
                          )}
                          type="file"
                          ref={this.props.fileInput[number]}
                          style={{ width: "-webkit-fill-available" }}
                        />
                      </label>
                    </div>
                  </div>
                ))}
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
