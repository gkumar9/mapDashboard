import React, { Component } from "react";
import statedistrict from "../../state_json.js";

class Tabprofile extends Component {
  render() {
    return (
      <div role="tabpanel" className="tab-pane active" id="profile1">
        <div className="row kycbody" style={{ margin: "0.7em -0.9em" }}>
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
        <div className="row kycbody">
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
                    //placeholder="Name"
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
                      value={this.props.famerinfo.entryStatus}
                      className="form-control"
                      id="sel3"
                    >
                      <option value="ACTIVE">ACTIVE</option>
                      <option value="INACTIVE">INACTIVE</option>
                      {this.props.famerinfo.entryStatus !== "ACTIVE" &&
                        this.props.famerinfo.entryStatus !== "INACTIVE" && (
                          <option value={this.props.famerinfo.entryStatus}>
                            {this.props.famerinfo.entryStatus}
                          </option>
                        )}
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
                    value={
                      (this.props.famerinfo.contactNo &&
                        Number(
                          this.props.famerinfo.contactNo.replace("IN(+91)-", "")
                        )) ||
                      ""
                    }
                    onChange={this.props.handleInputChange}
                    //placeholder="Contact Number "
                  />
                </div>
              </div>
              <div className="row farmerinforow">
                <div className="col-xs-6 farmerinforowtitle">
                  PAYGO Number{" "}
                  {/* <i
                        title="Mandatory fields"
                        style={{ marginTop: "0.5em", marginLeft: "0.5em" }}
                        className="fa fa-info-circle"
                        aria-hidden="true"
                      /> */}
                </div>
                <div className="col-xs-6">
                  <input
                    name="paygoNumber"
                    // type="number"
                    className="form-control"
                    id="paygoNumber"
                    value={this.props.famerinfo.paygoNumber || ""}
                    onChange={this.props.handleInputChange}
                    // //placeholder="Contact Number "
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
                      value={this.props.famerinfo.uidType}
                      className="form-control"
                      id="sel2"
                    >
                      <option value="AADHAR">AADHAR</option>
                      <option value="VOTER ID">VOTER ID</option>
                      <option value="LICENSE">LICENSE</option>
                      <option value="PAY-GO">PAYGO</option>
                      <option value="OTHERS">OTHERS</option>
                      {this.props.famerinfo.uidType !== "AADHAR" &&
                        this.props.famerinfo.uidType !== "VOTER ID" &&
                        this.props.famerinfo.uidType !== "LICENSE" &&
                        this.props.famerinfo.uidType !== "PAY-GO" &&
                        this.props.famerinfo.uidType !== "OTHERS" && (
                          <option value={this.props.famerinfo.uidType}>
                            {this.props.famerinfo.uidType}
                          </option>
                        )}
                    </select>
                  </div>
                  {/* <input
                      name="uidType"
                      type="text"
                      className="form-control"
                      id="uidType"
                      value={this.props.famerinfo.uidType}
                      onChange={this.props.handleInputChange}
                      //placeholder="UID Type"
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
                    //placeholder="UID "
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
                    value={this.props.famerinfo.vertical}
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
                    {this.props.famerinfo.vertical !==
                      "Solar Irrigation Pump" &&
                      this.props.famerinfo.vertical !==
                        "Solar Drinking Water Pump" &&
                      this.props.famerinfo.vertical !== "Solar Mini Grid" &&
                      this.props.famerinfo.vertical !==
                        "Solar Irrigation Service" && (
                        <option value={this.props.famerinfo.vertical}>
                          {this.props.famerinfo.vertical}
                        </option>
                      )}
                  </select>
                </div>
              </div>
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
                      value={this.props.famerinfo.gender||""}
                      className="form-control"
                      id="sel1"
                    >
                      <option value="M">M</option>
                      <option value="F">F</option>
                      {this.props.famerinfo.gender !== "M" &&
                        this.props.famerinfo.gender !== "F" && (
                          <option value={this.props.famerinfo.gender||""}>
                            {this.props.famerinfo.gender||""}
                          </option>
                        )}
                    </select>
                  </div>
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
                    //placeholder="Father Name"
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
                    maxLength="10"
                    className="form-control"
                    id="alternateNumber"
                    value={this.props.famerinfo.alternateNumber || ""}
                    onChange={this.props.handleInputChange}
                    //placeholder="Alternate Number"
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
                    //placeholder="DOB(dd/mm/yyyy)"
                  />
                </div>
              </div>
              <div className="row farmerinforow">
                <div className="col-xs-6 farmerinforowtitle">Age</div>
                <div className="col-xs-6">
                  <input
                    name="age"
                    type="number"
                    className="form-control"
                    id="age"
                    value={this.props.famerinfo.age || ""}
                    onChange={this.props.handleInputChange}
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
                    //placeholder="Govt. Card Holder (Y/N)"
                  />
                </div>
              </div>
              <div className="row farmerinforow">
                <div className="col-xs-6 farmerinforowtitle">House Type</div>
                <div className="col-xs-6">
                  <select
                    name="houseType"
                    onChange={this.props.handleInputChange}
                    value={this.props.famerinfo.houseType||""}
                    className="form-control"
                    id="selhouse"
                  >
                    <option value="Brick">Brick</option>
                    <option value="Mud">Mud</option>
                    {this.props.famerinfo.houseType !== "Brick" &&
                      this.props.famerinfo.houseType !== "Mud" && (
                        <option value={this.props.famerinfo.houseType||""}>
                          {this.props.famerinfo.houseType||""}
                        </option>
                      )}
                  </select>
                  {/* <input
                        name="houseType"
                        type="text"
                        className="form-control"
                        id="houseType"
                        value={this.props.famerinfo.houseType || ""}
                        onChange={this.props.handleInputChange}
                        //placeholder="House Type"
                      /> */}
                </div>
              </div>
              <div className="row farmerinforow">
                <div className="col-xs-6 farmerinforowtitle">Land Owner</div>
                <div className="col-xs-6">
                  <select
                    name="ownLand"
                    className="form-control"
                    id="ownLand"
                    value={this.props.famerinfo.ownLand||""}
                    onChange={this.props.handleInputChange}
                  >
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                    {this.props.famerinfo.ownLand !== "Yes" &&
                      this.props.famerinfo.ownLand !== "No" && (
                        <option value={this.props.famerinfo.ownLand||""}>
                          {this.props.famerinfo.ownLand||""}
                        </option>
                      )}
                  </select>
                  {/* <input
                        name="ownLand"
                        type="text"
                        className="form-control"
                        id="ownLand"
                        value={this.props.famerinfo.ownLand}
                        onChange={this.props.handleInputChange}
                        // //placeholder=""
                      /> */}
                </div>
              </div>
              <div className="row farmerinforow">
                <div className="col-xs-6 farmerinforowtitle">No of Lands</div>
                <div className="col-xs-6">
                  <input
                    name="numberOfLands"
                    type="number"
                    className="form-control"
                    id="numberOfLands"
                    value={Number(this.props.famerinfo.numberOfLands) || ""}
                    onChange={this.props.handleInputChange}
                    // //placeholder=""
                  />
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
                    value={Number(this.props.famerinfo.totalLandSize) || ""}
                    onChange={this.props.handleInputChange}
                    //placeholder="Land Size in Sq. Ft."
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
                    value={Number(this.props.famerinfo.incomeFromLand) || ""}
                    onChange={this.props.handleInputChange}
                    //placeholder="Income From Land in Rupees"
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
                    value={
                      this.props.famerinfo.state &&
                      /^[a-zA-Z0-9- ]*$/.test(this.props.famerinfo.state)
                        ? this.props.famerinfo.state
                        : "NA"
                    }
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
                  this.props.famerinfo.state !== "NA" &&
                  /^[a-zA-Z0-9- ]*$/.test(this.props.famerinfo.state) &&
                  this.props.famerinfo.state !== undefined ? (
                    <select
                      name="district"
                      onChange={this.props.handleInputChange}
                      value={this.props.famerinfo.district || "NA"}
                      className="form-control"
                      id="district"
                    >
                      {statedistrict[this.props.famerinfo.state].map(item => (
                        <option key={item} value={item}>
                          {item}
                        </option>
                      ))}
                      <option value="NA">NA</option>
                    </select>
                  ) : (
                    <select
                      name="district"
                      onChange={this.props.handleInputChange}
                      value={this.props.famerinfo.district}
                      className="form-control"
                      id="district"
                    />
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
                    //placeholder="Block"
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
                    //placeholder="Community"
                  />
                </div>
              </div>
              <div className="row farmerinforow">
                <div className="col-xs-6 farmerinforowtitle">Sub-community</div>
                <div className="col-xs-6">
                  <input
                    name="subCommunity"
                    type="text"
                    className="form-control"
                    id="subCommunity"
                    value={this.props.famerinfo.subCommunity || ""}
                    onChange={this.props.handleInputChange}
                    //placeholder="Sub Community"
                  />
                </div>
              </div>
              <div className="row farmerinforow">
                <div className="col-xs-6 farmerinforowtitle">
                  No of Community
                </div>
                <div className="col-xs-6">
                  <input
                    name="numberOfCommunity"
                    type="number"
                    className="form-control"
                    id="numberOfCommunity"
                    value={Number(this.props.famerinfo.numberOfCommunity) || ""}
                    onChange={this.props.handleInputChange}
                    // //placeholder="Number Of C"
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
                    //placeholder="Village"
                  />
                </div>
              </div>
              <div className="row farmerinforow">
                <div className="col-xs-6 farmerinforowtitle">Pincode</div>
                <div className="col-xs-6">
                  <input
                    name="pincode"
                    maxLength="6"
                    // onInput={function(){return(this.value=this.value.replace(/[^0-9]/g,''));}}
                    // type="number"
                    className="form-control"
                    id="pincode"
                    value={this.props.famerinfo.pincode + ""}
                    onChange={this.props.handleInputChange}
                    // //placeholder="Pincode"
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
                    //placeholder="Latitude"
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
                    //placeholder="Longitude"
                    required
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row kycbody">
          <div className="kycheading" style={{ margin: "0 1em" }}>
            <h3>Miscellaneous</h3>
          </div>
          <div className="col-md-5">
            <div className="kycbody">
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
                    ////placeholder="interventionSize"
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
                    //placeholder="BPL Card Holder"
                  />
                </div>
              </div>
              <div className="row farmerinforow">
                <div className="col-xs-6 farmerinforowtitle">
                  Smart Phone Owner
                </div>
                <div className="col-xs-6">
                  <input
                    name="haveSmartPhone"
                    type="text"
                    className="form-control"
                    id="haveSmartPhone"
                    value={this.props.famerinfo.haveSmartPhone || ""}
                    onChange={this.props.handleInputChange}
                    //placeholder="BPL Card Holder"
                  />
                </div>
              </div>
              <div className="row farmerinforow">
                <div className="col-xs-6 farmerinforowtitle">
                  Smart Phone Number
                </div>
                <div className="col-xs-6">
                  <input
                    name="smartPhoneNumber"
                    type="number"
                    className="form-control"
                    id="smartPhoneNumber"
                    value={this.props.famerinfo.smartPhoneNumber || ""}
                    onChange={this.props.handleInputChange}
                    //placeholder="BPL Card Holder"
                  />
                </div>
              </div>
              <div className="row farmerinforow">
                <div className="col-xs-6 farmerinforowtitle">
                  Meter Capacity
                </div>
                <div className="col-xs-6">
                  <input
                    name="meterCapacity"
                    type="text"
                    className="form-control"
                    id="meterCapacity"
                    value={this.props.famerinfo.meterCapacity || ""}
                    onChange={this.props.handleInputChange}
                    //placeholder="BPL Card Holder"
                  />
                </div>
              </div>
              <div className="row farmerinforow">
                <div className="col-xs-6 farmerinforowtitle">
                  Yearly Digital Expenditure
                </div>
                <div className="col-xs-6">
                  <input
                    name="yearlyDigitalExpenditure"
                    type="text"
                    className="form-control"
                    id="yearlyDigitalExpenditure"
                    value={this.props.famerinfo.yearlyDigitalExpenditure || ""}
                    onChange={this.props.handleInputChange}
                    //placeholder="BPL Card Holder"
                  />
                </div>
              </div>
              <div className="row farmerinforow">
                <div className="col-xs-6 farmerinforowtitle">
                  Daily Electricity Availability
                </div>
                <div className="col-xs-6">
                  <input
                    name="dailyElectricityAvailability"
                    type="text"
                    className="form-control"
                    id="dailyElectricityAvailability"
                    value={
                      this.props.famerinfo.dailyElectricityAvailability || ""
                    }
                    onChange={this.props.handleInputChange}
                    //placeholder="BPL Card Holder"
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
                  Electricity Connection
                </div>
                <div className="col-xs-6">
                  <input
                    name="electricityConnection"
                    type="text"
                    className="form-control"
                    id="electricityConnection"
                    value={this.props.famerinfo.electricityConnection || ""}
                    onChange={this.props.handleInputChange}
                    ////placeholder="interventionSize"
                  />
                </div>
              </div>

              <div className="row farmerinforow">
                <div className="col-xs-6 farmerinforowtitle">
                  Monthly Electricity Bill
                </div>
                <div className="col-xs-6">
                  <input
                    name="monthlyElectricityBill"
                    type="text"
                    className="form-control"
                    id="monthlyElectricityBill"
                    value={this.props.famerinfo.monthlyElectricityBill || ""}
                    onChange={this.props.handleInputChange}
                    //placeholder="BPL Card Holder"
                  />
                </div>
              </div>
              <div className="row farmerinforow">
                <div className="col-xs-6 farmerinforowtitle">
                  Have Digital Pump
                </div>
                <div className="col-xs-6">
                  <input
                    name="haveDigitalPump"
                    type="text"
                    className="form-control"
                    id="haveDigitalPump"
                    value={this.props.famerinfo.haveDigitalPump || ""}
                    onChange={this.props.handleInputChange}
                    //placeholder="BPL Card Holder"
                  />
                </div>
              </div>
              <div className="row farmerinforow">
                <div className="col-xs-6 farmerinforowtitle">Hourly Rent</div>
                <div className="col-xs-6">
                  <input
                    name="hourlyRent"
                    type="text"
                    className="form-control"
                    id="hourlyRent"
                    value={this.props.famerinfo.hourlyRent || ""}
                    onChange={this.props.handleInputChange}
                    //placeholder="BPL Card Holder"
                  />
                </div>
              </div>
              <div className="row farmerinforow">
                <div className="col-xs-6 farmerinforowtitle">Yearly Rent</div>
                <div className="col-xs-6">
                  <input
                    name="yearlyRent"
                    type="text"
                    className="form-control"
                    id="yearlyRent"
                    value={this.props.famerinfo.yearlyRent || ""}
                    onChange={this.props.handleInputChange}
                    //placeholder="BPL Card Holder"
                  />
                </div>
              </div>
              <div className="row farmerinforow">
                <div className="col-xs-6 farmerinforowtitle">
                  Digital Pump Owner
                </div>
                <div className="col-xs-6">
                  <input
                    name="digitalPumpOwner"
                    type="text"
                    className="form-control"
                    id="digitalPumpOwner"
                    value={this.props.famerinfo.digitalPumpOwner || ""}
                    onChange={this.props.handleInputChange}
                    //placeholder="BPL Card Holder"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
class Tabfamily extends Component {
  render() {
    return (
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
                    value={
                      Number(this.props.famerinfo.numberOfDependents) || ""
                    }
                    onChange={this.props.handleInputChange}
                    // //placeholder="Number Of Dependents"
                  />
                </div>
              </div>
              <div className="row farmerinforow">
                <div className="col-xs-6 farmerinforowtitle">
                  No of Children
                </div>
                <div className="col-xs-6">
                  <input
                    name="numberOfChildren"
                    type="number"
                    className="form-control"
                    id="numberOfChildren"
                    value={Number(this.props.famerinfo.numberOfChildren) || ""}
                    onChange={this.props.handleInputChange}
                    // //placeholder="Number Of Dependents"
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
                    value={Number(this.props.famerinfo.numberOfSiblings) || ""}
                    onChange={this.props.handleInputChange}
                    //placeholder="Number Of Siblings"
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
                    //placeholder="Profession of father"
                  />
                </div>
              </div>
              <div className="row farmerinforow">
                <div className="col-xs-6 farmerinforowtitle">
                  Education level of farmer
                </div>

                <div className="col-xs-6">
                  <select
                    name="highestEducation"
                    onChange={this.props.handleInputChange}
                    value={this.props.famerinfo.highestEducation || ""}
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
                    <option value="NA">NA</option>
                    {this.props.famerinfo.highestEducation !==
                      "Less than 10th Pass" &&
                      this.props.famerinfo.highestEducation !== "10th Pass" &&
                      this.props.famerinfo.highestEducation !== "12th Pass" &&
                      this.props.famerinfo.highestEducation !== "Graduate" &&
                      this.props.famerinfo.highestEducation !==
                        "Postgraduate" && (
                        <option value={this.props.famerinfo.highestEducation||""}>
                          {this.props.famerinfo.highestEducation||""}
                        </option>
                      )}
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
                    value={this.props.famerinfo.farmingStartedAt || ""}
                    onChange={this.props.handleInputChange}
                    //placeholder="Age when started farming"
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
    );
  }
}
class Tabcrop extends Component {
  render() {
    return (
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
                this.props.famerinfo.croplist.map((item, index) => (
                  <li
                    key={index}
                    role="presentation"
                    className={index === 0 ? "active" : ""}
                  >
                    <a
                      style={{ color: "black" }}
                      href={`#e` + item.name + item.id}
                      aria-controls={item.id}
                      role="tab"
                      data-toggle="tab"
                    >
                      {item.name || "NA"}
                    </a>
                  </li>
                ))}
              {/* <li
                role="presentation"
              >
                <a style={{ color: "black" }} onClick={this.props.addcrop}>
                  <span class="glyphicon glyphicon-plus"></span>
                </a>
                
              </li> */}
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
                    key={index}
                    role="tabpanel"
                    className={index === 0 ? "tab-pane active" : "tab-pane"}
                    id={"e" + item.name + item.id}
                    style={{ padding: "1em" }}
                  >
                    <div className="row">
                      <div className="col-md-5">
                        <div className="">
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
                                //placeholder="Crop Name"
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
                            <div className="col-xs-6">
                              <select
                                name="cropSeason"
                                onChange={this.props.crophandleInputChange.bind(
                                  this,
                                  index
                                )}
                                value={item.cropSeason ||""}
                                className="form-control"
                                id="cropSeason"
                              >
                                <option value="Kharif(June/July)">
                                  Kharif(June/July)
                                </option>
                                <option value="Rabi(Nov/Dec)">
                                  Rabi(Nov/Dec)
                                </option>
                                <option value="Garma(March/April)">
                                  Garma(March/April)
                                </option>
                                {item.cropSeason !== "Kharif(June/July)" &&
                                  item.cropSeason !== "Rabi(Nov/Dec)" &&
                                  item.cropSeason !== "Garma(March/April)" && (
                                    <option value={item.cropSeason ||""}>
                                      {item.cropSeason ||""}
                                    </option>
                                  )}
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
                                //placeholder="Crop Variety"
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
                            <div className="col-xs-6">
                              <select
                                name="sowingMonth"
                                onChange={this.props.crophandleInputChange.bind(
                                  this,
                                  index
                                )}
                                value={item.sowingMonth||""}
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
                                {item.sowingMonth !== "Jan" &&
                                  item.sowingMonth !== "Feb" &&
                                  item.sowingMonth !== "Mar" &&
                                  item.sowingMonth !== "Apr" &&
                                  item.sowingMonth !== "May" &&
                                  item.sowingMonth !== "Jun" &&
                                  item.sowingMonth !== "Jul" &&
                                  item.sowingMonth !== "Aug" &&
                                  item.sowingMonth !== "Sep" &&
                                  item.sowingMonth !== "Oct" &&
                                  item.sowingMonth !== "Nov" &&
                                  item.sowingMonth !== "Dec" && (
                                    <option value={item.sowingMonth||""}>
                                      {item.sowingMonth||""}
                                    </option>
                                  )}
                              </select>
                            </div>
                          </div>
                          <div className="row farmerinforow">
                            <div className="col-xs-6 farmerinforowtitle">
                              Sowing Date{" "}
                            </div>

                            <div className="col-xs-6">
                              <input
                                name="sowingDate"
                                type="date"
                                className="form-control"
                                id="sowingDate"
                                value={item.sowingDate}
                                onChange={this.props.crophandleInputChange.bind(
                                  this,
                                  index
                                )}
                              />
                            </div>
                          </div>
                          <div className="row farmerinforow">
                            <div className="col-xs-6 farmerinforowtitle">
                              Accuracy
                            </div>

                            <div className="col-xs-6">
                              <input
                                name="accuracy"
                                type="text"
                                className="form-control"
                                id="accuracy"
                                value={item.accuracy || ""}
                                onChange={this.props.crophandleInputChange.bind(
                                  this,
                                  index
                                )}
                              />
                            </div>
                          </div>
                          <div className="row farmerinforow">
                            <div className="col-xs-6 farmerinforowtitle">
                              Unit
                            </div>

                            <div className="col-xs-6">
                              <input
                                name="unit"
                                type="text"
                                className="form-control"
                                id="unit"
                                value={item.unit || ""}
                                onChange={this.props.crophandleInputChange.bind(
                                  this,
                                  index
                                )}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-1" />
                      <div className="col-md-5">
                        <div className="">
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
                            <div className="col-xs-6">
                              
                              <select
                                name="harvestingTime"
                                onChange={this.props.crophandleInputChange.bind(
                                  this,
                                  index
                                )}
                                value={item.harvestingTime || ""}
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
																{item.harvestingTime !== "Jan" &&
                                  item.harvestingTime !== "Feb" &&
                                  item.harvestingTime !== "Mar" &&
                                  item.harvestingTime !== "Apr" &&
                                  item.harvestingTime !== "May" &&
                                  item.harvestingTime !== "Jun" &&
                                  item.harvestingTime !== "Jul" &&
                                  item.harvestingTime !== "Aug" &&
                                  item.harvestingTime !== "Sep" &&
                                  item.harvestingTime !== "Oct" &&
                                  item.harvestingTime !== "Nov" &&
                                  item.harvestingTime !== "Dec" && (
                                    <option value={item.harvestingTime||""}>
                                      {item.harvestingTime||""}
                                    </option>
                                  )}
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
                                value={Number(item.estimatedYield) || ""}
                                onChange={this.props.crophandleInputChange.bind(
                                  this,
                                  index
                                )}
                                //placeholder="Estimate Yield"
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
                                value={Number(item.grownArea) || ""}
                                onChange={this.props.crophandleInputChange.bind(
                                  this,
                                  index
                                )}
                                //placeholder="Grown Area"
                              />
                            </div>
                          </div>
                          <div className="row farmerinforow">
                            <div className="col-xs-6 farmerinforowtitle">
                              Previous Buyer
                            </div>
                            <div className="col-xs-6">
                              <input
                                name="perviousBuyer"
                                type="textarea"
                                className="form-control"
                                id="perviousBuyer"
                                value={item.previousBuyer || ""}
                                onChange={this.props.crophandleInputChange.bind(
                                  this,
                                  index
                                )}
                              />
                            </div>
                          </div>
                          <div className="row farmerinforow">
                            <div className="col-xs-6 farmerinforowtitle">
                              Previous Sold Unit
                            </div>
                            <div className="col-xs-6">
                              <input
                                name="perviousSoldUnit"
                                type="textarea"
                                className="form-control"
                                id="perviousSoldUnit"
                                value={item.perviousSoldUnit || ""}
                                onChange={this.props.crophandleInputChange.bind(
                                  this,
                                  index
                                )}
                              />
                            </div>
                          </div>
                          <div className="row farmerinforow">
                            <div className="col-xs-6 farmerinforowtitle">
                              Previous Sold Quantity
                            </div>
                            <div className="col-xs-6">
                              <input
                                name="perviousSoldQuantity"
                                type="textarea"
                                className="form-control"
                                id="perviousSoldQuantity"
                                value={item.perviousSoldQuantity || ""}
                                onChange={this.props.crophandleInputChange.bind(
                                  this,
                                  index
                                )}
                              />
                            </div>
                          </div>
                          <div className="row farmerinforow">
                            <div className="col-xs-6 farmerinforowtitle">
                              Previous Sold Price
                            </div>
                            <div className="col-xs-6">
                              <input
                                name="perviousSoldPrice"
                                type="textarea"
                                className="form-control"
                                id="perviousSoldPrice"
                                value={item.perviousSoldPrice || ""}
                                onChange={this.props.crophandleInputChange.bind(
                                  this,
                                  index
                                )}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6" style={{ padding: "1em" }}>
                        <div className="cropimageheading">
                          <h3 className="farmerinfobody">Crop Image</h3>
                        </div>

                        <div className="cropimagebody">
                          <img src={item.cropImage} />
                        </div>
                        <label>
                          <b>Upload Image:</b>
                          <input
                            onChange={this.props.handleCropChangeimage.bind(
                              this,
                              index
                            )}
                            type="file"
                            ref={this.props.fileInputCrop}
                          />
                        </label>
                      </div>
                      <div className="col-md-6" style={{ padding: "1em" }}>
                        <div className="cropimageheading">
                          <h3 className="farmerinfobody">Farm Image</h3>
                        </div>
                        <div className="cropimagebody">
                          <img src={item.farmImage} />
                        </div>
                        <label>
                          <b>Upload Image:</b>
                          <input
                            onChange={this.props.handleFarmChangeimage.bind(
                              this,
                              index
                            )}
                            type="file"
                            ref={this.props.fileInputFarm}
                          />
                        </label>
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
    );
  }
}
class Tabmedia extends Component {
  render() {
    return (
      <div role="tabpanel" className="tab-pane" id="images1">
        {this.props.famerinfo !== undefined &&
        this.props.famerinfo.imglist !== undefined &&
        this.props.famerinfo.imglist.length !== 0 ? (
          <div style={{ padding: "1em" }}>
            {/* {this.props.famerinfo.imglist.map((item, number) => (
              <div key={number} className="row" style={{ marginBottom: "2em" }}>
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
            ))} */}
            {this.props.famerinfo.imglist.map((item, number) => (
              <div key={number} className="col-md-6">
                <div className="card">
                  <div className="card-body cropimageheading">
                    <h3 className="card-title farmerinfobody">
                      {item.mediaType}
                    </h3>
                  </div>
                  <div className="card-body cropimagebody">
                    <img
                      src={item.link}
                      alt={item.mediaType}
                      style={{ width: "100%" }}
                    />
                  </div>
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
    );
  }
}
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
          <Tabprofile
            famerinfo={this.props.famerinfo}
            handleInputChange={this.props.handleInputChange}
            handleeditfarmersave={this.props.handleeditfarmersave}
            handlecancelfarmer={this.props.handlecancelfarmer}
          />
          <Tabfamily
            famerinfo={this.props.famerinfo}
            handleInputChange={this.props.handleInputChange}
            handleeditfarmersave={this.props.handleeditfarmersave}
            handlecancelfarmer={this.props.handlecancelfarmer}
          />
          <Tabcrop
            famerinfo={this.props.famerinfo}
            crophandleInputChange={this.props.crophandleInputChange}
            handleeditfarmersavecroplist={
              this.props.handleeditfarmersavecroplist
            }
            fileInputCrop={this.props.fileInputCrop}
            fileInputFarm={this.props.fileInputFarm}
            handleCropChangeimage={this.props.handleCropChangeimage}
            handleFarmChangeimage={this.props.handleFarmChangeimage}
            handlecancelfarmer={this.props.handlecancelfarmer}
            addcrop={this.props.addcrop}
          />
          <Tabmedia
            famerinfo={this.props.famerinfo}
            handleChangeimage={this.props.handleChangeimage}
            fileInput={this.props.fileInput}
          />
        </div>
      </div>
    );
  }
}
export default Farmeredit;
