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
            style={{ textAlign: "center", marginTop: "10px" }}
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
            <span style={{ fontSize: "large", color: "blue" }}>
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
      famerinfo: {},
      searchtext: "",
      backupinfo: {},
      scrollcount: 0,
      searchscrollcount: 0,
      searchhasmore: false,
      hasMore: false
    };
    this.fileInput = React.createRef();
  }
  handlesearch = event => {
    if (
      this.state.searchtext === event.target.value &&
      event.target.value.length > 3
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
      event.target.value.length > 3
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
      event.target.value.length <= 3
    ) {
      this.setState({ searchtext: event.target.value });
    }
    if (event.target.value.length === 0) {
      this.getfarmerlist();
    }
  };
  handleclick = item => {
    if (item.id !== null) {
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
          // this.setState({
          //   famerinfo: res.data.data,
          //   backupinfo: Object.assign({}, res.data.data)
          // });
          axios({
            url: config.getfarmerpumplist + item.id,
            method: "POST",
            data: {
              temp: "temp"
            },
            headers: {
              "Content-Type": "application/json"
            }
          })
            .then(Response => {
              // console.log(Response);
              let tmp = res.data.data;
              tmp["pumplist"] = Response.data.data.list;
              this.setState({
                famerinfo: tmp,
                backupinfo: Object.assign({}, res.data.data)
              });
              document.getElementById("showsidetab").style.display = "block";
              document.getElementById("farmeraddnew").style.display = "none";
              document.getElementById("showsidetabeditfarmer").style.display =
                "none";
            })
            .catch(e => {
              console.log(e);
              Swal({
                type: "error",
                title: "Oops...",
                text: e
              });
            });
          // document.getElementById("showsidetab").style.display = "block";
          // document.getElementById("farmeraddnew").style.display = "none";
          // document.getElementById("showsidetabeditfarmer").style.display =
          //   "none";
        })
        .catch(e => {
          console.log(e);
          Swal({
            type: "error",
            title: "Oops...",
            text: e
          });
        });
    }
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
    this.setState({ famerinfo: temp });
  };
  handlecancelfarmer = () => {
    this.setState({ famerinfo: Object.assign({}, this.state.backupinfo) });
    document.getElementById("showsidetab").style.display = "block";
    document.getElementById("showsidetabeditfarmer").style.display = "none";
  };
  handleeditfarmersave = async () => {
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
      this.state.famerinfo.district.replace(/\s/g, "").length !== 0
    ) {
      // console.log(this.fileInput.current.files[0])

      if (
        this.state.famerinfo.latitude > 37 ||
        this.state.famerinfo.latitude < 8
      ) {
        alert("Please set valid Latitude value.(Lattitude - 8′N to 37′N)");
        //  let temp = this.state.famerinfo;
        // temp['latitude'] = 0;
        // this.setState({ famerinfo: temp });
        return;
      }
      if (
        this.state.famerinfo.longitude > 97 ||
        this.state.famerinfo.longitude < 68
      ) {
        alert("Please set valid Longitude value.(Longitude - 68′E to 97′E)");
        //  let temp = this.state.famerinfo;
        // temp['longitude'] = 0;
        // this.setState({ famerinfo: temp });
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
            "Please set valid Contact Number.(10 digit starting with 9/8/7)"
          );
          // let temp = this.state.famerinfo;
          // temp['conta'] = 0;
          // this.setState({ famerinfo: temp });
          return;
        }
      }

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
            this.setState({
              backupinfo: Object.assign({}, this.state.famerinfo)
            });
            document.getElementById("showsidetab").style.display = "block";
            document.getElementById("showsidetabeditfarmer").style.display =
              "none";
            this.getfarmerlist();
          } else {
            alert(res.data.error.errorMsg);
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
    } else {
      Swal({
        type: "error",
        title: "Fill valid input in all mandatory fields"
        // text: res.data.error.errorMsg
      });
    }
  };
  handleChangeimage = () => {
    var file = this.fileInput.current.files[0];
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
  handlesearchselect = event => {
    this.setState({ searchvariantselected: event.target.value });
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
            // this.setState({
            //   famerinfo: res.data.data,
            //   backupinfo: Object.assign({}, res.data.data)
            // });
            // document.getElementById("showsidetab").style.display = "block";
            // document.getElementById("farmeraddnew").style.display = "none";
            // document.getElementById("showsidetabeditfarmer").style.display =
            //   "none";
            axios({
              url: config.getfarmerpumplist + res.data.data.list[0].id,
              method: "POST",
              data: {
                temp: "temp"
              },
              headers: {
                "Content-Type": "application/json"
              }
            })
              .then(Response => {
                // console.log(Response);
                let tmp = resp.data.data;
                tmp["pumplist"] = Response.data.data.list;
                this.setState({
                  famerinfo: tmp,
                  backupinfo: Object.assign({}, res.data.data)
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
            this.props.history.push({
              pathname: "/farmer"
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
              console.log("click event");
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

    this.getfarmerlist();
  }
  handlelistactive = event => {
    // console.log(event)
  };

  render() {
    return (
      <div className="gauravwww">
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
                      </select>
                    </div>
                    <div className="col-xs-8" style={{ paddingLeft: "0" }}>
                      <input
                        value={this.state.searchtext}
                        onChange={this.handlesearch}
                        type="search"
                        className="form-control "
                        placeholder="Search"
                        aria-label="..."
                      />
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
                  handleChangeimage={this.handleChangeimage}
                  fileInput={this.fileInput}
                  famerinfo={this.state.famerinfo}
                  handlecancelfarmer={this.handlecancelfarmer}
                  handleInputChange={this.handleInputChange}
                  handleeditfarmersave={this.handleeditfarmersave}
                />
                <Farmeraddnew getfarmer={this.getfarmerlist} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Farmer;
