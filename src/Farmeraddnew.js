import React, { Component } from "react";
import statedistrict from "./state_json.js";
import axios from "axios";
import config from "./config.js";
import Swal from "sweetalert2";
import AWS from "aws-sdk";
// const $ = require("jquery");

AWS.config.region = "ap-south-1";
AWS.config.credentials = new AWS.CognitoIdentityCredentials({
  IdentityPoolId: "ap-south-1:8616b2f3-782b-42af-b051-dea274f9e16f"
});
const s3 = new AWS.S3({
  apiVersion: "2006-03-01",
  params: { Bucket: "claro-farmers" }
});

class Farmeraddnew extends Component {
  constructor(props) {
    super(props);
    this.state = { famerinfo: {}, backupinfo: {} };
    this.fileInput1 = React.createRef();
  }
  handlecancelfarmer = () => {
    this.setState({ famerinfo: Object.assign({}, this.state.backupinfo) });
    document.getElementById("showsidetab").style.display = "none";
    document.getElementById("showsidetabeditfarmer").style.display = "none";
    document.getElementById("farmeraddnew").style.display = "none";
    this.props.getfarmer();
  };
  handleInputChange = event => {
    event.persist();
    let temp = this.state.famerinfo;
    temp[event.target.name] = event.target.value;
    this.setState({ famerinfo: temp });
  };
  handleChangeimage = () => {
    var file = this.fileInput1.current.files[0];
    var fileName = +this.state.famerinfo.id + "-" + Date.now();
    // var albumPhotosKey = encodeURIComponent(albumName) + '//';
    let self = this;
    var photoKey = fileName;
    s3.upload(
      {
        Key: photoKey,
        Body: file,
        ACL: "public-read"
      },
      function(err, data) {
        if (err) {
          return alert(
            "There was an error uploading your photo: ",
            err.message
          );
        } else {
          let temp = self.state.famerinfo;
          temp.farmerImage = data.Location;
          self.setState({ famerinfo: temp });
          alert("Img uploaded succesfully");
        }
      }
    );
  };
  handleeditfarmersave = () => {
    delete this.state.famerinfo["modificationTime"];
    delete this.state.famerinfo["id"];
    if (
      this.state.famerinfo.name &&
      this.state.famerinfo.name.replace(/\s/g, "").length !== 0 &&
      this.state.famerinfo.gender &&
      this.state.famerinfo.gender.replace(/\s/g, "").length !== 0 &&
      this.state.famerinfo.entryStatus &&
      this.state.famerinfo.entryStatus.replace(/\s/g, "").length !== 0 &&
      this.state.famerinfo.vertical &&
      this.state.famerinfo.vertical.replace(/\s/g, "").length !== 0 &&
      this.state.famerinfo.latitude &&
      this.state.famerinfo.latitude.replace(/\s/g, "").length !== 0 &&
      this.state.famerinfo.longitude &&
      this.state.famerinfo.longitude.replace(/\s/g, "").length !== 0 &&
      this.state.famerinfo.state &&
      this.state.famerinfo.state.replace(/\s/g, "").length !== 0 &&
      this.state.famerinfo.district &&
      this.state.famerinfo.district.replace(/\s/g, "").length !== 0
    ) {
      if (
        this.state.famerinfo.latitude > 37 ||
        this.state.famerinfo.latitude < 8
      ) {
        alert("Please set valid Latitude value.(Lattitude - 8′N to 37′N)");
        let temp = this.state.famerinfo;
        temp["latitude"] = 0;
        this.setState({ famerinfo: temp });
        return;
      }
      if (
        this.state.famerinfo.longitude > 97 ||
        this.state.famerinfo.longitude < 68
      ) {
        alert("Please set valid Longitude value.(Longitude - 68′E to 97′E)");
        let temp = this.state.famerinfo;
        temp["longitude"] = 0;
        this.setState({ famerinfo: temp });
        return;
      }
      if (this.state.famerinfo.contactNo !== "") {
        if (
          this.state.famerinfo.contactNo.length !== 10 ||
          (this.state.famerinfo.contactNo.charAt(0) !== "9" &&
            this.state.famerinfo.contactNo.charAt(0) !== "8" &&
            this.state.famerinfo.contactNo.charAt(0) !== "7" &&
            this.state.famerinfo.contactNo.charAt(0) !== "6")
        ) {
          alert(
            "Please set valid Contact Number(10 digit starting with 9/8/7)"
          );
          // let temp = this.state.famerinfo;
          // temp['conta'] = 0;
          // this.setState({ famerinfo: temp });
          return;
        }
      }
      axios({
        url: config.addfarmernew,
        method: "POST",
        data: this.state.famerinfo,
        headers: {
          "Content-Type": "application/json"
        }
      })
        .then(res => {
          // console.log(res);
          if (res.data.data !== null && res.data.data.result) {
            this.setState({
              famerinfo: Object.assign({}, this.state.backupinfo)
            });
            Swal({
              type: "success",
              title: "Successfully data updated"
              // text: res.data.error.errorMsg
            });
            window.location.reload();
          } else {
            alert(res.data.error.errorMsg);
          }
        })
        .catch(e => {
          console.log(e);
        });
    } else {
      Swal({
        type: "error",
        title: "Fill valid input in all mandatory fields"
        // text: res.data.error.errorMsg
      });
    }
  };
  componentDidMount() {
    if(this.state.famerinfo==={}){
      axios({
        url: config.getfarmerschema,
        method: "POST",
        data: {
          temp: "temp"
        },
        headers: {
          "Content-Type": "application/json"
        }
      })
        .then(res => {
          // console.log(res.data);
          res.data.data.gender = "M";
          res.data.data.entryStatus = "ACTIVE";
          res.data.data.state = "Tripura";
          res.data.data.district = "Unakoti";
          res.data.data.vertical = "Solar Irrigation Pump";
          res.data.data.contactNo = "";
          this.setState({
            famerinfo: res.data.data,
            backupinfo: Object.assign({}, res.data.data)
          });
        })
        .catch(e => {
          console.log(e);
        });
    }
    
  }
  render() {
    return (
      <div id="farmeraddnew" style={{ display: "none" }}>
        <div
          style={{
            maxHeight: "90vh",
            overflow: "scroll"
          }}
        >
          <div className="container">
            <div className="row farmerinfoheader ">
              <div className="col-sm-4">
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
                      {/* {this.state.famerinfo.name} */}
                      <input
                        name="name"
                        type="text"
                        className="form-control"
                        id="name"
                        value={this.state.famerinfo.name|| ""}
                        onChange={this.handleInputChange}
                        placeholder="Name"
                        required
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
                      onChange={this.handleInputChange}
                      value={this.state.famerinfo.vertical ||"NA"}
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
                      <option value="NA">
                        NA
                      </option>
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
                        onChange={this.handleInputChange}
                        value={this.state.famerinfo.gender ||'NA'}
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
                        onChange={this.handleInputChange}
                        value={this.state.famerinfo.entryStatus||'ACTIVE'}
                        className="form-control"
                        id="sel3"
                      >
                        <option value="ACTIVE">ACTIVE</option>
                        <option value="INACTIVE">INACTIVE</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-sm-1" />
              <div className="col-sm-4 ">
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
                      onChange={this.handleInputChange}
                      value={this.state.famerinfo.state ||"NA"}
                      className="form-control"
                      id="state"
                    >
                      {Object.keys(statedistrict).map(item => (
                        <option key={item} value={item}>
                          {item}
                        </option>
                      ))}
                      <option value="NA">
                          NA
                        </option>
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
                    {this.state.famerinfo.state !== null &&
                      this.state.famerinfo.state !== undefined && (
                        <select
                          name="district"
                          onChange={this.handleInputChange}
                          value={this.state.famerinfo.district||"NA"}
                          className="form-control"
                          id="district"
                        >
                          {statedistrict[this.state.famerinfo.state].map(
                            item => (
                              <option key={item} value={item}>
                                {item}
                              </option>
                            )
                          )}
                           <option value="NA">
                          NA
                        </option>
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
                      type="number"
                      className="form-control"
                      id="latitude"
                      value={this.state.famerinfo.latitude || ""}
                      onChange={this.handleInputChange}
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
                      value={this.state.famerinfo.longitude || ""}
                      onChange={this.handleInputChange}
                      placeholder="Longitude"
                      required
                    />
                  </div>
                </div>
              </div>
              <div className="col-sm-3">
                <div className="row">
                  <button
                    onClick={this.handleeditfarmersave}
                    type="submit"
                    className=" btn btn-default"
                    aria-label="Right Align"
                    style={{
                      // display: "none",
                      width: "35%",
                      borderRadius: "0px",
                      borderColor: "darkgray",
                      float: "left",
                      outline: "none",
                      backgroundColor: "blue",
                      color: "white"
                    }}
                  >
                    Save
                  </button>
                  <button
                    onClick={this.handlecancelfarmer}
                    type="button"
                    className="cancelbutton btn btn-default"
                    aria-label="Right Align"
                    style={{
                      // display: "none",
                      width: "35%",
                      borderRadius: "0px",
                      marginLeft: "1em",
                      borderColor: "blue",
                      // float: "right",
                      outline: "none",
                      backgroundColor: "white",
                      color: "blue"
                    }}
                  >
                    Cancel
                  </button>
                </div>
                <div className="row" style={{ marginTop: "3em" }}>
                  <label>
                    <b>Upload Image:</b>
                    <input
                      onChange={this.handleChangeimage}
                      type="file"
                      ref={this.fileInput1}
                      style={{ width: "-webkit-fill-available" }}
                    />
                  </label>
                </div>
              </div>
            </div>

            <div className="row farmerinfobody">
              <div className="col-md-4">
                <div className="row farmerinforow">
                  <div className="col-xs-6 farmerinforowtitle">Contact No</div>
                  <div className="col-xs-6">
                    <input
                      name="contactNo"
                      type="number"
                      className="form-control"
                      id="contactno"
                      value={this.state.famerinfo.contactNo|| ""}
                      onChange={this.handleInputChange}
                      placeholder="Contact Number "
                    />
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
                      value={this.state.famerinfo.fatherName|| ""}
                      onChange={this.handleInputChange}
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
                      value={this.state.famerinfo.interventionSize|| ""}
                      onChange={this.handleInputChange}
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
                      value={this.state.famerinfo.farmerRegDate || ""}
                      onChange={this.handleInputChange}
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
                      value={this.state.famerinfo.govtCardHolder|| ""}
                      onChange={this.handleInputChange}
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
                      type="text"
                      className="form-control"
                      id="totalLandSize"
                      value={this.state.famerinfo.totalLandSize|| ""}
                      onChange={this.handleInputChange}
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
                      type="text"
                      className="form-control"
                      id="incomeFromLand"
                      value={this.state.famerinfo.incomeFromLand|| ""}
                      onChange={this.handleInputChange}
                      placeholder="Income From Land in rupee"
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
                      value={this.state.famerinfo.dob || ""}
                      onChange={this.handleInputChange}
                      placeholder="DOB"
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
                        onChange={this.handleInputChange}
                        value={this.state.famerinfo.uidType || "NA"}
                        className="form-control"
                        id="sel2"
                      >
                        <option value="AADHAAR">AADHAAR</option>
                        <option value="VOTER ID">VOTER ID</option>
                        <option value="LICENSE">LICENSE</option>
                        <option value="PAYGO">PAYGO</option>
                        <option value="CLARO ID">CLARO ID</option>
                        <option value="OTHERS">OTHERS</option>
                        <option value="NA">NA</option>
                      </select>
                    </div>
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
                      value={this.state.famerinfo.uid|| ""}
                      onChange={this.handleInputChange}
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
                      value={this.state.famerinfo.block|| ""}
                      onChange={this.handleInputChange}
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
                      value={this.state.famerinfo.community|| ""}
                      onChange={this.handleInputChange}
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
                      value={this.state.famerinfo.subCommunity|| ""}
                      onChange={this.handleInputChange}
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
                      value={this.state.famerinfo.village|| ""}
                      onChange={this.handleInputChange}
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
                      value={this.state.famerinfo.pincode|| ""}
                      onChange={this.handleInputChange}
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
                      value={this.state.famerinfo.houseType|| ""}
                      onChange={this.handleInputChange}
                      placeholder="House Type"
                    />
                  </div>
                </div>
                
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Farmeraddnew;
