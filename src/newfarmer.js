import React, { Component } from "react";
import Header from "./Header.js";
import Sidebar from "./Sidebar.js";
import axios from "axios";
import { Link } from "react-router-dom";
import imgmapcluster from "./pins/iconmapcluster.png";
// import imgmapcluster1 from "./pins/iconmapclustercopy.png";
// import imgmapcluster2 from "./pins/iconmapclustercopy2.png";
// import imgmapcluster3 from "./pins/iconmapclustercopy3.png";
// import imgmapcluster4 from "./pins/iconmapclustercopy4.png";
import user from "./pins/user1copy.png";
import Centre from "./pins/Processing Centre.png";
import office from "./pins/Claro Offices.png";
import market from "./pins/Market - Icon.png";

import farmerimg from "./pins/user.png";
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
import config from "./config.js";
const {
  MarkerClusterer
} = require("react-google-maps/lib/components/addons/MarkerClusterer");

const checkPropsChange = (props, nextProps) => {
  return nextProps.markers.length !== props.markers.length;
};

const MyMarkerClusterer = shouldUpdate(checkPropsChange)(props => {
  const {
    onMarkerClick,
    additionalmarkerscollectioncenter,
    additionalmarkersmarketserved,
    additionalmarkersoffice,
    markers,
    ...clusterProps
  } = props;
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
    containerElement: <div style={{ height: `87vh` }} />,
    mapElement: <div style={{ height: `100%` }} />
  }),
  withStateHandlers(
    { InfoWindowobject: null, InfoWindowobjectadditional: null },
    {
      setInfoWindow: () => value => ({ InfoWindowobject: value }),
      setInfoWindowadditional: () => value => ({
        InfoWindowobjectadditional: value
      })
    }
  ),
  withStateHandlers(
    { isOpen: false, isOpenadditional: false },
    {
      onToggleOpen: ({ isOpen }) => () => ({
        isOpen: !isOpen
      }),
      onToggleOpenadditional: ({ isOpenadditional }) => () => ({
        isOpenadditional: !isOpenadditional
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
          id: markerss.id
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
    },
    onadditionalMarkerClick: props => markersss => {
      const { setInfoWindowadditional, onToggleOpenadditional } = props;
      setInfoWindowadditional(markersss);
      onToggleOpenadditional();
    }
  }),
  withScriptjs,
  withGoogleMap
)(props => (
  <GoogleMap
    defaultZoom={5}
    defaultCenter={{ lat: 22.845625996700075, lng: 78.9629 }}
    options={{
      gestureHandling: "greedy",
      // zoomControl:true,
      // disableDefaultUI:true,
      // mapTypeControlOptions:{position: 'TOP_CENTER'},
      // zoomControlOptions: { position: 3, style: 4 },
      streetViewControl: false,
      fullscreenControl: false,
      
      styles: [
        // { elementType: "geometry.fill", stylers: [{ color: "#F2F2F2" }] },
        // {
        //   featureType: "water",
        //   elementType: "geometry",
        //   // stylers: [{ color: "#E3E3E3" }]
        //   // stylers: [{ color: "#ACC8F2" }]
        // },
        // {
        //   featureType: "transit.line",
        //   elementType: "geometry",
        //   stylers: [{ visibility: "off" }]
        // },
        // {
        //   featureType: "road",
        //   elementType: "labels",  
        //   stylers: [{ visibility: "off" }]
        // },
        // {
        //   featureType: "road",
        //   elementType: "geometry",
        //   stylers: [{ visibility: "off" }]
        // }
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
    <MyMarkerClusterer
      onClick={props.onMarkerClustererClick}
      minimumClusterSize={2}
      averageCenter
      onMarkerClick={props.onMarkerClick}
      markers={props.markers}
      additionalmarkerscollectioncenter={
        props.additionalmarkerscollectioncenter
      }
      additionalmarkersmarketserved={props.additionalmarkersmarketserved}
      additionalmarkersoffice={props.additionalmarkersoffice}
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
      gridSize={93}
    />
    {props.additionalmarkerscollectioncenter.map((marker, index) => (
      <Marker
        key={index}
        icon={Centre}
        onClick={props.onadditionalMarkerClick.bind(props, marker)}
        position={{ lat: marker.latitude, lng: marker.longitude }}
      />
    ))}
    {props.additionalmarkersmarketserved.map((marker, index) => (
      <Marker
        key={index}
        icon={market}
        onClick={props.onadditionalMarkerClick.bind(props, marker)}
        position={{ lat: marker.latitude, lng: marker.longitude }}
      />
    ))}
    {props.additionalmarkersoffice.map((marker, index) => (
      <Marker
        key={index}
        icon={office}
        onClick={props.onadditionalMarkerClick.bind(props, marker)}
        position={{ lat: marker.latitude, lng: marker.longitude }}
      />
    ))}
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
                  props.InfoWindowobject.farmerImage !== "NA" ? (
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
    {props.isOpenadditional && props.InfoWindowobjectadditional !== null && (
      <div >
        <InfoWindow
          position={{
            lat: props.InfoWindowobjectadditional.latitude,
            lng: props.InfoWindowobjectadditional.longitude
          }}
          onCloseClick={props.onToggleOpenadditional}
        >
          {props.InfoWindowobjectadditional !== null && (
            <div className="additional">
            <div
              className="infobox clearfix"
              style={{ textTransform: "capitalize" }}
            >
              <div className="header clearfix" style={{fontFamily:'gotham-regular'}}>
                <h3 style={{color:'#315ca6'}}>
                  {props.InfoWindowobjectadditional.name}{" "}
                  <br className="breakline" />
                  <small>{props.InfoWindowobjectadditional.what}</small>
                </h3>
              </div>
              <div className="body clearfix ">
                  <div className="row" style={{marginLeft:'0',marginRight:'0',fontSize:'initial',fontFamily:'gotham-light',marginBottom:'1em'}}>
                    <b>Type: </b> {props.InfoWindowobjectadditional.type}
                  </div>
                  <div className="row" style={{marginLeft:'0',marginRight:'0',fontSize:'initial',fontFamily:'gotham-light',marginBottom:'1em'}}>
                    <b>Latitude: </b> {props.InfoWindowobjectadditional.latitude}
                  </div>
                  <div className="row" style={{marginLeft:'0',marginRight:'0',fontSize:'initial',fontFamily:'gotham-light'}}>
                    <b>Longitude: </b> {props.InfoWindowobjectadditional.longitude}
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
    this.setState({
      markers: [],
      isOpen: false,
      InfoWindowobject: {},
      additionalmarkerscollectioncenter: [],
      additionalmarkersmarketserved: [],
      additionalmarkersoffice: []
    });
  }

  componentDidMount() {
    let tempadditionalmarkerscollectioncenter = [
      {
        latitude: 27.45805556,
        longitude: 80.58944444,
        name: "Ucchauli",
        type: "Mini-Grid",
        what:'Collection / Processing Centres'
      },
      {
        latitude: 27.45805556,
        longitude: 80.58944444,
        name: "Govindpur",
        type: "Mini-Grid",
        what:'Collection / Processing Centres'
      },
      {
        latitude: 28.26083333,
        longitude: 80.11444444,
        name: "Bicchauli",
        type: "Mini-Grid",
        what:'Collection / Processing Centres'
      },
      {
        latitude: 27.41305556,
        longitude: 80.76027778,
        name: "Ramgarh",
        type: "Mini-Grid",
        what:'Collection / Processing Centres'
      },
      {
        latitude: 26.69333333,
        longitude: 85.68611111,
        name: "Takia",
        type: "Mini-Grid",
        what:'Collection / Processing Centres'
      },
      {
        latitude: 20.615156,
        longitude: 77.5035243,
        name: "Kamragaon",
        type: "Procurement",
        what:'Collection / Processing Centres'
      },
      {
        latitude: 28.875826,
        longitude: 77.106487,
        name: "Kundli	",
        type: "Processing",
        what:'Collection / Processing Centres'
      },
      {
        latitude: 27.01222222,
        longitude: 84.69888889,
        name: "Ramchandrapur",
        type: "Mini-Grid",
        what:'Collection / Processing Centres'
      }
    ];
    let tempadditionalmarkersmarketserved = [
      {
        latitude: 28.7140497,
        longitude: 77.1661905,
        name: "NCR",
        type: "Present Market",
        what:'Markets Served'
      },
      {
        latitude: 26.8424945,
        longitude: 80.8751914,
        name: "Lucknow",
        type: "Planned Market",
        what:'Markets Served'
      },
      {
        latitude: 26.4474128,
        longitude: 80.198295,
        name: "Kanpur",
        type: "Planned Market",
        what:'Markets Served'
      },
      {
        latitude: 25.6081756,
        longitude: 85.0730021,
        name: "Patna",
        type: "Planned Market",
        what:'Markets Served'
      },
      {
        latitude: 25.3209013,
        longitude: 82.9210681,
        name: "Varanasi",
        type: "Planned Market",
        what:'Markets Served'
      }
    ];
    let tempadditionalmarkersoffice = [
      {
        latitude: 28.52356,
        longitude: 77.194194,
        type:'Corporate Office',
        name: "Delhi",
        what:'Office'
      },
      {
        latitude: 25.6226064,
        longitude: 85.1277454,
        type:'Off-Site',
        name: "Patna",
        what:'Office'
        
      },
      {
        latitude: 26.8746814,
        longitude: 80.9729577,
        type:'Off-Site',
        name: "Lucknow",
        what:'Office'
        
      },
      {
        latitude: 23.167633,
        longitude: 79.901402,
        type:'Off-Site',
        name: "Jabalpur",
        what:'Office'
      }
    ];

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
      this.setState({
        markers: res.data.data.list,
        additionalmarkerscollectioncenter: tempadditionalmarkerscollectioncenter,
        additionalmarkersmarketserved: tempadditionalmarkersmarketserved,
        additionalmarkersoffice: tempadditionalmarkersoffice
      });
    });
  }

  render() {
    // console.log("state", this.state);
    return (
      <MapWithAMarkerClusterer
        markers={this.state.markers}
        additionalmarkerscollectioncenter={
          this.state.additionalmarkerscollectioncenter
        }
        additionalmarkersmarketserved={this.state.additionalmarkersmarketserved}
        additionalmarkersoffice={this.state.additionalmarkersoffice}
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
                Add/edit Farmer
              </button>
            </Link>
            <span style={{ fontFamily:'gotham-medium',fontSize: "large", color: "#b12d28" }}>
              Farmer Database In India
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
