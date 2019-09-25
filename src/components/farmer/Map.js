import React, { Component } from "react";
import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";
import DRINKING_WATER_PUMP from "../../pins/strop3.png";
import ROOFTOP from "../../pins/strop2.png";
import IRRIGATION_PUMP from "../../pins/strop1.png";
import PATVAN from "../../pins/strop5patvan.png";
import MINIGRID from "../../pins/strop4.png";
import farmer from "../../pins/user.png";
import axios from "axios";
import config from "../../config.js";
import Swal from "sweetalert2";
import farmerimg from "../../pins/user.png";
const mapStyles = {
  width: "100%",
  height: "89%",
  position: "relative",
  display: "flex",
  flexFlow: "row nowrap",
  justifyContent: "center"
};

class MapList extends Component {
  constructor(props) {
    super(props);
    this.markersRendered = false;
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (
      JSON.stringify(this.props.places) === JSON.stringify(nextProps.places) &&
      this.markersRendered
    ) {
      return false;
    }
    this.markersRendered = true;
    return true;
  }
  

  render() {
    // console.log('marker')
    return (
      <span>
        {this.props.places.map((marker, index) => {
          if (marker&&marker.latitude&&marker.longitude&&marker.vertical!=='NA'&&marker.vertical!=='N.A') {
            let assetType = marker.vertical;
            let icon = {
              url: "",
              anchor: new this.props.google.maps.Point(12, 23),
              origin: new this.props.google.maps.Point(0, 0),
              scaledSize: new this.props.google.maps.Size(20, 20)
            };
            switch (assetType) {
              case "Solar Irrigation Service":
                icon.url = PATVAN;
                break;
              case "Solar Mini Grid":
                icon.url = MINIGRID;
                break;
              case "Solar Irrigation Pump":
                icon.url = IRRIGATION_PUMP;
                break;
              case "Solar Drinking Water Pump":
                icon.url = DRINKING_WATER_PUMP;
                break;
                default:
                  console.log('marker error',marker);
                  return;
                  break;
            }
            return (
              <Marker
                {...this.props}
                key={index}
                id={marker.id}
                vertical={assetType}
                icon={icon}
                position={{
                  lat: marker.latitude,
                  lng: marker.longitude
                }}
              />
            );
          }
        })}
      </span>
    );
  }
}

class MapContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showingInfoWindow: false, //Hides or the shows the infoWindow
      activeMarker: {}, //Shows the active marker upon click
      selectedPlace: { owner: {} } //Shows the infoWindow to the selected place upon a marker
    };
    this.onMarkerClick = this.onMarkerClick.bind(this);
    this.onClose = this.onClose.bind(this);
    // this.portalredirect = this.portalredirect.bind(this);
  }
  onMarkerClick(props, marker, e) {
    axios({
      url: config.farmerinfo,
      method: "POST",
      data: {
        id: marker.id,
        vertical: marker.vertical
      },
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => {
        if (res.data.data !== null) {
          let data = res.data.data;
          data["vertical"] = props.vertical;
          this.setState({
            selectedPlace: data,
            activeMarker: marker,
            showingInfoWindow: true,
            showingInfoWindowadditional: false
          });
        } else if (res.data.error !== undefined) {
          if (res.data.error.errorCode === 153) {
            window.location.href = ".../../login.html?redirect=maps";
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
        if (e.response && e.response.status === 401) {
          Swal({
            type: "error",
            title: "Unauthorized",
            text: "Please login again."
          });
          this.props.history.push({
            pathname: "/"
          });
        } else if (e.response && e.response.status === 403) {
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
  onClose(props) {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      });
    }
  }
  
  render() {
    return (
      <div className="agro">
        <Map
          id="map"
          mapTypeControl={false}
          gestureHandling={"greedy"}
          zoomControl={true}
          // zoomControlOptions= {{position :this.props.google.maps.ControlPosition.RIGHT_CENTER}}
          streetViewControl={false}
          fullscreenControl={false}
          google={this.props.google}
          zoom={5}
          style={mapStyles}
          styles={[
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
          ]}
          initialCenter={{ lat: 22.845625996700075, lng: 78.9629 }}
        >
          <MapList
            // style={{ display: "none" }}
            {...this.props}
            google={this.props.google}
            places={this.props.datapins}
            onClick={this.onMarkerClick}
          />
          <InfoWindow
            marker={this.state.activeMarker}
            visible={this.state.showingInfoWindow}
            onClose={this.onClose}
          >
            {this.state.selectedPlace !== null && (
              <div
                className="infobox clearfix"
                style={{ textTransform: "capitalize" }}
              >
                <div
                  className="header clearfix"
                  style={{
                    fontFamily: "gotham-light",
                    display: "flex",
                    justifyContent: "center",
                    fontWeight: "600"
                  }}
                >
                  <h4
                    style={{
                      color: "white",
                      fontWeight: "600",
                      textTransform: "uppercase"
                    }}
                  >
                    FARMER
                  </h4>
                </div>
                <div className="body clearfix  ">
                  <div className="row">
                    <div className="image">
                      {this.state.selectedPlace.farmerImage !== null &&
                      this.state.selectedPlace.farmerImage !== "NA" &&
                      this.state.selectedPlace.farmerImage !== "N.A" ? (
                        <img
                          className="customerimgg"
                          alt="famerimg"
                          src={this.state.selectedPlace.farmerImage}
                          // width="65%"
                        />
                      ) : (
                        <img
                          alt="placeholderfamerimg"
                          className="palceholder"
                          src={farmerimg}
                          // width="55%"
                        />
                      )}
                    </div>
                    <h4
                      style={{
                        color: "#3663b3",
                        marginBottom: "5px",
                        fontWeight: "600"
                      }}
                    >
                      {this.state.selectedPlace.name}
                    </h4>
                    <span style={{ fontSize: "15px", fontWeight: "200" }}>
                      {this.state.selectedPlace.vertical &&
                        this.state.selectedPlace.vertical}
                      {/* {this.state.selectedPlace.contactNo
                        ? ( this.state.selectedPlace.contactNo)
                        : "NA"} */}
                    </span>
                  </div>
                  <div className=" customer row">
                    <div
                      className="headerfacilities"
                      style={{ textAlign: "center" }}
                    >
                      <span>Information</span>
                    </div>
                    {this.state.selectedPlace.village !== undefined && (
                      <div className="row">
                        <b className="titlefarmermap">Village:</b>&nbsp;
                        {this.state.selectedPlace.village}
                      </div>
                    )}
                    {this.state.selectedPlace.district !== undefined && (
                      <div className="row">
                        <b className="titlefarmermap">District:</b> &nbsp;
                        {this.state.selectedPlace.district}
                      </div>
                    )}
                    {this.state.selectedPlace.state !== undefined && (
                      <div className="row">
                        <b className="titlefarmermap">State:</b> &nbsp;
                        {this.state.selectedPlace.state}
                      </div>
                    )}
                    {this.state.selectedPlace.ownLand !== undefined && (
                      <div className="row">
                        <b className="titlefarmermap">Own Land:</b> &nbsp;
                        {this.state.selectedPlace.ownLand}
                      </div>
                    )}
                    {this.state.selectedPlace.highestEducation !==
                      undefined && (
                      <div className="row">
                        <b className="titlefarmermap">Highest Education:</b>{" "}
                        &nbsp;
                        {this.state.selectedPlace.highestEducation}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </InfoWindow>
        </Map>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyCHi5ryWgN1FcZI-Hmqw3AdxJQmpopYJGk"
})(MapContainer);
