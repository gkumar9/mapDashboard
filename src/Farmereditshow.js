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
                  {/* <div className="row">
                      <div className="col-xs-8">
                        <span style={{ fontSize: "1.4em" }}>
                          {this.props.famerinfo.name}
                        </span>
                      </div>
                    </div> */}
                  <div className="row">
                    <div className="col-xs-8">
                      <span>
                        {this.props.famerinfo.fatherName && (
                          <span>S/O {this.props.famerinfo.fatherName}, </span>
                        )}

                        {this.props.famerinfo.gender}
                      </span>
                    </div>
                  </div>
                  <div className="row">
                    {/* <div className="col-xs-6">Contact No</div> */}
                    <div className="col-xs-8">
                      {this.props.famerinfo.contactNo !== "N.A" &&
                        this.props.famerinfo.contactNo !== "" && (
                          <span>+91{this.props.famerinfo.contactNo}</span>
                        )}
                    </div>
                  </div>
                </div>
                {/* <div className="col-sm-1" /> */}
                <div className="col-sm-4">
                  <div className="row"> </div>
                  <div className="row">
                    <div className="col-xs-12">
                      {this.props.famerinfo.uidType} :{" "}
                      {this.props.famerinfo.uid}
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-xs-12">
                      <span>DOB:{this.props.famerinfo.dob}</span>
                    </div>
                  </div>
                </div>
                {/* <div className="col-sm-3" /> */}
              </div>
            </div>
          </div>
          <div className="row farmerinfobody">
            <div>
              <div className="col-md-5">
                <div className="row farmerinforow">
                  <div className="col-xs-6 farmerinforowtitle">Vertical</div>
                  <div className="col-xs-6">
                    {this.props.famerinfo.vertical}
                  </div>
                </div>
                <div className="row farmerinforow">
                  <div className="col-xs-6 farmerinforowtitle">
                    Intervention Size
                  </div>
                  <div className="col-xs-6">
                    {this.props.famerinfo.interventionSize}
                  </div>
                </div>
                <div className="row farmerinforow">
                  <div className="col-xs-6 farmerinforowtitle">Reg. Date</div>
                  <div className="col-xs-6">
                    {this.props.famerinfo.farmerRegDate}
                  </div>
                </div>
                <div className="row farmerinforow">
                  <div className="col-xs-6 farmerinforowtitle">
                    Govt. Card Holder
                  </div>
                  <div className="col-xs-6">
                    {this.props.famerinfo.govtCardHolder}
                  </div>
                </div>
                <div className="row farmerinforow">
                  <div className="col-xs-6 farmerinforowtitle">
                    Total Land Size
                  </div>
                  <div className="col-xs-6">
                    {this.props.famerinfo.totalLandSize} Sq. Ft.
                  </div>
                </div>
                <div className="row farmerinforow">
                  <div className="col-xs-6 farmerinforowtitle">
                    Income From Land
                  </div>
                  <div className="col-xs-6">
                    {this.props.famerinfo.incomeFromLand}
                  </div>
                </div>
                <div className="row farmerinforow">
                  <div className="col-xs-6 farmerinforowtitle">Latitude</div>
                  <div className="col-xs-6">
                    {this.props.famerinfo.latitude}
                  </div>
                </div>
                <div className="row farmerinforow">
                  <div className="col-xs-6 farmerinforowtitle">Longitude</div>
                  <div className="col-xs-6">
                    {this.props.famerinfo.longitude}
                  </div>
                </div>
                <div className="row farmerinforow">
                  <div className="col-xs-6 farmerinforowtitle">
                    Informer Name
                  </div>
                  <div className="col-xs-6">
                    {this.props.famerinfo.farmerInfoInformerName}
                  </div>
                </div>
              </div>
              <div className="col-md-1" />
              <div className="col-md-5">
                <div className="row farmerinforow">
                  <div className="col-xs-6 farmerinforowtitle">State</div>
                  <div className="col-xs-6">{this.props.famerinfo.state}</div>
                </div>
                <div className="row farmerinforow">
                  <div className="col-xs-6 farmerinforowtitle">District</div>
                  <div className="col-xs-6">
                    {this.props.famerinfo.district}
                  </div>
                </div>
                <div className="row farmerinforow">
                  <div className="col-xs-6 farmerinforowtitle">Block</div>
                  <div className="col-xs-6">{this.props.famerinfo.block}</div>
                </div>
                <div className="row farmerinforow">
                  <div className="col-xs-6 farmerinforowtitle">Community</div>
                  <div className="col-xs-6">
                    {this.props.famerinfo.community}
                  </div>
                </div>
                <div className="row farmerinforow">
                  <div className="col-xs-6 farmerinforowtitle">
                    Sub-community
                  </div>
                  <div className="col-xs-6">
                    {this.props.famerinfo.subCommunity}
                  </div>
                </div>
                <div className="row farmerinforow">
                  <div className="col-xs-6 farmerinforowtitle">Village</div>
                  <div className="col-xs-6">{this.props.famerinfo.village}</div>
                </div>
                <div className="row farmerinforow">
                  <div className="col-xs-6 farmerinforowtitle">Pincode</div>
                  <div className="col-xs-6">{this.props.famerinfo.pincode}</div>
                </div>
                <div className="row farmerinforow">
                  <div className="col-xs-6 farmerinforowtitle">House Type</div>
                  <div className="col-xs-6">
                    {this.props.famerinfo.houseType}
                  </div>
                </div>
                <div className="row farmerinforow">
                  <div className="col-xs-6 farmerinforowtitle">Status</div>
                  <div className="col-xs-6">
                    {this.props.famerinfo.entryStatus}
                  </div>
                </div>
              </div>

              {/* <ul
                class="nav nav-tabs"
                role="tablist"
                style={{ borderBottom: "0" }}
              >
                <li role="presentation" class="active">
                  <a
                    style={{ color: "rgb(102, 102, 102)" }}
                    href="#profile"
                    aria-controls="profile"
                    role="tab"
                    data-toggle="tab"
                  >
                    KYC of Farmer
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
                    Crop details
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
                class="tab-content"
                style={{
                  padding: "1em",
                  maxHeight: "60vh",
                  overflow: "scroll"
                }}
              >
                <div role="tabpanel" class="tab-pane active" id="profile">
                  </div>
                <div role="tabpanel" class="tab-pane" id="crop">
                  ...
                </div>
                <div role="tabpanel" class="tab-pane" id="images">
                  ...
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Farmereditshow;
