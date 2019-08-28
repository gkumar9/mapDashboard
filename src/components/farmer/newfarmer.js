import React, { Component } from "react";
import Header from "../../Header.js";
import Sidebar from "../../Sidebar.js";
import axios from "axios";
import { Link } from "react-router-dom";
import Filter from "./filtermap.js";
import imgmapcluster from "../../pins/iconmapcluster.png";
import user from "../../pins/user1copy.png";
import Swal from "sweetalert2";
import farmerimg from "../../pins/user.png";
import {
  compose,
  withProps,
  withHandlers,
  withStateHandlers,
  shouldUpdate
} from "recompose";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  InfoWindow
} from "react-google-maps";
import config from "../../config.js";
const {
  MarkerClusterer
} = require("react-google-maps/lib/components/addons/MarkerClusterer");

const checkPropsChange = (props, nextProps) => {
  // console.log('check',nextProps.markers.length,props.markers.length)
  return nextProps.markers.length !== props.markers.length;
};

const MyMarkerClusterer = shouldUpdate(checkPropsChange)(props => {
  const { onMarkerClick, markers, ...clusterProps } = props;
  // console.log("props:",props);
  return (
    <MarkerClusterer {...clusterProps}>
      {props.markers.map((marker, index) => (
        <Marker
          key={index}
          icon={user}
          onClick={props.onMarkerClick.bind(props, marker)}
          position={{ lat: marker.latitude, lng: marker.longitude }}
        />
      ))}
    </MarkerClusterer>
  );
});

