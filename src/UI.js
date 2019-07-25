import React, { Component } from "react";
import Map from "./Maps.js";
import Header from "./Header.js";
import Sidebar from "./Sidebar.js";
import Filter from "./Filter.js";
import axios from "axios";
import config from "./config.js";
import Swal from "sweetalert2";
// import Keycloak from "keycloak-js";
// import Cookies from 'js-cookie';

let tempadditional = [
  {
    latitude: 27.45805556,
    longitude: 80.58944444,
    name: "Ucchauli",
    type: "Mini-Grid",
    what: "Collection / Processing Centres"
  },
  {
    latitude: 27.45805556,
    longitude: 80.58944444,
    name: "Govindpur",
    type: "Mini-Grid",
    what: "Collection / Processing Centres"
  },
  {
    latitude: 28.26083333,
    longitude: 80.11444444,
    name: "Bicchauli",
    type: "Mini-Grid",
    what: "Collection / Processing Centres"
  },
  {
    latitude: 27.41305556,
    longitude: 80.76027778,
    name: "Ramgarh",
    type: "Mini-Grid",
    what: "Collection / Processing Centres"
  },
  {
    latitude: 26.69333333,
    longitude: 85.68611111,
    name: "Takia",
    type: "Mini-Grid",
    what: "Collection / Processing Centres"
  },
  {
    latitude: 20.615156,
    longitude: 77.5035243,
    name: "Kamragaon",
    type: "Procurement",
    what: "Collection / Processing Centres"
  },
  {
    latitude: 28.875826,
    longitude: 77.106487,
    name: "Kundli	",
    type: "Processing",
    what: "Collection / Processing Centres"
  },
  {
    latitude: 27.01222222,
    longitude: 84.69888889,
    name: "Ramchandrapur",
    type: "Mini-Grid",
    what: "Collection / Processing Centres"
  },
  {
    latitude: 28.7140497,
    longitude: 77.1661905,
    name: "NCR",
    type: "Present Market",
    what: "Markets Served"
  },
  {
    latitude: 26.8424945,
    longitude: 80.8751914,
    name: "Lucknow",
    type: "Planned Market",
    what: "Markets Served"
  },
  {
    latitude: 26.4474128,
    longitude: 80.198295,
    name: "Kanpur",
    type: "Planned Market",
    what: "Markets Served"
  },
  {
    latitude: 25.6081756,
    longitude: 85.0730021,
    name: "Patna",
    type: "Planned Market",
    what: "Markets Served"
  },
  {
    latitude: 25.3209013,
    longitude: 82.9210681,
    name: "Varanasi",
    type: "Planned Market",
    what: "Markets Served"
  },
  {
    latitude: 28.52356,
    longitude: 77.194194,
    type: "Corporate Office",
    name: "Delhi",
    what: "Office"
  },
  {
    latitude: 25.6226064,
    longitude: 85.1277454,
    type: "Off-Site",
    name: "Patna",
    what: "Office"
  },
  {
    latitude: 26.8746814,
    longitude: 80.9729577,
    type: "Off-Site",
    name: "Lucknow",
    what: "Office"
  },
  {
    latitude: 23.167633,
    longitude: 79.901402,
    type: "Off-Site",
    name: "Jabalpur",
    what: "Office"
  }
];

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // keycloak: null,
      // authenticated: false,
      states: [],
      allpins: [],
      filteredstate: "",
      filteredpins: [],
      additionalmarkers: tempadditional,
      filter: {
        IRRIGATION_PUMP: true,
        PATVAN: true,
        DRINKING_WATER_PUMP: true,
        MINIGRID: true,
        ROOFTOP: true,
        AGROASSETS: true
      }
    };
    this.handleFilterChange = this.handleFilterChange.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.handleApply = this.handleApply.bind(this);
    this.handlestatefilter = this.handlestatefilter.bind(this);
  }
  handleReset() {
    let newfilter = {
      IRRIGATION_PUMP: true,
      PATVAN: true,
      DRINKING_WATER_PUMP: true,
      MINIGRID: true,
      ROOFTOP: true,
      AGROASSETS: true
    };
    this.setState(prevState => ({
      ...prevState,
      filter: newfilter,
      filteredstate: "",
      filteredpins: prevState.allpins,
      additionalmarkers: tempadditional
    }));
  }
  handleApply() {
    let filterpins = [];
    this.state.allpins.map((item, key) => {
      if (this.state.filteredstate === "") {
        if (this.state.filter[item.assetType]) {
          filterpins.push(item);
        }
      } else {
        if (item.state === this.state.filteredstate) {
          if (this.state.filter[item.assetType]) {
            filterpins.push(item);
          }
        }
      }
    });
    if (!this.state.filter.AGROASSETS) {
      this.setState(prevState => ({
        ...prevState,
        filteredpins: filterpins,
        additionalmarkers: []
      }));
    } else {
      this.setState(prevState => ({
        ...prevState,
        filteredpins: filterpins,
        additionalmarkers: tempadditional
      }));
    }
  }
  handleFilterChange(filtervalue) {
    this.setState(prevState => ({
      ...prevState,
      filter: {
        ...prevState.filter,
        [filtervalue]: !prevState.filter[filtervalue]
      }
    }));
  }
  handlestatefilter(filtered) {
    let tempfilter = this.state.filter;
    tempfilter.AGROASSETS = false;
    this.setState({
      filteredstate: filtered,
      additionalmarkers: [],
      filter: tempfilter
    });
  }

  async componentDidMount() {
    // const keycloak = Keycloak({
    //   realm: "clarokeycloak",
    //   "url":
    //     "http://ec2-13-234-112-1.ap-south-1.compute.amazonaws.com/auth",
    //   "ssl-required": "none",
    //   resource: "claro-apps",
    //   "public-client": true,
    //   "verify-token-audience": true,
    //   "use-resource-role-mappings": true,
    //   "confidential-port": 0,
    //   clientId: "claro-apps",
    //   "enable-cors": true
    // });
    
    // await keycloak.init({ onLoad: "login-required" }).success(async (authenticated) => {
      
    //   await this.setState({ keycloak: keycloak, authenticated: authenticated });
    //   Cookies.set('idToken', keycloak.token);
    // });
    
    
    if (
      this.state.allpins.length === 0 &&
      this.state.states.length === 0 &&
      this.state.filteredpins.length === 0
    ) {
      axios({
        url: config.allpins,
        method: "POST",
        data: {
          temp: "temp"
        },
        headers: {
          "Content-Type": "application/json"
        }
      })
        .then(res => {
          let tempstate = this.state.states;
          if (res.data.data !== null) {
            res.data.data.list.map(itemmap => {
              let check = false;
              tempstate.map(itemstate => {
                if (itemmap.state === itemstate) {
                  check = true;
                }
              });
              if (check === false) {
                tempstate.push(itemmap.state);
              }
            });
            this.setState({
              allpins: res.data.data.list,
              filteredpins: res.data.data.list,
              states: tempstate
            });
          } else if (res.data.error !== undefined) {
            if (res.data.error.errorCode === 153) {
              window.location.href = "../login.html?redirect=maps";
            } else {
              Swal({
                type: "error",
                title: "Oops...",
                text: res.data.error.errorMsg
              });
            }
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

  render() {
        return (
          <div>
            <Header />
            <div className="mainbody">
              <Sidebar history={this.props.history} />
              <div className="main">
                <Filter
                  states={this.state.states}
                  selectedstate={this.state.filteredstate}
                  onChangeStates={this.handlestatefilter}
                  filter={this.state.filter}
                  onChangeFilter={this.handleFilterChange}
                  onFilterReset={this.handleReset}
                  onFilterApply={this.handleApply}
                />
                <Map
                  datapins={this.state.filteredpins}
                  additionalmarkers={this.state.additionalmarkers}
                  filter={this.state.filter}
                />
              </div>
            </div>
          </div>
        );
     
  }
}

export default Main;
