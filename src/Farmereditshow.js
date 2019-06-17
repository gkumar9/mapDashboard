import React, { Component } from "react";
import farmerimg from "./pins/user.png";

class Farmereditshow extends Component {
  render() {
    console.log(this.props.famerinfo.pumplist);
    return (
      <div id="showsidetab" style={{ display: "none" }}>
        <div className="container">
          <div className="row farmerinfoheader">
            <div className="col-xs-2">
              {this.props.famerinfo.farmerImage !== null &&
              this.props.famerinfo.farmerImage !== "NA" &&
              this.props.famerinfo.farmerImage !== "N.A" ? (
                <img
                  style={{
                    marginTop: "1em",
                    borderRadius: "50%",
                    height: "17vh"
                  }}
                  width="100%"
                  src={this.props.famerinfo.farmerImage}
                  alt="farmerimg"
                />
              ) : (
                <img
                  width="100%"
                  style={{ marginTop: "1em", height: "17vh" }}
                  src={farmerimg}
                  alt="placeholder farmerimg"
                />
              )}
            </div>
            <div className="col-xs-10 famerinfoheaderbox">
              <div className="row">
                <div className="col-sm-8">
                  <div className="row">
                    <div className="col-xs-8">
                      <span style={{ fontSize: "1.4em" }}>
                        {this.props.famerinfo.name}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="col-sm-4">
                  {/* <div className="col-xs-6" /> */}
                  <div className="col-xs-12">
                    <button
                      onClick={this.props.handleeditfarmer}
                      type="button"
                      className="btn btn-default "
                      aria-label="Right Align"
                      // id="drillUp"
                      style={{
                        // display: "none",
                        width: "40%",
                        borderRadius: "0px",
                        borderColor: "darkgray",
                        float: "right",
                        outline: "none",
                        color: "white",
                        backgroundColor: "blue"
                      }}
                    >
                      Edit
                    </button>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-sm-4">
                  <div className="row">
                    <div className="col-xs-12">
                      {this.props.famerinfo.uidType} :{" "}
                      {this.props.famerinfo.uid}
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-xs-8">
                      {this.props.famerinfo.contactNo !== "N.A" &&
                        this.props.famerinfo.contactNo !== "" && (
                          <span>+91{this.props.famerinfo.contactNo}</span>
                        )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row farmerinfobody">
            <div>
              <ul className="nav nav-tabs" role="tablist">
                <li role="presentation" className="active">
                  <a
                    style={{ color: "rgb(102, 102, 102)" }}
                    href="#profile"
                    aria-controls="profile"
                    role="tab"
                    data-toggle="tab"
                  >
                    KYC of farmer
                  </a>
                </li>

                <li role="presentation">
                  <a
                    style={{ color: "rgb(102, 102, 102)" }}
                    href="#family"
                    aria-controls="family"
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
                    href="#vertical"
                    aria-controls="vertical"
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
                    href="#crop"
                    aria-controls="crop"
                    role="tab"
                    data-toggle="tab"
                  >
                    Crop info
                  </a>
                </li>
                <li role="presentation">
                  <a
                    style={{ color: "rgb(102, 102, 102)" }}
                    href="#images"
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
                  // padding: "1em",
                  maxHeight: "60vh",
                  overflow: "scroll"
                }}
              >
                <div role="tabpanel" className="tab-pane active" id="profile">
                  <div className="col-md-5">
                    <div className="kycheading">
                      <h3>Personal</h3>
                    </div>
                    <div className="kycbody">
                      <div className="row farmerinforow">
                        <div className="col-xs-6 farmerinforowtitle">
                          Alternate Number
                        </div>
                        <div className="col-xs-6">
                          {this.props.famerinfo.alternateNumber || "NA"}
                        </div>
                      </div>
                      <div className="row farmerinforow">
                        <div className="col-xs-6 farmerinforowtitle">
                          Father Name
                        </div>
                        <div className="col-xs-6">
                          {this.props.famerinfo.fatherName || "NA"}
                        </div>
                      </div>
                      <div className="row farmerinforow">
                        <div className="col-xs-6 farmerinforowtitle">
                          Gender
                        </div>
                        <div className="col-xs-6">
                          {this.props.famerinfo.gender || "NA"}
                        </div>
                      </div>
                      <div className="row farmerinforow">
                        <div className="col-xs-6 farmerinforowtitle">DOB</div>
                        <div className="col-xs-6">
                          {this.props.famerinfo.dob || "NA"}
                        </div>
                      </div>
                      <div className="row farmerinforow">
                        <div className="col-xs-6 farmerinforowtitle">
                          Govt Card Holder
                        </div>
                        <div className="col-xs-6">
                          {this.props.famerinfo.govtCardHolder || "NA"}
                        </div>
                      </div>
                      <div className="row farmerinforow">
                        <div className="col-xs-6 farmerinforowtitle">
                          BPL Card
                        </div>
                        <div className="col-xs-6">
                          {this.props.famerinfo.bplCard || "NA"}
                        </div>
                      </div>
                      <div className="row farmerinforow">
                        <div className="col-xs-6 farmerinforowtitle">
                          House Type
                        </div>
                        <div className="col-xs-6">
                          {this.props.famerinfo.houseType || "NA"}
                        </div>
                      </div>
                      <div className="row farmerinforow">
                        <div className="col-xs-6 farmerinforowtitle">
                          Toatal Land Size
                        </div>
                        <div className="col-xs-6">
                          {this.props.famerinfo.totalLandSize || "NA"}
                        </div>
                      </div>
                      <div className="row farmerinforow">
                        <div className="col-xs-6 farmerinforowtitle">
                          Income from Land
                        </div>
                        <div className="col-xs-6">
                          {this.props.famerinfo.incomeFromLand || "NA"}
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
                          {this.props.famerinfo.state || "NA"}
                        </div>
                      </div>
                      <div className="row farmerinforow">
                        <div className="col-xs-6 farmerinforowtitle">
                          District
                        </div>
                        <div className="col-xs-6">
                          {this.props.famerinfo.district || "NA"}
                        </div>
                      </div>
                      <div className="row farmerinforow">
                        <div className="col-xs-6 farmerinforowtitle">Block</div>
                        <div className="col-xs-6">
                          {this.props.famerinfo.block || "NA"}
                        </div>
                      </div>
                      <div className="row farmerinforow">
                        <div className="col-xs-6 farmerinforowtitle">
                          Community
                        </div>
                        <div className="col-xs-6">
                          {this.props.famerinfo.community || "NA"}
                        </div>
                      </div>
                      <div className="row farmerinforow">
                        <div className="col-xs-6 farmerinforowtitle">
                          Sub-community
                        </div>
                        <div className="col-xs-6">
                          {this.props.famerinfo.subCommunity || "NA"}
                        </div>
                      </div>
                      <div className="row farmerinforow">
                        <div className="col-xs-6 farmerinforowtitle">
                          Village
                        </div>
                        <div className="col-xs-6">
                          {this.props.famerinfo.village || "NA"}
                        </div>
                      </div>
                      <div className="row farmerinforow">
                        <div className="col-xs-6 farmerinforowtitle">
                          Pincode
                        </div>
                        <div className="col-xs-6">
                          {this.props.famerinfo.pincode || "NA"}
                        </div>
                      </div>
                      <div className="row farmerinforow">
                        <div className="col-xs-6 farmerinforowtitle">
                          Latitude
                        </div>
                        <div className="col-xs-6">
                          {this.props.famerinfo.latitude || "NA"}
                        </div>
                      </div>
                      <div className="row farmerinforow">
                        <div className="col-xs-6 farmerinforowtitle">
                          Longitude
                        </div>
                        <div className="col-xs-6">
                          {this.props.famerinfo.longitude || "NA"}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div role="tabpanel" className="tab-pane" id="vertical">
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
                                    {item.installationDate || "NA"}
                                  </div>
                                </div>
                                <div className="row farmerinforow">
                                  <div className="col-xs-6 farmerinforowtitle">
                                    Project code
                                  </div>
                                  <div className="col-xs-6">
                                    {item.projectCode || "NA"}
                                  </div>
                                </div>
                                <div className="row farmerinforow">
                                  <div className="col-xs-6 farmerinforowtitle">
                                    Habitation
                                  </div>
                                  <div className="col-xs-6">
                                    {item.habitation || "NA"}
                                  </div>
                                </div>
                                <div className="row farmerinforow">
                                  <div className="col-xs-6 farmerinforowtitle">
                                    Application
                                  </div>
                                  <div className="col-xs-6">
                                    {item.application || "NA"}
                                  </div>
                                </div>
                                <div className="row farmerinforow">
                                  <div className="col-xs-6 farmerinforowtitle">
                                    VFD make
                                  </div>
                                  <div className="col-xs-6">
                                    {item.vfdMake || "NA"}
                                  </div>
                                </div>
                                <div className="row farmerinforow">
                                  <div className="col-xs-6 farmerinforowtitle">
                                    VFD sno
                                  </div>
                                  <div className="col-xs-6">
                                    {item.vfdSno || "NA"}
                                  </div>
                                </div>
                                <div className="row farmerinforow">
                                  <div className="col-xs-6 farmerinforowtitle">
                                    VFD vendor id
                                  </div>
                                  <div className="col-xs-6">
                                    {item.vfdVendorId || "NA"}
                                  </div>
                                </div>
                                <div className="row farmerinforow">
                                  <div className="col-xs-6 farmerinforowtitle">
                                    IMEI
                                  </div>
                                  <div className="col-xs-6">
                                    {item.imei || "NA"}
                                  </div>
                                </div>
                                <div className="row farmerinforow">
                                  <div className="col-xs-6 farmerinforowtitle">
                                    Depth
                                  </div>
                                  <div className="col-xs-6">
                                    {item.depth || "NA"}
                                  </div>
                                </div>
                                {/* <div className="row farmerinforow">
                                  <div className="col-xs-6 farmerinforowtitle">
                                    Rms availability
                                  </div>
                                  <div className="col-xs-6">
                                    {item.rmsAvailabity || "NA"}
                                  </div>
                                </div> */}
                              </div>
                            </div>
                            <div className="col-md-1" />
                            <div className="col-md-5">
                              <div className="kycbody">
                                <div className="row farmerinforow">
                                  <div className="col-xs-6 farmerinforowtitle">
                                    Device id
                                  </div>
                                  <div className="col-xs-6">
                                    {item.deviceId || "NA"}
                                  </div>
                                </div>
                                <div className="row farmerinforow">
                                  <div className="col-xs-6 farmerinforowtitle">
                                    Panel make
                                  </div>
                                  <div className="col-xs-6">
                                    {item.panelMake || "NA"}
                                  </div>
                                </div>
                                <div className="row farmerinforow">
                                  <div className="col-xs-6 farmerinforowtitle">
                                    Panel WP
                                  </div>
                                  <div className="col-xs-6">
                                    {item.panelWp || "NA"}
                                  </div>
                                </div>
                                <div className="row farmerinforow">
                                  <div className="col-xs-6 farmerinforowtitle">
                                    Pump make
                                  </div>
                                  <div className="col-xs-6">
                                    {item.pumpMake || "NA"}
                                  </div>
                                </div>
                                <div className="row farmerinforow">
                                  <div className="col-xs-6 farmerinforowtitle">
                                    Pump sno
                                  </div>
                                  <div className="col-xs-6">
                                    {item.pumpSno || "NA"}
                                  </div>
                                </div>
                                <div className="row farmerinforow">
                                  <div className="col-xs-6 farmerinforowtitle">
                                    Pump type
                                  </div>
                                  <div className="col-xs-6">
                                    {item.pumpType || "NA"}
                                  </div>
                                </div>
                                <div className="row farmerinforow">
                                  <div className="col-xs-6 farmerinforowtitle">
                                    Pump capability
                                  </div>
                                  <div className="col-xs-6">
                                    {item.pumpCapability || "NA"}
                                  </div>
                                </div>
                                <div className="row farmerinforow">
                                  <div className="col-xs-6 farmerinforowtitle">
                                    Power type
                                  </div>
                                  <div className="col-xs-6">
                                    {item.powerType || "NA"}
                                  </div>
                                </div>
                                <div className="row farmerinforow">
                                  <div className="col-xs-6 farmerinforowtitle">
                                    Registration source
                                  </div>
                                  <div className="col-xs-6">
                                    {item.registrationSource || "NA"}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>

                <div role="tabpanel" className="tab-pane" id="family">
                  <div className="col-md-5">
                    <div className="kycbody">
                      <div className="row farmerinforow">
                        <div className="col-xs-6 farmerinforowtitle">
                          No of dependants
                        </div>
                        <div className="col-xs-6">
                          {this.props.famerinfo.numberOfDependents || "NA"}
                        </div>
                      </div>
                      <div className="row farmerinforow">
                        <div className="col-xs-6 farmerinforowtitle">
                          No of siblings
                        </div>
                        <div className="col-xs-6">
                          {this.props.famerinfo.numberOfSiblings || "NA"}
                        </div>
                      </div>
                      <div className="row farmerinforow">
                        <div className="col-xs-6 farmerinforowtitle">
                          Profession of father
                        </div>
                        <div className="col-xs-6">
                          {this.props.famerinfo.fathersProfession || "NA"}
                        </div>
                      </div>
                      <div className="row farmerinforow">
                        <div className="col-xs-6 farmerinforowtitle">
                          Education level of farmer
                        </div>
                        <div className="col-xs-6">
                          {this.props.famerinfo.highestEducation || "NA"}
                        </div>
                      </div>
                      <div className="row farmerinforow">
                        <div className="col-xs-6 farmerinforowtitle">
                          Age when started farming
                        </div>
                        <div className="col-xs-6">
                          {this.props.famerinfo.farmingStartedAt || "NA"}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div role="tabpanel" className="tab-pane" id="crop">
                  ...
                </div>
                <div role="tabpanel" className="tab-pane" id="images">
                  ...
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Farmereditshow;