const MapWithAMarkerClusterer = compose(
  withProps({
    googleMapURL:
      "https://maps.googleapis.com/maps/api/js?key=AIzaSyCHi5ryWgN1FcZI-Hmqw3AdxJQmpopYJGk&v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `90vh` }} />,
    mapElement: <div style={{ height: `100%` }} />
  }),
  withStateHandlers(
    { InfoWindowobject: null },
    {
      setInfoWindow: () => value => ({ InfoWindowobject: value })
    }
  ),
  withStateHandlers(
    { isOpen: false },
    {
      onToggleOpen: ({ isOpen }) => () => ({
        isOpen: !isOpen
      })
    }
  ),
  withHandlers({
    onMarkerClustererClick: () => markerClusterer => {
      
      markerClusterer.getMarkers();
      
    },
    onMarkerClick: props => markerss => {
      const { setInfoWindow, onToggleOpen } = props;

      axios({
        url: config.farmerinfo,
        method: "POST",
        data: {
          id: markerss.id,
          vertical: markerss.vertical
        },
        headers: {
          "Content-Type": "application/json"
        }
      })
        .then(res => {
          res.data.data["latitude"] = markerss.latitude;
          res.data.data["longitude"] = markerss.longitude;

          setInfoWindow(res.data.data);
          onToggleOpen();
        })
        .catch(e => {
          alert(e);
        });
    }
  }),
  withScriptjs,
  withGoogleMap
)(props => (
  <GoogleMap
    defaultZoom={5}
    defaultCenter={{ lat: 21.045625996700075, lng: 78.9629 }}
    options={{
      gestureHandling: "greedy",
      streetViewControl: false,
      fullscreenControl: false,
      zoomControl: true,
      mapTypeControl:false,
      styles: [
        { elementType: "geometry.fill", stylers: [{ color: "#F2F2F2" }] },
        {
          featureType: "water",
          elementType: "geometry",
          // stylers: [{ color: "#E3E3E3" }]
          stylers: [{ color: "#ACC8F2" }]
        },
        {
          featureType: "transit.line",
          elementType: "geometry",
          stylers: [{ visibility: "off" }]
        },
        {
          featureType: "road",
          elementType: "labels",
          stylers: [{ visibility: "off" }]
        },
        {
          featureType: "road",
          elementType: "geometry",
          stylers: [{ visibility: "off" }]
        }
      ]
    }}
  >
    {/* {props.markers.map((marker, index) => (
        <Marker
          key={index}
          icon={user}
          onClick={props.onMarkerClick.bind(props, marker)}
          position={{ lat: marker.latitude, lng: marker.longitude }}
        />
      ))} */}
    <MyMarkerClusterer
      onClick={props.onMarkerClustererClick}
      minimumClusterSize={2}
      averageCenter
      onMarkerClick={props.onMarkerClick}
      markers={props.markers}
      styles={[
        {
          textColor: "white",
          url: imgmapcluster,
          height: 68,
          lineHeight: 3,
          width: 70
        }
      ]}
      enableRetinaIcons
      gridSize={80}
    />

    {props.isOpen && props.InfoWindowobject !== null && (
      <div>
        <InfoWindow
          position={{
            lat: props.InfoWindowobject.latitude,
            lng: props.InfoWindowobject.longitude
          }}
          onCloseClick={props.onToggleOpen}
        >
          {props.InfoWindowobject !== null && (
            <div
              className="infobox clearfix"
              style={{ textTransform: "capitalize" }}
            >
              <div className="header clearfix">
                <h3>
                  {props.InfoWindowobject.name} <br className="breakline" />
                  <small style={{ color: "#333131" }}>
                    ( {props.InfoWindowobject.vertical} )
                  </small>
                </h3>
              </div>
              <div className="body clearfix ">
                <div className="image">
                  {props.InfoWindowobject.farmerImage !== null &&
                  props.InfoWindowobject.farmerImage !== "NA"&&
                  props.InfoWindowobject.farmerImage !== "N.A" ? (
                    <img
                      className="famrerimggg"
                      alt="famerimg"
                      src={props.InfoWindowobject.farmerImage}
                      width="65%"
                    />
                  ) : (
                    <img
                      alt="placeholderfamerimg"
                      className="palceholder"
                      src={farmerimg}
                      width="55%"
                    />
                  )}
                </div>
                <div className="column">
                  <div className="row">
                    <div className="col-md-5 ">
                      <div className="row farmerrow">
                        <div className="col-md-5 col-xs-6">
                          <span className="farmerportalfont">
                            <b>Phone</b>
                          </span>
                        </div>
                        <div className="col-md-7 col-xs-6">
                          {props.InfoWindowobject.contactNo !== "NA" ? (
                            <span className="farmerportalfont">
                              +91{props.InfoWindowobject.contactNo}
                            </span>
                          ) : (
                            <span className="farmerportalfont">
                              {props.InfoWindowobject.contactNo}{" "}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="row farmerrow">
                        <div className="col-md-5 col-xs-6">
                          <span className="farmerportalfont">
                            <b>Village</b>
                          </span>
                        </div>
                        <div className="col-md-7 col-xs-6">
                          <span className="farmerportalfont">
                            {props.InfoWindowobject.village}
                          </span>
                        </div>
                      </div>
                      <div className="row farmerrow">
                        <div className="col-md-5 col-xs-6">
                          <span className="farmerportalfont">
                            <b>District</b>
                          </span>
                        </div>
                        <div className="col-md-7 col-xs-6">
                          <span className="farmerportalfont">
                            {props.InfoWindowobject.district}
                          </span>
                        </div>
                      </div>
                      <div className="row farmerrow">
                        <div className="col-md-5 col-xs-6">
                          <span className="farmerportalfont">
                            <b>State</b>
                          </span>
                        </div>
                        <div className="col-md-7 col-xs-6">
                          <span className="farmerportalfont">
                            {props.InfoWindowobject.state}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-7 ">
                      {/*
      <div className="row farmerrow">
        <div className="col-md-6 col-xs-6">
          <span className="farmerportalfont">
            <b>Intervention Type</b>
          </span>
        </div>
        <div className="col-md-6 col-xs-6">
          <span className="farmerportalfont">
            {props.InfoWindowobject.vertical}
          </span>
        </div>
      </div>
      */}
                      <div className="row farmerrow">
                        <div className="col-md-7 col-xs-6">
                          <span className="farmerportalfont">
                            <b>Intervention Size</b>
                          </span>
                        </div>
                        <div className="col-md-5 col-xs-6">
                          <span className="farmerportalfont">
                            {props.InfoWindowobject.interventionSize}
                          </span>
                        </div>
                      </div>
                      <div className="row farmerrow">
                        <div className="col-md-7 col-xs-6">
                          <span className="farmerportalfont">
                            <b>Date Of Installation</b>
                          </span>
                        </div>
                        <div className="col-md-5 col-xs-6">
                          <span className="farmerportalfont">
                            {props.InfoWindowobject.registrationDate}
                          </span>
                        </div>
                      </div>

                      <div className="row farmerrow">
                        <div className="col-md-7 col-xs-6">
                          <span className="farmerportalfont">
                            <b>Latitude</b>
                          </span>
                        </div>
                        <div className="col-md-5 col-xs-6">
                          <span className="farmerportalfont">
                            {props.InfoWindowobject.latitude}
                          </span>
                        </div>
                      </div>
                      <div className="row farmerrow">
                        <div className="col-md-7 col-xs-6">
                          <span className="farmerportalfont">
                            <b>Longitude</b>
                          </span>
                        </div>
                        <div className="col-md-5 col-xs-6">
                          <span className="farmerportalfont">
                            {props.InfoWindowobject.longitude}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </InfoWindow>
      </div>
    )}
  </GoogleMap>
));

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
          window.location.reload();
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
        {/* <Filter
          filter={this.state.filter}
          onChangeFilter={this.handleFilterChange}
          onFilterReset={this.handleReset}
          onFilterApply={this.handleApply}
        /> */}
        <MapWithAMarkerClusterer
          markers={this.state.filteredpins}
          isOpen={this.state.isOpen}
          InfoWindowobject={this.state.InfoWindowobject}
        />
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

class Farmer extends Component {


  render() {
    return (
      <div className="gauravwww">
        <Header  kc={this.props.kc} />
        <div className="mainbody">
          <Sidebar kc={this.props.kc} history={this.props.history} />
          <div style={{ backgroundColor: "#F2F2F2" }} className="main">
            <FarmerHeader  />
            <DemoApp />
          </div>
        </div>
      </div>
    );
  }
}
export default Farmer;
