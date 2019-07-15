import React, { Component } from "react";
import farmerimg from "./pins/user.png";

class Farmereditshow extends Component {
  render() {    
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
                  // src={this.props.famerinfo.imglist!==undefined&&this.props.famerinfo.imglist.map((item)=>{if(item.mediaType==='Profile Pic'){return item.link}})}
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
                        width: "30%",
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
                    <div className="col-xs-8">
                      {this.props.famerinfo.contactNo !== "N.A" &&
                        this.props.famerinfo.contactNo !== "" && (
                          <span>+91{this.props.famerinfo.contactNo}</span>
                        )}
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-xs-12">
                      {this.props.famerinfo.uidType} :{" "}
                      {this.props.famerinfo.uid}
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-xs-12">
                      Status : {this.props.famerinfo.entryStatus || "NA"}
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-xs-12">
                      Vertical : {this.props.famerinfo.vertical || "NA"}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row farmerinfobody">
            <div>
              <ul className=" nav nav-tabs" role="tablist">
                <li role="presentation" className="active">
                  <a
                    style={{ color: "black" }}
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
                    style={{ color: "black" }}
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
                    style={{ color: "black" }}
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
                    style={{ color: "black" }}
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
                  overflowY: "scroll",
                  overflowX: "hidden"
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
                        <div className="col-xs-6 farmerinforowtitle">Intervention Size</div>
                        <div className="col-xs-6">
                          {this.props.famerinfo.interventionSize || "NA"}
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
                          Total Land Size
                        </div>
                        <div className="col-xs-6">
                          {this.props.famerinfo.totalLandSize || "NA"} ha
                        </div>
                      </div>
                      <div className="row farmerinforow">
                        <div className="col-xs-6 farmerinforowtitle">
                          Income from Land
                        </div>
                        <div className="col-xs-6">
                          {this.props.famerinfo.incomeFromLand || "NA"} Rs.
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
                <div role="tabpanel" className="tab-pane" id="family">
                  <div style={{marginTop:'20px'}} className="col-md-5">
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
                <div role="tabpanel" className="vertical tab-pane" id="crop">
                  {this.props.famerinfo !== undefined &&
                  this.props.famerinfo.croplist !== undefined &&
                  this.props.famerinfo.croplist.length !== 0 ? (
                    <div>
                      <ul className=" nav nav-tabs" role="tablist">
                        {this.props.famerinfo.croplist !== undefined &&
                          this.props.famerinfo.croplist.map((item, index) =>
                            index === 0 ? (
                              <li
                                key={index}
                                role="presentation"
                                className="active"
                              >
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
                              <li role="presentation">
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
                      </ul>
                      <div className="tab-content">
                        {this.props.famerinfo.croplist !== undefined &&
                          this.props.famerinfo.croplist.map((item, index) => (
                            <div
                              key={index}
                              role="tabpanel"
                              className="tab-pane active"
                              id={item.creationTime}
                            >
                              <div className="col-md-5">
                                <div className="kycbody">
                                  <div className="row farmerinforow">
                                    <div className="col-xs-6 farmerinforowtitle">
                                      Name
                                    </div>
                                    <div className="col-xs-6">
                                      {item.name || "NA"}
                                    </div>
                                  </div>
                                  <div className="row farmerinforow">
                                    <div className="col-xs-6 farmerinforowtitle">
                                      Crop season
                                    </div>
                                    <div className="col-xs-6">
                                      {item.cropSeason || "NA"}
                                    </div>
                                  </div>
                                  <div className="row farmerinforow">
                                    <div className="col-xs-6 farmerinforowtitle">
                                      Crop variety
                                    </div>
                                    <div className="col-xs-6">
                                      {item.cropVariety || "NA"}
                                    </div>
                                  </div>
                                  <div className="row farmerinforow">
                                    <div className="col-xs-6 farmerinforowtitle">
                                      Sowing month
                                    </div>
                                    <div className="col-xs-6">
                                      {item.sowingMonth || "NA"}
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
                                    <div className="col-xs-6">
                                      {item.harvestingTime || "NA"}
                                    </div>
                                  </div>
                                  <div className="row farmerinforow">
                                    <div className="col-xs-6 farmerinforowtitle">
                                      Estimated Yield
                                    </div>
                                    <div className="col-xs-6">
                                      {item.estimatedYield || "NA"}
                                    </div>
                                  </div>
                                  <div className="row farmerinforow">
                                    <div className="col-xs-6 farmerinforowtitle">
                                      Grown area
                                    </div>
                                    <div className="col-xs-6">
                                      {item.grownArea || "NA"}
                                    </div>
                                  </div>
                                  <div className="row farmerinforow">
                                    <div className="col-xs-6 farmerinforowtitle">
                                      Remark
                                    </div>
                                    <div className="col-xs-6">
                                      {item.remarks || "NA"}
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
                <div role="tabpanel" className="tab-pane" id="images">
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
                              <span style={{fontSize:'1.1em'}}>{item.mediaType}</span>
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
          </div>
        </div>
      </div>
    );
  }
}

export default Farmereditshow;
