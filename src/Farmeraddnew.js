import React, { Component } from "react";
import statedistrict from "./state_json.js";
import axios from "axios";
import config from "./config.js";
import Swal from "sweetalert2";
import AWS from "aws-sdk";
const $ = require("jquery");
// import { stat } from "fs";
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
    this.state = {
      famerinfo: undefined,
      backupinfo: undefined,
      cropschema: undefined
    };
    this.fileInput = [
      React.createRef(),
      React.createRef(),
      React.createRef(),
      React.createRef()
    ];
  }
  handlecancelfarmer = () => {
    this.setState({ famerinfo: Object.assign({}, this.state.backupinfo) });
    document.getElementById("showsidetab").style.display = "none";
    document.getElementById("showsidetabeditfarmer").style.display = "none";
    document.getElementById("farmeraddnew").style.display = "none";
    
    var listItems = $(".list-group-item"); //Select all list items

      //Remove 'active' tag for all list items
      for (let i = 0; i < listItems.length; i++) {
        listItems[i].classList.remove("active");
      }
      this.fileInput = [
        React.createRef(),
        React.createRef(),
        React.createRef(),
        React.createRef()
      ];
      this.props.getfarmer();
  };
  handleInputChange = event => {
    event.persist();
    let temp = this.state.famerinfo;
    temp[event.target.name] = event.target.value;
    if(event.target.name==='state'){
      temp.district=statedistrict[event.target.value][0]
    }
    
    this.setState({ famerinfo: temp });
  };
  crophandleInputChange = (index, event) => {
    event.persist();
    let temp = this.state.famerinfo;
    temp.croplist[index][event.target.name] = event.target.value;
    this.setState({ famerinfo: temp });
  };
  // handleChangeimage = () => {
  //   var file = this.fileInput1.current.files[0];
  //   var fileName = +this.state.famerinfo.id + "-" + Date.now();
  //   // var albumPhotosKey = encodeURIComponent(albumName) + '//';
  //   let self = this;
  //   var photoKey = fileName;
  //   s3.upload(
  //     {
  //       Key: photoKey,
  //       Body: file,
  //       ACL: "public-read"
  //     },
  //     function(err, data) {
  //       if (err) {
  //         return alert(
  //           "There was an error uploading your photo: ",
  //           err.message
  //         );
  //       } else {
  //         let temp = self.state.famerinfo;
  //         temp.farmerImage = data.Location;
  //         self.setState({ famerinfo: temp });
  //         alert("Img uploaded succesfully");
  //       }
  //     }
  //   );
  // };
  handleChangeimage = (index, mediaType) => {
    // console.log(event)
    // let refname=`fileInput${index}`
    var file = this.fileInput[index].current.files[0];
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

          // let temp = self.state.famerinfo;
          temp.imglist[index].link = data.Location;
          self.setState({ famerinfo: temp });
          alert("Img uploaded succesfully");
        }
      }
    );
  };
  handleeditfarmersavecroplist = async () => {
    let check=this.handleeditfarmersave();
    if(check){this.state.famerinfo.croplist.map((item, number) => {
      if (
        item.name &&
        item.name.replace(/\s/g, "").length !== 0 &&
        item.cropSeason &&
        item.cropSeason.replace(/\s/g, "").length !== 0 &&
        item.cropVariety &&
        item.cropVariety.replace(/\s/g, "").length !== 0 &&
        item.sowingMonth &&
        item.sowingMonth.replace(/\s/g, "").length !== 0 &&
        item.harvestingTime &&
        item.harvestingTime.replace(/\s/g, "").length !== 0 &&
        item.grownArea &&
        item.grownArea.replace(/\s/g, "").length !== 0
      ) {
        if (this.state.backupcroplist !== 0 && item !== undefined) {
          axios({
            url: config.addcrop,
            method: "POST",
            data: item,
            headers: {
              "Content-Type": "application/json"
            }
          })
            .then(res => {
              if (res.data.data !== null && res.data.data.result) {
                Swal({
                  type: "success",
                  title: "Successfully data updated"
                  // text: res.data.error.errorMsg
                });

                // this.setState({
                //   backupinfo: Object.assign({}, this.state.famerinfo)
                // });
              } else {
                alert(res.data.error.errorMsg);
                return;
              }
            })
            .catch(e => {
              Swal({
                type: "error",
                title: "Oops...",
                text: e
              });
            });
        } else if (this.state.backupcroplist === 0 && item !== undefined) {
          axios({
            url: config.addcrop,
            method: "POST",
            data: item,
            headers: {
              "Content-Type": "application/json"
            }
          })
            .then(res => {
              if (res.data.data !== null && res.data.data.result) {
                Swal({
                  type: "success",
                  title: "Successfully data updated"
                  // text: res.data.error.errorMsg
                });

                // this.setState({
                //   backupinfo: Object.assign({}, this.state.famerinfo)
                // });
              } else {
                alert(res.data.error.errorMsg);
                return;
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
          alert("error at crop save");
        }
      } else {
        Swal({
          type: "error",
          title: "Fill valid input in all mandatory fields"
          // text: res.data.error.errorMsg
        });
      }
    });}
    
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
        return false;
      }
      if (
        this.state.famerinfo.longitude > 97 ||
        this.state.famerinfo.longitude < 68
      ) {
        alert("Please set valid Longitude value.(Longitude - 68′E to 97′E)");
        let temp = this.state.famerinfo;
        temp["longitude"] = 0;
        this.setState({ famerinfo: temp });
        return false;
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
          return false;
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
            this.props.getfarmer();
            return true;
            // window.location.reload();
          } else {
            alert(res.data.error.errorMsg);
          }

          // if (res.data.data !== null && res.data.data.result) {
          //   this.state.famerinfo.pumplist.map(item =>
          //     axios({
          //       url: config.addrms,
          //       method: "POST",
          //       data: item,
          //       headers: {
          //         "Content-Type": "application/json"
          //       }
          //     })
          //       .then(res => {
          //         if (res.data.data !== null && res.data.data.result) {
          //         } else {
          //           alert(res.data.error.errorMsg);
          //           return;
          //         }
          //       })
          //       .catch(e => {
          //         Swal({
          //           type: "error",
          //           title: "Oops...",
          //           text: e
          //         });
          //       })
          //   );
          //   this.state.famerinfo.croplist.map(item =>
          //     axios({
          //       url: config.addcrop,
          //       method: "POST",
          //       data: item,
          //       headers: {
          //         "Content-Type": "application/json"
          //       }
          //     })
          //       .then(res => {
          //         if (res.data.data !== null && res.data.data.result) {
          //         } else {
          //           alert(res.data.error.errorMsg);
          //           return;
          //         }
          //       })
          //       .catch(e => {
          //         Swal({
          //           type: "error",
          //           title: "Oops...",
          //           text: e
          //         });
          //       })
          //   );

          //   Swal({
          //     type: "success",
          //     title: "Successfully data updated"
          //     // text: res.data.error.errorMsg
          //   });
          //   this.setState({
          //     famerinfo: Object.assign({}, this.state.backupinfo)
          //   });
          //   Swal({
          //     type: "success",
          //     title: "Successfully data updated"
          //     // text: res.data.error.errorMsg
          //   });
          //   window.location.reload();
          // } else {
          //   alert(res.data.error.errorMsg);
          //   return;
          // }
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
      return false;
    }
  };
  componentDidMount() {
    // if (this.state.cropschema === undefined) {
      this.setState({famerinfo:undefined,backupinfo:undefined})
      let cropschema;
    axios({
      url: config.getcropschema,
      method: "POST",
      data: {
        temp: "temp"
      },
      headers: {
        "Content-Type": "application/json"
      }
    }).then(res => {
      cropschema=res.data.data
      this.setState({ cropschema: res.data.data });
    });
    // }

    // if (this.state.famerinfo === undefined) {
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
        res.data.data.gender = "M";
        res.data.data.entryStatus = "ACTIVE";
        res.data.data.state = "Tripura";
        res.data.data.uidType = "NA";
        res.data.data.district = "Unakoti";
        res.data.data.vertical = "Solar Irrigation Pump";
        res.data.data.contactNo = "";
        
        
        res.data.data["croplist"] = [cropschema];
        
        let imgobject = [
          {
            mediaType: "Profile Pic",
            link: "https://via.placeholder.com/500",
            // farmerId: this.state.famerinfo.id,
            type: "image",
            modifiedBy: "0"
          },
          {
            mediaType: "Public Pic",
            link: "https://via.placeholder.com/500",
            // farmerId: this.state.famerinfo.id,
            type: "image",
            modifiedBy: "0"
          },
          {
            mediaType: "Farm Pic",
            link: "https://via.placeholder.com/500",
            // farmerId: this.state.famerinfo.id,
            type: "image",
            modifiedBy: "0"
          },
          {
            mediaType: "Crop Pic",
            link: "https://via.placeholder.com/500",
            // farmerId: this.state.famerinfo.id,
            type: "image",
            modifiedBy: "0"
          }
        ];

        res.data.data["imglist"] = imgobject;
        this.setState({
          famerinfo: res.data.data,
          backupinfo: Object.assign({}, res.data.data)
        });
      })
      .catch(e => {
        console.log(e);
      });
    // }
  }
  render() {
    return (
      <div className="farmerinfobody">
        {this.state.famerinfo !== undefined && (
          <div id="farmeraddnew" style={{ display: "none" }}>
            <div
              style={{
                maxHeight: "90vh",
                overflow: "scroll"
                // display: "none"
              }}
              className="farmerinfobody"
            >
              <ul className="nav nav-tabs" role="tablist">
                <li role="presentation" className="active">
                  <a
                    style={{ color: "black" }}
                    href="#profile11"
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
                    href="#family11"
                    aria-controls="family1"
                    role="tab"
                    data-toggle="tab"
                  >
                    {/* {this.state.famerinfo.vertical}  */}
                    Family
                  </a>
                </li>
                <li role="presentation">
                  <a
                    style={{ color: "black" }}
                    href="#crop11"
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
                    href="#images11"
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
                  overflow: "scroll"
                }}
              >
                <div role="tabpanel" className="tab-pane active" id="profile11">
                  <div
                    className="row kycbody"
                    style={{ margin: "0.7em 0.1em" }}
                  >
                    {/* <div className="row" style={{ margin: "0.7em 0" }}> */}
                    <div className="col-xs-9">
                      <h3 style={{ marginTop: "5px" }}>Primary</h3>
                    </div>
                    <div
                      className="col-xs-3"
                      style={{ display: "flex", justifyContent: "flex-end" }}
                    >
                      <button
                        onClick={this.handleeditfarmersave}
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
                        onClick={this.handlecancelfarmer}
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
                  <div
                    className="row kycbody"
                    style={{ margin: "0.7em 0.1em" }}
                  >
                    <div className="col-md-5">
                      <div className="kycbody">
                        <div className="row farmerinforow">
                          <div className="col-xs-6 farmerinforowtitle">
                            <span>
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
                            </span>
                          </div>
                          <div className="col-xs-6">
                            <input
                              name="name"
                              type="text"
                              className="form-control"
                              id="name"
                              value={this.state.famerinfo.name || ""}
                              onChange={this.handleInputChange}
                              placeholder="Name"
                            />
                          </div>
                        </div>
                        <div className="row farmerinforow">
                          <div className="col-xs-6 farmerinforowtitle">
                            Status{" "}
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
                            <div>
                              <select
                                name="entryStatus"
                                onChange={this.handleInputChange}
                                value={
                                  this.state.famerinfo.entryStatus || "ACTIVE"
                                }
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
                      value={this.state.famerinfo.entryStatus}
                      onChange={this.handleInputChange}
                      placeholder="Status"
                    /> */}
                          </div>
                        </div>
                        <div className="row farmerinforow">
                          <div className="col-xs-6 farmerinforowtitle">
                            Contact No{" "}
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
                            <input
                              name="contactNo"
                              type="number"
                              className="form-control"
                              id="contactno"
                              value={this.state.famerinfo.contactNo || ""}
                              onChange={this.handleInputChange}
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
                                style={{
                                  marginTop: "0.5em",
                                  marginLeft: "0.5em"
                                }}
                                className="fa fa-info-circle"
                                aria-hidden="true"
                              />
                            </span>
                          </div>
                          <div className="col-xs-6">
                            <div>
                              <select
                                name="uidType"
                                onChange={this.handleInputChange}
                                value={this.state.famerinfo.uidType}
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
                      value={this.state.famerinfo.uidType}
                      onChange={this.handleInputChange}
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
                                style={{
                                  marginTop: "0.5em",
                                  marginLeft: "0.5em"
                                }}
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
                              value={this.state.famerinfo.uid || ""}
                              onChange={this.handleInputChange}
                              placeholder="UID "
                            />
                          </div>
                        </div>
                        <div className="row farmerinforow">
                          <div className="col-xs-6 farmerinforowtitle">
                            Vertical{" "}
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
                              name="vertical"
                              onChange={this.handleInputChange}
                              value={this.state.famerinfo.vertical || "NA"}
                              className="form-control"
                              id="vertical"
                            >
                              <option value="Solar Irrigation Pump">
                                Solar Irrigation Pump
                              </option>
                              <option value="Solar Drinking Water Pump">
                                Solar Drinking Water Pump
                              </option>
                              <option value="Solar Mini Grid">
                                Solar Mini Grid
                              </option>
                              <option value="Solar Irrigation Service">
                                Solar Irrigation Service
                              </option>
                              <option value="NA">NA</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="row kycbody"
                    style={{ margin: "0.7em 0.1em" }}
                  >
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
                              style={{
                                marginTop: "0.5em",
                                marginLeft: "0.5em"
                              }}
                              className="fa fa-info-circle"
                              aria-hidden="true"
                            />
                          </div>
                          <div className="col-xs-6">
                            <div>
                              <select
                                name="gender"
                                onChange={this.handleInputChange}
                                value={this.state.famerinfo.gender || "NA"}
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
                              value={this.state.famerinfo.fatherName || ""}
                              onChange={this.handleInputChange}
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
                              type="text"
                              className="form-control"
                              id="alternateNumber"
                              value={this.state.famerinfo.alternateNumber || ""}
                              onChange={this.handleInputChange}
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
                              value={this.state.famerinfo.dob || ""}
                              onChange={this.handleInputChange}
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
                              value={this.state.famerinfo.govtCardHolder || ""}
                              onChange={this.handleInputChange}
                              placeholder="Govt. Card Holder (Y/N)"
                            />
                          </div>
                        </div>
                        <div className="row farmerinforow">
                          <div className="col-xs-6 farmerinforowtitle">
                            BPL Card
                          </div>
                          <div className="col-xs-6">
                            <input
                              name="bplCard"
                              type="text"
                              className="form-control"
                              id="bplCard"
                              value={this.state.famerinfo.bplCard || ""}
                              onChange={this.handleInputChange}
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
                              value={this.state.famerinfo.houseType || ""}
                              onChange={this.handleInputChange}
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
                              value={this.state.famerinfo.totalLandSize || ""}
                              onChange={this.handleInputChange}
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
                              value={this.state.famerinfo.incomeFromLand || ""}
                              onChange={this.handleInputChange}
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
                          <div className="col-xs-6 farmerinforowtitle">
                            State{" "}
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
                              name="state"
                              onChange={this.handleInputChange}
                              value={this.state.famerinfo.state || "NA"}
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
                              style={{
                                marginTop: "0.5em",
                                marginLeft: "0.5em"
                              }}
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
                                  value={this.state.famerinfo.district || "NA"}
                                  className="form-control"
                                  id="district"
                                >
                                  {statedistrict[
                                    this.state.famerinfo.state
                                  ].map(item => (
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
                            Block
                          </div>
                          <div className="col-xs-6">
                            <input
                              name="block"
                              type="text"
                              className="form-control"
                              id="block"
                              value={this.state.famerinfo.block || ""}
                              onChange={this.handleInputChange}
                              placeholder="Block"
                            />
                          </div>
                        </div>
                        <div className="row farmerinforow">
                          <div className="col-xs-6 farmerinforowtitle">
                            Community
                          </div>
                          <div className="col-xs-6">
                            <input
                              name="community"
                              type="text"
                              className="form-control"
                              id="community"
                              value={this.state.famerinfo.community || ""}
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
                              value={this.state.famerinfo.subCommunity || ""}
                              onChange={this.handleInputChange}
                              placeholder="Sub Community"
                            />
                          </div>
                        </div>
                        <div className="row farmerinforow">
                          <div className="col-xs-6 farmerinforowtitle">
                            Village
                          </div>
                          <div className="col-xs-6">
                            <input
                              name="village"
                              type="text"
                              className="form-control"
                              id="village"
                              value={this.state.famerinfo.village || ""}
                              onChange={this.handleInputChange}
                              placeholder="Village"
                            />
                          </div>
                        </div>
                        <div className="row farmerinforow">
                          <div className="col-xs-6 farmerinforowtitle">
                            Pincode
                          </div>
                          <div className="col-xs-6">
                            <input
                              name="pincode"
                              type="number"
                              className="form-control"
                              id="pincode"
                              value={this.state.famerinfo.pincode || ""}
                              onChange={this.handleInputChange}
                              placeholder="Pincode"
                            />
                          </div>
                        </div>
                        <div className="row farmerinforow">
                          <div className="col-xs-6 farmerinforowtitle">
                            Latitude{" "}
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
                            <input
                              name="latitude"
                              max="8"
                              min="36"
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
                              style={{
                                marginTop: "0.5em",
                                marginLeft: "0.5em"
                              }}
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
                    </div>
                  </div>
                </div>

                <div role="tabpanel" className="tab-pane" id="family11">
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
                                this.state.famerinfo.numberOfDependents || ""
                              }
                              onChange={this.handleInputChange}
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
                              value={
                                this.state.famerinfo.numberOfSiblings || ""
                              }
                              onChange={this.handleInputChange}
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
                              value={
                                this.state.famerinfo.fathersProfession || ""
                              }
                              onChange={this.handleInputChange}
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
                              value={
                                this.state.famerinfo.highestEducation || ""
                              }
                              onChange={this.handleInputChange}
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
                              value={
                                this.state.famerinfo.farmingStartedAt || ""
                              }
                              onChange={this.handleInputChange}
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
                        onClick={this.handleeditfarmersave}
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
                        onClick={this.handlecancelfarmer}
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
                <div role="tabpanel" className="vertical tab-pane" id="crop11">
                  {this.state.famerinfo !== undefined &&
                  this.state.famerinfo.croplist !== undefined &&
                  this.state.famerinfo.croplist.length !== 0 ? (
                    <div>
                      <ul
                        className=" nav nav-tabs"
                        role="tablist"
                        style={{ marginTop: "8px" }}
                      >
                        <li role="presentation" className="active">
                          <a
                            href="#new"
                            aria-controls="new"
                            role="tab"
                            data-toggle="tab"
                          >
                            Crop
                          </a>
                        </li>
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
                            onClick={this.handleeditfarmersavecroplist}
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
                            onClick={this.handlecancelfarmer}
                            type="button"
                            className="cancelbutton btn btn-default"
                            aria-label="Right Align"
                            id="drillUp"
                            style={{
                              // display: "none",
                              width: "47%",
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
                      <div className="tab-content">
                        {this.state.famerinfo.croplist !== undefined &&
                          this.state.famerinfo.croplist.map((item, index) => (
                            <div
                              key={item}
                              role="tabpanel"
                              className="vertical tab-pane active"
                              id="new"
                            >
                              {item !== undefined && (
                                <div>
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
                                            onChange={this.crophandleInputChange.bind(
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
                                          <input
                                            name="cropSeason"
                                            type="text"
                                            className="form-control"
                                            id="cropSeason"
                                            value={item.cropSeason || ""}
                                            onChange={this.crophandleInputChange.bind(
                                              this,
                                              index
                                            )}
                                            placeholder="Crop Season"
                                          />
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
                                            onChange={this.crophandleInputChange.bind(
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
                                          <input
                                            name="sowingMonth"
                                            type="text"
                                            className="form-control"
                                            id="sowingMonth"
                                            value={item.sowingMonth || ""}
                                            onChange={this.crophandleInputChange.bind(
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
                                          <input
                                            name="harvestingTime"
                                            type="text"
                                            className="form-control"
                                            id="harvestingTime"
                                            value={item.harvestingTime || ""}
                                            onChange={this.crophandleInputChange.bind(
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
                                            onChange={this.crophandleInputChange.bind(
                                              this,
                                              index
                                            )}
                                            placeholder="Estimate Yield"
                                          />
                                        </div>
                                      </div>
                                      <div className="row farmerinforow">
                                        <div className="col-xs-6 farmerinforowtitle">
                                          Grown area{" "}
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
                                            type="text"
                                            className="form-control"
                                            id="grownArea"
                                            value={item.grownArea || ""}
                                            onChange={this.crophandleInputChange.bind(
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
                                            onChange={this.crophandleInputChange.bind(
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
                              )}
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
                <div role="tabpanel" className="tab-pane" id="images11">
                  {this.state.famerinfo !== undefined &&
                  this.state.famerinfo.imglist !== undefined &&
                  this.state.famerinfo.imglist.length !== 0 ? (
                    <div style={{ padding: "1em" }}>
                      {this.state.famerinfo.imglist.map((item, number) => (
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
                                onChange={this.handleChangeimage.bind(
                                  this,
                                  number,
                                  item.mediaType
                                )}
                                type="file"
                                ref={this.fileInput[number]}
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
          </div>
        )}
      </div>
    );
  }
}

export default Farmeraddnew;
