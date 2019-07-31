import React, { Component } from "react";
import Header from "./Header.js";
import Sidebar from "./Sidebar.js";
import Farmereditshow from "./Farmereditshow.js";
import Farmeredit from "./FarmereditComponent.js";
import axios from "axios";
import { Link } from "react-router-dom";
import config from "./config.js";
import Swal from "sweetalert2";
import AWS from "aws-sdk";
import Farmeraddnew from "./Farmeraddnew.js";
import statedistrict from "./state_json.js";
import LoadingOverlay from "react-loading-overlay";
const $ = require("jquery");

AWS.config.region = "ap-south-1";
AWS.config.credentials = new AWS.CognitoIdentityCredentials({
  IdentityPoolId: "ap-south-1:8616b2f3-782b-42af-b051-dea274f9e16f"
});
const s3 = new AWS.S3({
  apiVersion: "2006-03-01",
  params: { Bucket: "claro-farmers" }
});
class FarmerHeader extends Component {
  render() {
    return (
      <div className="container ">
        <nav
          style={{ backgroundColor: "#edeef0", borderBottomColor: "darkgray" }}
          className="navbar navbar-default"
        >
          <div
            className="container-fluid "
            style={{ textAlign: "center", marginTop: "14px" }}
          >
            <Link to="/farmer">
              <button
                type="button"
                className="btn btn-default"
                aria-label="Left Align"
                id="drillUp"
                style={{
                  // display: "none",
                  // borderColor: "darkgray",
                  float: "left",
                  outline: "none",
                  backgroundColor: "transparent"
                }}
              >
                <span
                  className="glyphicon glyphicon-menu-left"
                  style={{ marginRight: "6px" }}
                  aria-hidden="true"
                />
                Back
              </button>
            </Link>
            {/* <Link to="/farmeradd">
              <div className="newfarmer">
                <button
                  type="button"
                  className=" btn btn-default"
                  aria-label="Left Align"
                  id="drillUp"
                  style={{
                    // display: "none",
                    // borderColor: "darkgray",
                    float: "right",
                    outline: "none",
                    backgroundColor: "transparent"
                  }}
                >
                  <span
                    className="glyphicon glyphicon-plus"
                    style={{ marginRight: "6px" }}
                    aria-hidden="true"
                  />
                  Add Farmer
                </button>
              </div>
            </Link> */}
            <span
              style={{
                fontFamily: "gotham-medium",
                fontSize: "large",
                color: "#b12d28"
              }}
            >
              Farmer database in India
            </span>
          </div>
        </nav>
      </div>
    );
  }
}
class Farmer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      farmerlist: [],
      searchvariantselected: "name",
      verticalsearchvariantselected: "NA",
      statesearchvariantselected: "",
      famerinfo: {},
      searchtext: "",
      backupinfo: {},
      scrollcount: 0,
      backupimglist: [],
      backupcroplist: 0,
      searchscrollcount: 0,
      searchhasmore: false,
      cropschema: undefined,
      deviceschema: undefined,
      hasMore: false,
      isloaderactive: false
    };
    this.fileInput = [
      React.createRef(),
      React.createRef(),
      React.createRef(),
      React.createRef()
    ];
  }
  handlesearch = event => {
    if (
      this.state.searchtext === event.target.value &&
      event.target.value.length > 2
    ) {
      this.setState({ searchtext: event.target.value });
      let tempsearchscrollcount = this.state.searchscrollcount + 1;
      axios({
        url: config.searchfarmer,
        method: "POST",
        data: {
          [this.state.searchvariantselected]: event.target.value,
          pageNo: tempsearchscrollcount
        },
        headers: {
          "Content-Type": "application/json"
        }
      })
        .then(res => {
          if (res.data.data.list.length > 0) {
            this.setState({
              farmerlist: res.data.data.list,
              searchscrollcount: tempsearchscrollcount,
              searchhasmore: res.data.data.hasMore
            });
          } else {
            let temp = [{ name: "No result found", id: null }];
            this.setState({
              farmerlist: temp,
              searchscrollcount: 0,
              searchhasmore: res.data.data.hasMore
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
    } else if (
      this.state.searchtext !== event.target.value &&
      event.target.value.length > 2
    ) {
      this.setState({ searchtext: event.target.value });
      let tempsearchscrollcount = 1;
      axios({
        url: config.searchfarmer,
        method: "POST",
        data: {
          [this.state.searchvariantselected]: event.target.value,
          pageNo: tempsearchscrollcount
        },
        headers: {
          "Content-Type": "application/json"
        }
      })
        .then(res => {
          if (res.data.data.list.length > 0) {
            this.setState({
              farmerlist: res.data.data.list,
              searchscrollcount: tempsearchscrollcount,
              searchhasmore: res.data.data.hasMore
            });
            this.handleclick(res.data.data.list[0]);
            $(".list-group-item").click(function() {
              var listItems = $(".list-group-item"); //Select all list items

              //Remove 'active' tag for all list items
              for (let i = 0; i < listItems.length; i++) {
                listItems[i].classList.remove("active");
              }

              //Add 'active' tag for currently selected item
              this.classList.add("active");
            });
            var listItems = $(".list-group-item");
            listItems[1].classList.add("active");
          } else {
            let temp = [{ name: "No result found", id: null }];
            this.setState({
              farmerlist: temp,
              searchscrollcount: 0,
              searchhasmore: res.data.data.hasMore
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
    } else if (
      this.state.searchtext !== event.target.value &&
      event.target.value.length <= 2
    ) {
      this.setState({ searchtext: event.target.value });
    }
    if (event.target.value.length === 0) {
      this.getfarmerlist();
    }
  };
  handleclick = item => {
    if (item.id !== null && item.id !== undefined) {
      this.setState({ isloaderactive: true });
      axios({
        url: config.getfarmer + item.id,
        method: "POST",
        data: {
          temp: "temp"
        },
        headers: {
          "Content-Type": "application/json"
        }
      })
        .then(res => {
          this.setState({
            famerinfo: res.data.data,
            backupinfo: Object.assign({}, res.data.data)
          });

          axios({
            url: config.getfarmercroplist + item.id,
            method: "POST",
            data: {
              temp: "temp"
            },
            headers: {
              "Content-Type": "application/json"
            }
          })
            .then(ressp => {
              // console.log(ressp.data.data.list)
              let temporary = res.data.data;
              temporary["croplist"] = ressp.data.data.list.slice();
              // console.log(this.state.cropschema)
              if (ressp.data.data.list.length === 0) {
                // console.log(temporary)
                temporary.croplist.push(
                  Object.assign({}, this.state.cropschema)
                );
                temporary.croplist[0].farmerId = res.data.data.id;
              }

              this.setState({
                famerinfo: temporary,
                backupcroplist: ressp.data.data.list.slice(),
                backupinfo: Object.assign({}, temporary)
              });
            })
            .catch(e => {
              console.log(e);
              Swal({
                type: "error",
                title: "Oops...",
                text: e
              });
            });
          axios({
            url: config.getfarmerimg + item.id,
            method: "POST",
            data: {
              temp: "temp"
            },
            headers: {
              "Content-Type": "application/json"
            }
          })
            .then(rreess => {
              let temporaryy = res.data.data;

              let imgobject = [
                {
                  mediaType: "Profile Pic",
                  link: "https://via.placeholder.com/500",
                  farmerId: res.data.data.id,
                  type: "image",
                  modifiedBy: "0"
                },
                {
                  mediaType: "Public Pic",
                  link: "https://via.placeholder.com/500",
                  farmerId: res.data.data.id,
                  type: "image",
                  modifiedBy: "0"
                },
                {
                  mediaType: "Farm Pic",
                  link: "https://via.placeholder.com/500",
                  farmerId: res.data.data.id,
                  type: "image",
                  modifiedBy: "0"
                },
                {
                  mediaType: "Crop Pic",
                  link: "https://via.placeholder.com/500",
                  farmerId: res.data.data.id,
                  type: "image",
                  modifiedBy: "0"
                }
              ];

              temporaryy["imglist"] = imgobject;
              rreess.data.data.list.map(item => {
                temporaryy.imglist.map((itm, index) => {
                  if (item.mediaType === itm.mediaType) {
                    temporaryy.imglist[index] = Object.assign({}, item);
                  }
                });
              });
              this.setState({
                famerinfo: temporaryy,
                backupimglist: rreess.data.data.list.slice(),
                backupinfo: Object.assign({}, temporaryy)
              });
            })
            .catch(e => {
              this.setState({ isloaderactive: false });
              console.log(e);
              Swal({
                type: "error",
                title: "Oops...",
                text: e
              });
            });
          this.setState({ isloaderactive: false });
          document.getElementById("showsidetab").style.display = "block";
          document.getElementById("farmeraddnew").style.display = "none";
          document.getElementById("showsidetabeditfarmer").style.display =
            "none";
        })
        .catch(e => {
          console.log(e);
          this.setState({ isloaderactive: false });
          Swal({
            type: "error",
            title: "Oops...",
            text: e
          });
        });
    } else {
      this.setState({ isloaderactive: false });
      Swal({
        type: "error",
        title: "ID not found"
      });
    }
  };
  handlefarmeraddresponse = object => {
    this.setState({
      famerinfo: object,
      backupinfo: Object.assign({}, object)
    });
    axios({
      url: config.getfarmercroplist + object.id,
      method: "POST",
      data: {
        temp: "temp"
      },
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(ressp => {
        // console.log(ressp.data.data.list)
        let temporary = object;
        temporary["croplist"] = ressp.data.data.list.slice();
        // console.log(this.state.cropschema)
        if (ressp.data.data.list.length === 0) {
          // console.log(temporary)
          temporary.croplist.push(Object.assign({}, this.state.cropschema));
          temporary.croplist[0].farmerId = object.id;
        }

        this.setState({
          famerinfo: temporary,
          backupcroplist: ressp.data.data.list.slice(),
          backupinfo: Object.assign({}, temporary)
        });
      })
      .catch(e => {
        console.log(e);
        Swal({
          type: "error",
          title: "Oops...",
          text: e
        });
      });
    axios({
      url: config.getfarmerimg + object.id,
      method: "POST",
      data: {
        temp: "temp"
      },
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(rreess => {
        let temporaryy = object;

        let imgobject = [
          {
            mediaType: "Profile Pic",
            link: "https://via.placeholder.com/500",
            farmerId: object.id,
            type: "image",
            modifiedBy: "0"
          },
          {
            mediaType: "Public Pic",
            link: "https://via.placeholder.com/500",
            farmerId: object.id,
            type: "image",
            modifiedBy: "0"
          },
          {
            mediaType: "Farm Pic",
            link: "https://via.placeholder.com/500",
            farmerId: object.id,
            type: "image",
            modifiedBy: "0"
          },
          {
            mediaType: "Crop Pic",
            link: "https://via.placeholder.com/500",
            farmerId: object.id,
            type: "image",
            modifiedBy: "0"
          }
        ];

        temporaryy["imglist"] = imgobject;
        rreess.data.data.list.map(item => {
          temporaryy.imglist.map((itm, index) => {
            if (item.mediaType === itm.mediaType) {
              temporaryy.imglist[index] = Object.assign({}, item);
            }
          });
        });
        this.setState({
          famerinfo: temporaryy,
          backupimglist: rreess.data.data.list.slice(),
          backupinfo: Object.assign({}, temporaryy)
        });
      })
      .catch(e => {
        console.log(e);
        Swal({
          type: "error",
          title: "Oops...",
          text: e
        });
      });

    document.getElementById("showsidetab").style.display = "block";
    document.getElementById("farmeraddnew").style.display = "none";
    document.getElementById("showsidetabeditfarmer").style.display = "none";
  };
  handleclickaddfarmer = () => {
    document.getElementById("showsidetab").style.display = "none";
    document.getElementById("showsidetabeditfarmer").style.display = "none";
    document.getElementById("farmeraddnew").style.display = "block";
  };
  handleeditfarmer = () => {
    document.getElementById("showsidetab").style.display = "none";
    document.getElementById("showsidetabeditfarmer").style.display = "block";
    document.getElementById("farmeraddnew").style.display = "none";
  };
  handleInputChange = event => {
    event.persist();
    let temp = this.state.famerinfo;
    temp[event.target.name] = event.target.value;
    if (event.target.name === "state") {
      temp.district = statedistrict[event.target.value][0];
    }
    this.setState({ famerinfo: temp });
  };
  pumphandleInputChange = (index, event) => {
    event.persist();
    let temp = this.state.famerinfo;
    temp.pumplist[index][event.target.name] = event.target.value;
    this.setState({ famerinfo: temp });
  };
  crophandleInputChange = (index, event) => {
    event.persist();
    let temp = this.state.famerinfo;
    temp.croplist[index][event.target.name] = event.target.value;
    this.setState({ famerinfo: temp });
  };
  handlecancelfarmer = () => {
    this.setState({ famerinfo: Object.assign({}, this.state.backupinfo) });
    document.getElementById("showsidetab").style.display = "block";
    document.getElementById("showsidetabeditfarmer").style.display = "none";
  };
  handleeditfarmersave = async () => {
    // this.setState({ isloaderactive: true });
    delete this.state.famerinfo["modificationTime"];
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
      this.state.famerinfo.district.replace(/\s/g, "").length !== 0 &&
      this.state.famerinfo.uid &&
      this.state.famerinfo.uid.replace(/\s/g, "").length !== 0 &&
      this.state.famerinfo.uidType &&
      this.state.famerinfo.uidType.replace(/\s/g, "").length !== 0 &&
      this.state.famerinfo.contactNo &&
      this.state.famerinfo.contactNo.replace(/\s/g, "").length !== 0
    ) {
      if (
        this.state.famerinfo.latitude > 37 ||
        this.state.famerinfo.latitude < 8
      ) {
        alert("Please set valid Latitude value.(Lattitude - 8′N to 37′N)");

        return;
      }
      if (
        this.state.famerinfo.longitude > 97 ||
        this.state.famerinfo.longitude < 68
      ) {
        alert("Please set valid Longitude value.(Longitude - 68′E to 97′E)");

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
            "Please set valid Contact Number.(10 digit starting with 9/8/7/6)"
          );

          return;
        }
      }

      this.setState({ isloaderactive: true });
      axios({
        url: config.updatefarmer,
        method: "POST",
        data: this.state.famerinfo,
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
            this.handleclick(this.state.famerinfo);
            this.setState({
              // backupinfo: Object.assign({}, this.state.famerinfo),
              isloaderactive: false
            });
            document.getElementById("showsidetab").style.display = "block";
            document.getElementById("showsidetabeditfarmer").style.display =
              "none";
            // this.getfarmerlist();
          } else {
            this.setState({
              isloaderactive: false
            });
            alert(res.data.error.errorMsg);

            return;
          }
        })
        .catch(e => {
          this.setState({ isloaderactive: false });
          if (JSON.stringify(e).includes("401")) {
            Swal({
              type: "error",
              title: "Unauthorized",
              text: "Please login again."
            });
            this.props.history.push({
              pathname: "/"
            });
          } else if (JSON.stringify(e).includes("403")) {
            Swal({
              type: "error",
              title: "Forbidden",
              text: "Access denied for the user."
            });
            // this.props.history.push({
            //   pathname: "/rms"
            // });
          } else {
            this.setState({ isloaderactive: false });
            Swal({
              type: "error",
              title: "Oops...",
              text: e
            });
            // this.props.history.push({
            //   pathname: "/rms"
            // });
          }
        });
    } else {
      this.setState({
        isloaderactive: false
      });
      Swal({
        type: "info",
        html: "<h4>Please fill valid input in all mandatory fields.</h4>"
      });
    }
  };

  handleeditfarmersavecroplist = async () => {
    this.state.famerinfo.croplist.map((item, number) => {
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
        if (this.state.backupcroplist.length !== 0 && item !== undefined) {
          axios({
            url: config.updatecrop,
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
                document.getElementById("showsidetab").style.display = "block";
                document.getElementById("showsidetabeditfarmer").style.display =
                  "none";
                this.setState({
                  backupinfo: Object.assign({}, this.state.famerinfo)
                });
              } else {
                alert(res.data.error.errorMsg);
                return;
              }
            })
            .catch(e => {
              this.setState({ isloaderactive: false });
              if (JSON.stringify(e).includes("401")) {
                Swal({
                  type: "error",
                  title: "Unauthorized",
                  text: "Please login again."
                });
                this.props.history.push({
                  pathname: "/"
                });
              } else if (JSON.stringify(e).includes("403")) {
                Swal({
                  type: "error",
                  title: "Forbidden",
                  text: "Access denied for the user."
                });
              } else {
                this.setState({ isloaderactive: false });
                Swal({
                  type: "error",
                  title: "Oops...",
                  text: e
                });
              }
            });
        } else if (
          this.state.backupcroplist.length === 0 &&
          item !== undefined
        ) {
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
                document.getElementById("showsidetab").style.display = "block";
                document.getElementById("showsidetabeditfarmer").style.display =
                  "none";
                this.setState({
                  backupinfo: Object.assign({}, this.state.famerinfo)
                });
              } else {
                alert(res.data.error.errorMsg);
                return;
              }
            })
            .catch(e => {
              this.setState({ isloaderactive: false });
              if (JSON.stringify(e).includes("401")) {
                Swal({
                  type: "error",
                  title: "Unauthorized",
                  text: "Please login again."
                });
                this.props.history.push({
                  pathname: "/"
                });
              } else if (JSON.stringify(e).includes("403")) {
                Swal({
                  type: "error",
                  title: "Forbidden",
                  text: "Access denied for the user."
                });
              } else {
                this.setState({ isloaderactive: false });
                Swal({
                  type: "error",
                  title: "Oops...",
                  text: e
                });
              }
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
    });
  };
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
          if (temp.imglist[index].mediaType === mediaType) {
            if (
              self.state.backupimglist.length !== 0 &&
              temp.imglist[index].link !== "https://via.placeholder.com/500"
            ) {
              temp.imglist[index].link = data.Location;
              axios({
                url: config.updateimg,
                method: "POST",
                data: temp.imglist[index],
                headers: {
                  "Content-Type": "application/json"
                }
              })
                .then(res => {
                  if (res.data.data !== null && res.data.data.result) {
                    self.setState({ famerinfo: temp });
                    alert("Img uploaded succesfully");
                  } else {
                    alert(res.data.error.errorMsg);
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
              temp.imglist[index].link = data.Location;
              axios({
                url: config.addimg,
                method: "POST",
                data: temp.imglist[index],
                headers: {
                  "Content-Type": "application/json"
                }
              })
                .then(res => {
                  if (res.data.data !== null && res.data.data.result) {
                    self.setState({ famerinfo: temp });
                    alert("Img uploaded succesfully");
                  } else {
                    alert(res.data.error.errorMsg);
                  }
                })
                .catch(e => {
                  Swal({
                    type: "error",
                    title: "Oops...",
                    text: e
                  });
                });
            }
          }
        }
      }
    );
  };
  // handlesearchselect = event => {
  //   this.setState({
  //     searchvariantselected: event.target.value,
  //     searchtext: ""
  //   });
  //   var listItems = $(".list-group-item"); //Select all list items

  //   //Remove 'active' tag for all list items
  //   for (let i = 0; i < listItems.length; i++) {
  //     listItems[i].classList.remove("active");
  //   }

  //   this.handlesearch({ ["target"]: { ["value"]: "" } });
  // };
  handlesearchselect = async event => {
    var listItems = $(".list-group-item"); //Select all list items

    //Remove 'active' tag for all list items
    for (let i = 0; i < listItems.length; i++) {
      listItems[i].classList.remove("active");
    }
    if (event.target.value === "vertical") {
      await this.setState({
        searchvariantselected: event.target.value,
        verticalsearchvariantselected: "Solar Irrigation Pump",
        searchtext: ""
      });

      this.handlesearch({ ["target"]: { ["value"]: "Solar Irrigation Pump" } });
      document.getElementById("normaltextsearch").style.display = "none";
      document.getElementById("statedropdownsearch").style.display = "none";
      document.getElementById("verticaldropdownsearch").style.display = "block";
    } else if (event.target.value === "state") {
      await this.setState({
        searchvariantselected: event.target.value,
        statesearchvariantselected: "Bihar",
        searchtext: ""
      });

      this.handlesearch({ ["target"]: { ["value"]: "Bihar" } });
      document.getElementById("normaltextsearch").style.display = "none";
      document.getElementById("verticaldropdownsearch").style.display = "none";
      document.getElementById("statedropdownsearch").style.display = "block";
    } else {
      await this.setState({
        searchvariantselected: event.target.value,
        searchtext: ""
      });
      this.handlesearch({ ["target"]: { ["value"]: "" } });
      document.getElementById("normaltextsearch").style.display = "block";
      document.getElementById("statedropdownsearch").style.display = "none";
      document.getElementById("verticaldropdownsearch").style.display = "none";
    }
  };
  handleverticalsearchselect = event => {
    this.setState({ verticalsearchvariantselected: event.target.value });
    this.handlesearch(event);
  };
  handlestatesearchselect = event => {
    this.setState({ statesearchvariantselected: event.target.value });
    this.handlesearch(event);
  };
  getfarmerlist = () => {
    let count = 1;
    axios({
      url: config.farmerlist + count,
      method: "POST",
      data: {
        temp: "temp"
      },
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => {
        this.setState({
          farmerlist: res.data.data.list,
          scrollcount: count,
          hasMore: res.data.data.hasMore,
          searchhasmore: false,
          searchscrollcount: 0
        });
        axios({
          url: config.getfarmer + res.data.data.list[0].id,
          method: "POST",
          data: {
            temp: "temp"
          },
          headers: {
            "Content-Type": "application/json"
          }
        })
          .then(resp => {
            // axios({
            //   url: config.getfarmerpumplist + res.data.data.list[0].id,
            //   method: "POST",
            //   data: {
            //     temp: "temp"
            //   },
            //   headers: {
            //     "Content-Type": "application/json"
            //   }
            // })
            //   .then(Response => {
            //     let tmp = resp.data.data;
            //     tmp["pumplist"] = Response.data.data.list.slice();
            //     if (Response.data.data.list.length === 0) {
            //       // console.log(temporary)
            //       tmp.pumplist.push(Object.assign({}, this.state.deviceschema));
            //       tmp.pumplist[0].farmerId = res.data.data.list[0].id;
            //     }
            //     this.setState({
            //       famerinfo: tmp,
            //       backuppumplist: Response.data.data.list.slice(),
            //       backupinfo: Object.assign({}, tmp)
            //     });
            //   })
            //   .catch(e => {
            //     console.log(e);
            //     Swal({
            //       type: "error",
            //       title: "Oops...",
            //       text: e
            //     });
            //   });
            axios({
              url: config.getfarmercroplist + res.data.data.list[0].id,
              method: "POST",
              data: {
                temp: "temp"
              },
              headers: {
                "Content-Type": "application/json"
              }
            })
              .then(ressp => {
                // console.log(ressp.data.data.list)
                let temporary = resp.data.data;
                temporary["croplist"] = ressp.data.data.list.slice();
                // console.log(this.state.cropschema)
                if (ressp.data.data.list.length === 0) {
                  // console.log(temporary)
                  temporary.croplist.push(
                    Object.assign({}, this.state.cropschema)
                  );
                  temporary.croplist[0].farmerId = res.data.data.list[0].id;
                }

                this.setState({
                  famerinfo: temporary,
                  backupcroplist: ressp.data.data.list.slice(),
                  backupinfo: Object.assign({}, temporary)
                });
              })
              .catch(e => {
                console.log(e);
                Swal({
                  type: "error",
                  title: "Oops...",
                  text: e
                });
              });
            axios({
              url: config.getfarmerimg + res.data.data.list[0].id,
              method: "POST",
              data: {
                temp: "temp"
              },
              headers: {
                "Content-Type": "application/json"
              }
            })
              .then(rreess => {
                let temporaryy = resp.data.data;

                let imgobject = [
                  {
                    mediaType: "Profile Pic",
                    link: "https://via.placeholder.com/500",
                    farmerId: res.data.data.list[0].id,
                    type: "image",
                    modifiedBy: "0"
                  },
                  {
                    mediaType: "Public Pic",
                    link: "https://via.placeholder.com/500",
                    farmerId: res.data.data.list[0].id,
                    type: "image",
                    modifiedBy: "0"
                  },
                  {
                    mediaType: "Farm Pic",
                    link: "https://via.placeholder.com/500",
                    farmerId: res.data.data.list[0].id,
                    type: "image",
                    modifiedBy: "0"
                  },
                  {
                    mediaType: "Crop Pic",
                    link: "https://via.placeholder.com/500",
                    farmerId: res.data.data.list[0].id,
                    type: "image",
                    modifiedBy: "0"
                  }
                ];

                temporaryy["imglist"] = imgobject;
                rreess.data.data.list.map(item => {
                  temporaryy.imglist.map((itm, index) => {
                    if (item.mediaType === itm.mediaType) {
                      temporaryy.imglist[index] = Object.assign({}, item);
                    }
                  });
                });

                this.setState({
                  famerinfo: temporaryy,
                  backupimglist: rreess.data.data.list.slice(),
                  backupinfo: Object.assign({}, temporaryy)
                });
                document.getElementById("showsidetab").style.display = "block";
                document.getElementById("farmeraddnew").style.display = "none";
                document.getElementById("showsidetabeditfarmer").style.display =
                  "none";
                $(".list-group-item").click(function() {
                  var listItems = $(".list-group-item"); //Select all list items

                  //Remove 'active' tag for all list items
                  for (let i = 0; i < listItems.length; i++) {
                    listItems[i].classList.remove("active");
                  }

                  //Add 'active' tag for currently selected item
                  this.classList.add("active");
                });
                var listItems = $(".list-group-item");
                listItems[1].classList.add("active");
              })
              .catch(e => {
                console.log(e);
                Swal({
                  type: "error",
                  title: "Oops...",
                  text: e
                });
              });
          })
          .catch(e => {
            console.log(e);
            Swal({
              type: "error",
              title: "Oops...",
              text: e
            });
            // this.props.history.push({
            //   pathname: "/farmer"
            // });
          });
      })
      .catch(e => {
        console.log(e);
        Swal({
          type: "error",
          title: "Oops...",
          text: e
        });
      });
  };
  componentDidMount() {
    let self = this;

    $("#maptable").scroll(function() {
      if (
        $(this).scrollTop() + $(this).innerHeight() >=
          $(this)[0].scrollHeight &&
        self.state.hasMore &&
        !self.state.searchhasmore &&
        self.state.searchscrollcount === 0
      ) {
        document.getElementById("listendmessage").style.display = "none";
        let count = self.state.scrollcount + 1;
        let tabledatanow = self.state.farmerlist;

        axios({
          url: config.farmerlist + count,
          method: "POST",
          data: {},
          headers: {
            "Content-Type": "application/json"
          }
        })
          .then(res => {
            // console.log(res);

            self.setState({
              farmerlist: tabledatanow.concat(res.data.data.list),
              scrollcount: count,
              hasMore: res.data.data.hasMore
            });
            $(".list-group-item").click(function() {
              var listItems = $(".list-group-item"); //Select all list items

              //Remove 'active' tag for all list items
              for (let i = 0; i < listItems.length; i++) {
                listItems[i].classList.remove("active");
              }

              //Add 'active' tag for currently selected item
              this.classList.add("active");
            });
            if (!res.data.data.hasMore) {
              // console.log('block')
              document.getElementById("listendmessage").style.display = "block";
            }
          })
          .catch(e => {
            console.log(e);
            Swal({
              type: "error",
              title: "Oops...",
              text: e
            });
          });
      } else if (
        $(this).scrollTop() + $(this).innerHeight() >=
          $(this)[0].scrollHeight &&
        self.state.searchscrollcount >= 0 &&
        self.state.searchhasmore
      ) {
        let tempsearchscrollcount = self.state.searchscrollcount + 1;
        let tabledatanow = self.state.farmerlist;
        axios({
          url: config.searchfarmer,
          method: "POST",
          data: {
            [self.state.searchvariantselected]: self.state.searchtext,
            pageNo: tempsearchscrollcount
          },
          headers: {
            "Content-Type": "application/json"
          }
        })
          .then(res => {
            if (res.data.data.list.length > 0) {
              self.setState({
                farmerlist: tabledatanow.concat(res.data.data.list),
                searchscrollcount: tempsearchscrollcount,
                searchhasmore: res.data.data.hasMore
              });
              $(".list-group-item").click(function() {
                // console.log("click event");
                var listItems = $(".list-group-item"); //Select all list items

                //Remove 'active' tag for all list items
                for (let i = 0; i < listItems.length; i++) {
                  listItems[i].classList.remove("active");
                }

                //Add 'active' tag for currently selected item
                this.classList.add("active");
              });
            } else {
              let temp = [{ name: "No result found", id: null }];
              self.setState({
                farmerlist: temp,
                searchscrollcount: 0,
                searchhasmore: res.data.data.hasMore
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
      } else if (
        $(this).scrollTop() + $(this).innerHeight() > $(this)[0].scrollHeight &&
        self.state.hasMore !== null &&
        !self.state.hasMore
      ) {
        // console.log('block',self.state.hasMore,($(this).scrollTop() + $(this).innerHeight() >
        // $(this)[0].scrollHeight))
        // let templist=this.state.farmerlist
        // templist.push({name:'You have come till the end of list.'})
        // this.setState({farmerlist:templist})
        document.getElementById("listendmessage").style.display = "block";
      } else {
        document.getElementById("listendmessage").style.display = "none";
      }
    });

    if (this.state.cropschema === undefined) {
      axios({
        url: config.getcropschema,
        method: "POST",
        data: {
          temp: "temp"
        },
        headers: {
          "Content-Type": "application/json"
        }
      })
        .then(res => {
          this.setState({ cropschema: res.data.data });
        })
        .catch(e => {
          Swal({
            type: "error",
            title: "Oops...",
            text: e
          });
        });
    }

    this.getfarmerlist();
  }

  render() {
    return (
      <div className="gauravwww">
        <LoadingOverlay active={this.state.isloaderactive} spinner>
          <Header />
          <div className="mainbody">
            <Sidebar history={this.props.history} />
            <div style={{ backgroundColor: "#F2F2F2" }} className="main">
              <FarmerHeader label={this.state.label} />

              <div className="row">
                <div
                  className="col-xs-3"
                  style={{
                    // height: "90vh",
                    // overflow: "scroll",
                    paddingRight: "0"
                  }}
                >
                  <div className="list-group">
                    <a
                      onClick={this.handleclickaddfarmer}
                      className="list-group-item list-group-item-action flex-column align-items-start  "
                    >
                      <h4
                        style={{ textAlign: "right", fontSize: "13px" }}
                        className="list-group-item-heading"
                      >
                        <span
                          className="glyphicon glyphicon-plus"
                          style={{ marginRight: "6px" }}
                          aria-hidden="true"
                        />
                        <span>Add Farmer</span>
                      </h4>
                      {/* <p class="list-group-item-text" /> */}
                    </a>
                    <div className="row ">
                      <div className="col-xs-4" style={{ paddingRight: "0" }}>
                        <select
                          name="selectkey"
                          onChange={this.handlesearchselect}
                          value={this.state.searchvariantselected}
                          className="form-control"
                          id="sel1"
                        >
                          <option value="name">Name</option>
                          <option value="uid">Uid</option>
                          <option value="contactNo">Contact no.</option>
                          <option value="state">State</option>
                          <option value="vertical">Vertical</option>
                        </select>
                      </div>
                      <div
                        id="normaltextsearch"
                        className="col-xs-8"
                        style={{ display: "block", paddingLeft: "0" }}
                      >
                        <input
                          value={this.state.searchtext}
                          onChange={this.handlesearch}
                          type="search"
                          className="form-control "
                          placeholder="Search"
                          aria-label="..."
                        />
                      </div>
                      <div
                        id="statedropdownsearch"
                        className="col-xs-8"
                        style={{ paddingLeft: "0", display: "none" }}
                      >
                        <select
                          name="stateselectkey"
                          onChange={this.handlestatesearchselect}
                          value={this.state.statesearchvariantselected || ""}
                          className="form-control"
                          id="sel1111"
                        >
                          {Object.keys(statedistrict).map(item => (
                            <option key={item} value={item}>
                              {item}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div
                        id="verticaldropdownsearch"
                        className="col-xs-8"
                        style={{ paddingLeft: "0", display: "none" }}
                      >
                        <select
                          name="verticalselectkey"
                          onChange={this.handleverticalsearchselect}
                          value={
                            this.state.verticalsearchvariantselected ||
                            "Solar Irrigation Pump"
                          }
                          className="form-control"
                          id="sel111"
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
                    <div id="maptable" className="farmerlists">
                      {this.state.farmerlist !== [] &&
                        this.state.farmerlist.map((item, index) => (
                          <a
                            key={index}
                            onClick={this.handleclick.bind(this, item)}
                            className="list-group-item list-group-item-action flex-column align-items-start "
                          >
                            <h4 className="list-group-item-heading">
                              {item.name}
                            </h4>
                            {item.uid && item.uidType && (
                              <p className="list-group-item-text">
                                {item.uidType}: {item.uid}
                                {item.contactNo && (
                                  <span style={{ float: "right" }}>
                                    {item.contactNo}
                                  </span>
                                )}
                              </p>
                            )}
                          </a>
                        ))}
                      <div
                        id="listendmessage"
                        style={{
                          display: "none",
                          margin: "0 auto",
                          textAlign: "center"
                        }}
                      >
                        You have come till the end of list.
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-xs-9 famerinfobox">
                  <Farmereditshow
                    handleeditfarmer={this.handleeditfarmer}
                    famerinfo={this.state.famerinfo}
                  />
                  <Farmeredit
                    pumphandleInputChange={this.pumphandleInputChange}
                    crophandleInputChange={this.crophandleInputChange}
                    handleChangeimage={this.handleChangeimage}
                    fileInput={this.fileInput}
                    famerinfo={this.state.famerinfo}
                    handlecancelfarmer={this.handlecancelfarmer}
                    handleInputChange={this.handleInputChange}
                    handleeditfarmersave={this.handleeditfarmersave}
                    // handleeditfarmersavepumplist={
                    //   this.handleeditfarmersavepumplist
                    // }
                    handleeditfarmersavecroplist={
                      this.handleeditfarmersavecroplist
                    }
                  />
                  <Farmeraddnew
                    getfarmer={this.getfarmerlist}
                    handlefarmeraddresponse={this.handlefarmeraddresponse}
                  />
                </div>
              </div>
            </div>
          </div>
        </LoadingOverlay>
      </div>
    );
  }
}
export default Farmer;
