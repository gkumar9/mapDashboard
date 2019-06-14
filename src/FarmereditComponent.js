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
        >
          <div className="container">
            <div className="row farmerinfoheader ">
              <div className="col-xs-4">
                <div className="row farmerinforow">
                  <div className="col-xs-6 farmerinforowtitle">
                    Name{" "}
                    <i
                      title="Mandatory fields"
                      style={{ marginTop: "0.5em", marginLeft: "0.5em" }}
                      className="fa fa-info-circle"
                      aria-hidden="true"
                    />
                  </div>
                  <div className="col-xs-6">
                    <span style={{ fontSize: "1.4em" }}>
                      {/* {this.props.famerinfo.name} */}
                      <input
                        name="name"
                        type="text"
                        className="form-control"
                        id="name"
                        value={this.props.famerinfo.name || ""}
                        onChange={this.props.handleInputChange}
                        placeholder="Name"
                      
                      />
                    </span>
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
                      value={this.props.famerinfo.vertical ||"NA"}
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
                      <option value="NA">NA</option>
                    </select>
                  </div>
                </div>
  
                <div className="row farmerinforow">
                  <div className="col-xs-6 farmerinforowtitle">
                    <span>
                      Gender{" "}
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
                        name="gender"
                        onChange={this.props.handleInputChange}
                        value={this.props.famerinfo.gender||"NA"}
                        className="form-control"
                        id="sel1"
                      >
                        <option value="M">M</option>
                        <option value="F">F</option>
                        <option value="NA">NA</option>
                      </select>
                    </div>
                    {/* <input
                      name="gender"
                      type="text"
                      className="form-control"
                      id="gender"
                      value={this.props.famerinfo.gender}
                      onChange={this.props.handleInputChange}
                      placeholder="Gender(M/F)"
                    /> */}
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
                        value={this.props.famerinfo.entryStatus ||"ACTIVE"}
                        className="form-control"
                        id="sel3"
                      >
                        <option value="ACTIVE">ACTIVE</option>
                        <option value="INACTIVE">INACTIVE</option>
                      </select>
                    </div>
                    {/* <input
                      name="entryStatus"
                      type="text"
                      className="form-control"
                      id="entryStatus"
                      value={this.props.famerinfo.entryStatus}
                      onChange={this.props.handleInputChange}
                      placeholder="Status"
                    /> */}
                  </div>
                </div>
                {/* <div className="row farmerinforow">
                  <div className="col-xs-6">
                    <span>DOB</span>
                  </div>
                  <div className="col-xs-6">
                    <input
                      name="dob"
                      type="date"
                      className="form-control"
                      id="dob"
                      value={this.props.famerinfo.dob}
                      onChange={this.props.handleInputChange}
                      placeholder="DOB(dd/mm/yyyy)"
                    />
                  </div>
                </div> */}
              </div>
              <div className="col-xs-1" />
              <div className="col-xs-4 ">
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
                      value={this.props.famerinfo.state ||"NA"}
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
                          value={this.props.famerinfo.district||"NA"}
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
                      )}
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
  
              <div className="col-xs-3">
                <div className="row">
                  <button
                    onClick={this.props.handleeditfarmersave}
                    type="submit"
                    className="btn btn-default"
                    aria-label="Right Align"
                    id="drillUp"
                    style={{
                      // display: "none",
                      width: "35%",
                      borderRadius: "0px",
                      marginBottom: "1em",
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
                      width: "35%",
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
                <div className="row" style={{ marginTop: "3em" }}>
                  <label>
                    <b>Upload Image:</b>
                    <input
                      type="file"
                      onChange={e => this.props.handleChangeimage(e.target.files)}
                      ref={this.props.fileInput}
                      style={{ width: "-webkit-fill-available" }}
                    />
                  </label>
                </div>
              </div>
            </div>
  
            <div className="row farmerinfobody">
              <div className="col-md-4">
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
                  <div
                    className="col-xs-6 farmerinforowtitle"
                    title="Please fill values in Wp"
                  >
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
                      placeholder="Size in Wp"
                    />
                  </div>
                </div>
                <div className="row farmerinforow">
                  <div className="col-xs-6 farmerinforowtitle">Reg. Date</div>
                  <div className="col-xs-6">
                    <input
                      name="farmerRegDate"
                      type="date"
                      className="form-control"
                      id="farmerRegDate"
                      value={this.props.famerinfo.farmerRegDate ||''}
                      onChange={this.props.handleInputChange}
                      placeholder="Farmer Reg. date(dd/mm/yyyy)"
                    />
                  </div>
                </div>
                <div className="row farmerinforow">
                  <div className="col-xs-6 farmerinforowtitle">
                    Govt. Card Holder
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
                    Income From Land
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
                <div className="row farmerinforow">
                  <div className="col-xs-6 farmerinforowtitle">Contact No</div>
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
                  <div className="col-xs-6 farmerinforowtitle">Modified By</div>
                  <div className="col-xs-6">
                    <input
                      name="modifiedBy"
                      type="text"
                      className="form-control"
                      id="modifiedBy"
                      value={this.props.famerinfo.modifiedBy || ""}
                      onChange={this.props.handleInputChange}
                      placeholder="Modified By"
                    />
                  </div>
                </div>
                <div className="row farmerinforow">
                  <div className="col-xs-6 farmerinforowtitle">Informer Name</div>
                  <div className="col-xs-6">
                    <input
                      name="farmerInfoInformerName"
                      type="text"
                      className="form-control"
                      id="farmerInfoInformerName"
                      value={this.props.famerinfo.farmerInfoInformerName || ""}
                      onChange={this.props.handleInputChange}
                      placeholder="Farmer Info Informer Name"
                    />
                  </div>
                </div>
              </div>
              <div className="col-md-1" />
              <div className="col-md-4">
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
                        <option value="SYSTEM_GENERATED">SYSTEM_GENERATED</option>
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
                  <div className="col-xs-6 farmerinforowtitle">Sub-community</div>
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
                  <div className="col-xs-6 farmerinforowtitle">House Type</div>
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
                    <span>DOB</span>
                  </div>
                  <div className="col-xs-6">
                    <input
                      name="dob"
                      type="date"
                      className="form-control"
                      id="dob"
                      value={this.props.famerinfo.dob ||''}
                      onChange={this.props.handleInputChange}
                      placeholder="DOB(dd/mm/yyyy)"
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
  export default Farmeredit;