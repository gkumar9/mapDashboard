import React, { Component } from "react";
import Header from "./Header.js";
import Sidebar from "./Sidebar.js";
import axios from "axios";
import imgmapcluster from "./pins/iconmapcluster.png";
import imgmapcluster1 from "./pins/iconmapclustercopy.png";
import imgmapcluster2 from "./pins/iconmapclustercopy2.png";
import imgmapcluster3 from "./pins/iconmapclustercopy3.png";
import imgmapcluster4 from "./pins/iconmapclustercopy4.png";
import user from "./pins/user1copy.png";
import farmerimg from "./pins/user.png";
import { compose, withProps, withHandlers, withStateHandlers } from "recompose";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  InfoWindow
} from "react-google-maps";
import config from "./config.js";
const {
  MarkerClusterer
} = require("react-google-maps/lib/components/addons/MarkerClusterer");

const MapWithAMarkerClusterer = compose(
  withProps({
    googleMapURL:
      "https://maps.googleapis.com/maps/api/js?key=AIzaSyCHi5ryWgN1FcZI-Hmqw3AdxJQmpopYJGk&v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `87vh` }} />,
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
      const clickedMarkers = markerClusterer.getMarkers();
    },
    onMarkerClick: props => markerss => {
      const { setInfoWindow, onToggleOpen } = props;

      axios({
        url: config.farmerinfo,
        method: "POST",
        data: {
          uid: markerss.uid,
          uidType: markerss.uidType
        },
        headers: {
          "Content-Type": "application/json"
        }
      })
        .then(res => {
          res.data.data["latitude"] = markerss.latitude;
          res.data.data["longitude"] = markerss.longitude;
          console.log(res.data.data);
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
    defaultCenter={{ lat: 22.845625996700075, lng: 78.9629 }}
    options={{
      gestureHandling:'greedy',
      // zoomControl:true,
      // disableDefaultUI:true,
      // mapTypeControlOptions:{position: 'TOP_CENTER'},
      zoomControlOptions: { position: 3,style:4 },
      streetViewControl:false,
      fullscreenControl:false,
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
        // {
        //   featureType: "water",
        //   elementType: "labels.text.fill",
        //   stylers: [{ color: "#515c6d" }]
        // },
        // {
        //   featureType: "water",
        //   elementType: "labels.text.stroke",
        //   stylers: [{ color: "#17263c" }]
        // }
      ]
    }}
  >
    <MarkerClusterer
      onClick={props.onMarkerClustererClick}
      minimumClusterSize={10}
      averageCenter
      styles={[
        {
          textColor: "white",
          url: imgmapcluster,
          height: 68,
          lineHeight: 3,
          width: 70
        }
        // {
        //   url: imgmapcluster1,
        //   height: 68,
        //   lineHeight: 3,
        //   width: 70	,
        //   textColor:"white",
        // },
        // {
        //   url: imgmapcluster2,
        //   height: 68,
        //   lineHeight: 3,
        //   width: 70	,
        //   textColor:"white",
        // },
        // {
        //   url: imgmapcluster3,
        //   height: 68,
        //   lineHeight: 3,
        //   width: 70	,
        //   textColor:"white",
        // },
        // {
        //   url: imgmapcluster4,
        //   height: 68,
        //   lineHeight: 3,
        //   width: 70	,
        //   textColor:"white",
        // }
      ]}
      enableRetinaIcons
      gridSize={60}
    >
      {props.markers.map((marker, index) => (
        <Marker
          key={index}
          icon={user}
          onClick={props.onMarkerClick.bind(props, marker)}
          position={{ lat: marker.latitude, lng: marker.longitude }}
        />
      ))}
    </MarkerClusterer>
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
            <div className="infobox clearfix" style={{ textTransform: 'capitalize' }}>
              <div className="header clearfix">
                <h3>
                  {props.InfoWindowobject.name}
                  <small style={{ color: "#333131" }}>{"  ( "}
                    {props.InfoWindowobject.vertical}
                    {" )"}</small>
                </h3>
              </div>
              <div className="body clearfix ">
                <div className="image">
                  {(props.InfoWindowobject.farmerImage !== null&&props.InfoWindowobject.farmerImage!=='NA') ? (
                    <img
                    className="famrerimggg"
                    alt="famerimg"
                      src={props.InfoWindowobject.farmerImage}
                      width="65%"
                      
                    />
                  ) : (
                    <img alt="placeholderfamerimg" className="palceholder" src={farmerimg} width="55%" />
                  )}
                </div>
                <div className="column">
                  <div className="row">
                    <div className="col-md-5 ">
                      <div  className="row farmerrow">
                        <div className="col-md-5 col-xs-6">
                          <span className="farmerportalfont">
                            <b>Phone</b>
                          </span>
                        </div>
                        <div className="col-md-7 col-xs-6">
                        {props.InfoWindowobject.contactNo!=='NA'?(
                          <span className="farmerportalfont" >
                            
                          +91{props.InfoWindowobject.contactNo}
                        </span>
                        ):(<span className="farmerportalfont" >
                            
                        {props.InfoWindowobject.contactNo}
                      </span>)}
                          
                        </div>
                      </div>
                      <div  className="row farmerrow">
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
                      <div  className="row farmerrow">
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
                      <div  className="row farmerrow">
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
                      {/* <div  className="row farmerrow">
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
                      </div> */}
                      <div  className="row farmerrow">
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
                      <div  className="row farmerrow">
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

                      <div  className="row farmerrow">
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
                      <div  className="row farmerrow">
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
  componentWillMount() {
    this.setState({ markers: [], isOpen: false, InfoWindowobject: {} });
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
    }).then(res => {
      this.setState({ markers: res.data.data.list });
    });
  }

  render() {
    // console.log("state", this.state);
    return (
      <MapWithAMarkerClusterer
        markers={this.state.markers}
        isOpen={this.state.isOpen}
        InfoWindowobject={this.state.InfoWindowobject}
      />
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
            className="container-fluid"
            style={{ textAlign: "center", marginTop: "10px" }}
          >
            <button
              type="button"
              className="btn btn-default"
              aria-label="Left Align"
              id="drillUp"
              style={{
                display: "none",
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
            <span style={{ fontSize: "large" }}>Farmer database in India</span>
          </div>
        </nav>
      </div>
    );
  }
}

class Farmer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="gauravwww">
        <Header />
        <div className="mainbody">
          <Sidebar history={this.props.history} />
          <div style={{ backgroundColor: "#F2F2F2" }} className="main">
            <FarmerHeader label={this.state.label} />
            {/* <div style={{ marginLeft: "0" }} className="row gaurav" /> */}
            <DemoApp />
          </div>
        </div>
      </div>
    );
  }
}
export default Farmer;
