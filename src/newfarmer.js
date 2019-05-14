import React, { Component } from "react";
import Header from "./Header.js";
import Sidebar from "./Sidebar.js";
import axios from "axios";
import imgmapcluster from './pins/iconmapcluster.png'
import user from "./pins/user1copy.png";
import { compose, withProps, withHandlers } from "recompose";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker
} from "react-google-maps";
const fetch = require("isomorphic-fetch");
const {
  MarkerClusterer
} = require("react-google-maps/lib/components/addons/MarkerClusterer");

const MapWithAMarkerClusterer = compose(
  withProps({
    googleMapURL:
      "https://maps.googleapis.com/maps/api/js?key=AIzaSyCHi5ryWgN1FcZI-Hmqw3AdxJQmpopYJGk&v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `90vh` }} />,
    mapElement: <div style={{ height: `100%` }} />
  }),
  withHandlers({
    onMarkerClustererClick: () => markerClusterer => {
        console.log('markerCluster',markerClusterer)
      const clickedMarkers = markerClusterer.getMarkers();
      console.log(`Current clicked markers length: ${clickedMarkers.length}`);
      console.log(clickedMarkers);
    },
    onMarkerClick:()=>markerClusterer=>{console.log('ffff',markerClusterer)}
  }),
  withScriptjs,
  withGoogleMap
)(props => (
  <GoogleMap defaultZoom={5} defaultCenter={{ lat: 22.845625996700075, lng: 78.9629 }}
  options={{style:[
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
  ]}}
  
  >
    <MarkerClusterer
      onClick={props.onMarkerClustererClick}
      averageCenter
      styles={[
        {
            // textColor: 'white',
          url: imgmapcluster,
          height: 56,
          lineHeight: 56,
          width: 56,
        },
        // {
        //     textColor: 'white',
        //   url: imgmapcluster,
        //   height: 56,
        //   lineHeight: 56,
        //   width: 56,
        // },
        // {
        //     textColor: 'white',
        //   url: imgmapcluster,
        //   height: 56,
        //   lineHeight: 56,
        //   width: 56,
        // },
        // {
        //     textColor: 'white',
        //   url: imgmapcluster,
        //   height: 56,
        //   lineHeight: 56,
        //   width: 56,
        // },
        // {
        //     textColor: 'white',
        //   url: imgmapcluster,
        //   height: 56,
        //   lineHeight: 56,
        //   width: 56,
        // },
      ]}
      enableRetinaIcons
      gridSize={60}
    >
      {props.markers.map(marker => (
        <Marker
          key={marker.photo_id}
          icon={user}
          onClick={props.onMarkerClick.bind(props,marker)}
          position={{ lat: marker.lat, lng: marker.lng }}
        />
      ))}
    </MarkerClusterer>
  </GoogleMap>
));

class DemoApp extends React.PureComponent {
  componentWillMount() {
    this.setState({ markers: [] });
  }
  
  componentDidMount() {
    // const url = [
    //   // Length issue
    //   `https://gist.githubusercontent.com`,
    //   `/farrrr/dfda7dd7fccfec5474d3`,
    //   `/raw/758852bbc1979f6c4522ab4e92d1c92cba8fb0dc/data.json`
    // ].join("");
    const url='http://staging.clarolabs.in:7060/api/rs/claro/maps/all/pins'
    axios({
        url: 'http://staging.clarolabs.in:7060/api/rs/claro/maps/all/pins',
        method: "POST",
        data: {
          temp: "temp"
        },
        headers: {
          "Content-Type": "application/json"
        }
      })
      .then(res => this.setState({ markers: res.data.data.list }))
    //   .then(data => {
    //     this.setState({ markers: data.photos });
    //   });
  }

  render() {
    return <MapWithAMarkerClusterer  markers={this.state.markers} />;
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
            {/* <Link to="/">
                <button
                  style={{
                    marginTop: "-2px",
                    backgroundColor: "transparent",
                    float: "left"
                  }}
                  type="button"
                  className="btn btn-default"
                  aria-label="Left Align"
                >
                  <span
                    className="glyphicon glyphicon-menu-left"
                    style={{ marginRight: "6px" }}
                    aria-hidden="true"
                  />
                  Home{" "}
                </button>
              </Link> */}{" "}
            <button
              type="button"
              className="btn btn-default"
              aria-label="Left Align"
              id="drillUp"
              style={{
                display: "none",
                float: "left",
                // marginRight: "30px",
                // marginTop: "10px",
                // color: "blue",
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
            <span style={{ fontSize: "large", color: "blue" }}>
              Farmer database in {this.props.label}
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
      <div>
        <Header />
        <div className="mainbody">
          <Sidebar history={this.props.history} />
          <div style={{ backgroundColor: "#F2F2F2" }} className="main">
            <FarmerHeader label={this.state.label} />
            <div style={{ marginLeft: "0" }} className="row" />
            <DemoApp />
          </div>
        </div>
      </div>
    );
  }
}
export default Farmer;
