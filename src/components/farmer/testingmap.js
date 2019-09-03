import React, { Component, createRef } from "react";
import Header from "../../Header.jsx";
import Sidebar from "../../Sidebar.js";
import axios from "axios";
import { Link } from "react-router-dom";
import Filter from "./filtermap.js";
import imgmapcluster from "../../pins/iconmapcluster.png";
import user from "../../pins/user1copy.png";
import Swal from "sweetalert2";
import farmerimg from "../../pins/user.png";
import config from "../../config.js";


class DemoApp extends Component {
  constructor(props) {
    super(props)
    this.state={
      markers: [],
      filteredpins:[],
      isOpen: false,
      InfoWindowobject: {},
      filter: {
        SolarIrrigationPump: true,
        SolarDrinkingWaterPump: true,
        SolarIrrigationService: true,
        SolarMiniGrid: true
      }
    }
  }
  handleReset = () => {
    let newfilter = {
      SolarIrrigationPump: true,
      SolarDrinkingWaterPump: true,
      SolarIrrigationService: true,
      SolarMiniGrid: true
    };
    this.setState(prevState => ({
      ...prevState,
      filter: newfilter,
      filteredpins: prevState.markers
    }));
  };
  handleApply= ()=> {
    let filterpins = [];
    
    
     this.state.markers.map((item) => {
      if(item.vertical==='Solar Irrigation Pump'){
        if (this.state.filter.SolarIrrigationPump) {
          filterpins.push(item);
        }
      }
      else if(item.vertical==='Solar Drinking Water Pump'){
        if (this.state.filter.SolarDrinkingWaterPump) {
          filterpins.push(item);
        }
      }
      else if(item.vertical==='Solar Irrigation Service'){
        if (this.state.filter.SolarIrrigationService) {
          filterpins.push(item);
        }
      }
      else if(item.vertical==='Solar Mini Grid'){
        if (this.state.filter.SolarMiniGrid) {
          filterpins.push(item);
        }
      }
      
    });

    this.setState({filteredpins: filterpins});
    
  }
  handleFilterChange=(filtervalue)=> {
    
    this.setState(prevState => ({
      ...prevState,
      filter: {
        ...prevState.filter,
        [filtervalue]: !prevState.filter[filtervalue]
      }
    }));
  }

  componentDidMount() {
    axios({
      url: config.farmercoordinates,
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
          markers: res.data.data.list,
          filteredpins:  res.data.data.list
        });
      })
      .catch(e => {
        if (e.response !== undefined && e.response.status === 401) {
          Swal({
            type: "error",
            title: "Unauthorized",
            text: "Please login again."
          });
          this.props.history.push({
            pathname: "/"
          });
        } else if (e.response !== undefined && e.response.status === 403) {
          Swal({
            type: "error",
            title: "Forbidden"
          });
          // this.props.history.push({
          //   pathname: "/rms"
          // });
        } else {
          // this.setState({ isloaderactive: false });
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

      
  }

  render() {
    // console.log("state", this.state.filteredpins.length);
    return (
      <div>
        <Filter
          filter={this.state.filter}
          onChangeFilter={this.handleFilterChange}
          onFilterReset={this.handleReset}
          onFilterApply={this.handleApply}
        />
        {/* <MapWithAMarkerClusterer
          markers={this.state.filteredpins}
          isOpen={this.state.isOpen}
          InfoWindowobject={this.state.InfoWindowobject}
        /> */}

      </div>
    );
  }
}
class FarmerHeader extends Component {
  render() {
    return (
      <div className="container ">
        <nav
          style={{ backgroundColor: "#edeef0", borderBottomColor: "darkgray" }}
          className="navbar navbar-default"
        >
          <div
            className="container-fluid newfarmer"
            style={{ textAlign: "center", marginTop: "14px" }}
          >
            <Link to="/farmeredit">
              <button
                type="button"
                className="btn btn-default"
                aria-label="Right Align"
                id="drillUp"
                style={{
                  // display: "none",
                  // borderColor: "darkgray",
                  borderRadius: "0px",
                  float: "right",
                  outline: "none",
                  color: "white",
                  backgroundColor: "blue"
                }}
              >
                View Farmers
              </button>
            </Link>
            <span
              style={{
                fontFamily: "gotham-medium",
                fontSize: "large",
                color: "#b12d28"
              }}
            >
              Farmer Database In India
            </span>
          </div>
        </nav>
      </div>
    );
  }
}
class GoogleMap extends Component {
    googleMapRef = React.createRef()
  
    componentDidMount() {
      const googleMapScript = document.createElement('script')
      googleMapScript.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyCHi5ryWgN1FcZI-Hmqw3AdxJQmpopYJGk&libraries=places`
      window.document.body.appendChild(googleMapScript)
  
      googleMapScript.addEventListener('load', {
        this.googleMap = this.createGoogleMap()
        this.marker = this.createMarker()
      })
    }
  
    createGoogleMap = () =>
      new window.google.maps.Map(this.googleMapRef.current, {
        zoom: 16,
        center: {
          lat: 43.642567,
          lng: -79.387054,
        },
        disableDefaultUI: true,
      })
  
    createMarker = () =>
      new window.google.maps.Marker({
        position: { lat: 43.642567, lng: -79.387054 },
        map: this.googleMap,
      })
  
    render() {
      return (
        <div
          id="google-map"
          ref={this.googleMapRef}
          style={{ width: '400px', height: '300px' }}
        />
      )
    }
  }

class Farmer extends Component {
  render() {
    return (
      <div className="gauravwww">
        <Header kc={this.props.kc}/>
        <div className="mainbody">
          <Sidebar kc={this.props.kc} history={this.props.history} />
          <div style={{ backgroundColor: "#F2F2F2" }} className="main">
            <FarmerHeader  />
            <GoogleMap/>
          </div>
        </div>
      </div>
    );
  }
}
export default Farmer;
