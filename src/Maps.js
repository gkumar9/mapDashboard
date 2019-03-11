import React, { Component } from "react";
import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";
import DRINKING_WATER_PUMP from "./pins/strop3.png";
import ROOFTOP from "./pins/strop2.png";
import IRRIGATION_PUMP from "./pins/strop1.png";
import PATVAN from "./pins/strop5patvan.png";
import MINIGRID from "./pins/strop4.png";
import farmer from "./pins/user.png";
import axios from "axios";
import config from "./config.js";
import Swal from "sweetalert2";
const mapStyles = {
  width: "100%",
  height: "100%",
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
    return (
      <span>
        {this.props.places.map((marker, index) => {
          let assetType = marker.assetType;
          let icon = {
            url: "",
            anchor: new this.props.google.maps.Point(12, 23),
            origin: new this.props.google.maps.Point(0, 0),
            scaledSize: new this.props.google.maps.Size(20, 20)
          };
          switch (assetType) {
            case "PATVAN":
              icon.url = PATVAN;
              break;
            case "MINIGRID":
              icon.url = MINIGRID;
              break;
            case "IRRIGATION_PUMP":
              icon.url = IRRIGATION_PUMP;
              break;
            case "DRINKING_WATER_PUMP":
              icon.url = DRINKING_WATER_PUMP;
              break;
            case "ROOFTOP":
              icon.url = ROOFTOP;
              break;
            default:
              break;
          }
          return (
            <Marker
              {...this.props}
              key={index}
              assetId={marker.assetId}
              assetType={assetType}
              icon={icon}
              position={{
                lat: parseFloat(marker.lat),
                lng: parseFloat(marker.lng)
              }}
            />
          );
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
  }
  onMarkerClick(props, marker, e) {
    let url;
    switch (props.assetType) {
      case "PATVAN":
        url = config.patvan;
        break;
      case "MINIGRID":
        url = config.minigrid;
        break;
      case "IRRIGATION_PUMP":
        url = config.irrigation;
        break;
      case "DRINKING_WATER_PUMP":
        url = config.drinkingwater;
        break;
      case "ROOFTOP":
        url = config.rooftop;
        break;
      default:
        break;
    }
    axios({
      url: url,
      method: "POST",
      data: {
        assetId: props.assetId
      },
      headers: {
        "Content-Type": "application/json"
      }
    }).then(res => {
      if (res.data.data !== null) {
        let data = res.data.data;
        data["assetType"] = props.assetType;
        this.setState({
          selectedPlace: data,
          activeMarker: marker,
          showingInfoWindow: true
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
      <Map
        id="map"
        mapTypeControl={false}
        gestureHandling={"greedy"}
        zoomControl={false}
        streetViewControl={false}
        fullscreenControl={false}
        restriction={{
          latLngBounds: {
            north: 37.803116,
            south: 7.381437,
            west: 67.917435,
            east: 97.17622340167043
          },
          strictBounds: false
        }}
        google={this.props.google}
        zoom={5}
        style={mapStyles}
        styles={[
          { elementType: "geometry.fill", stylers: [{ color: "#F2F2F2" }] },
          {
            featureType: "water",
            elementType: "geometry",
            // stylers: [{ color: "#E3E3E3" }]
            stylers: [{ color: "#a6d2ff" }]
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
          },
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
        initialCenter={{lat:19.845625996700075,lng: 78.9629}}
      >
        <MapList
          google={this.props.google}
          places={this.props.datapins}
          onClick={this.onMarkerClick}
        />

        <InfoWindow
          className="infoWindowCard"
          pixelOffset={new this.props.google.maps.Size(190, 290)}
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}
          onClose={this.onClose}
          // disableAutoPan={true}
        >
          <div style={{ overflow: "hidden" }}>
            {this.state.selectedPlace.owner.image !== "NA" &&
            this.state.selectedPlace.owner.image !== null ? (
              <img
                src={this.state.selectedPlace.owner.image}
                alt="farmer"
                className="infoWindowImg"
              />
            ) : (
              <img src={farmer} alt="farmer" className="infoWindowImg" />
            )}
            <h4 className="infoWindowName" style={{ maxWidth: "262px" }}>
              {" "}
              {this.state.selectedPlace.owner.name}{" "}
            </h4>
            <h6 className="infoWindowName">
              {" "}
              Customer ID: {this.state.selectedPlace.id}{" "}
            </h6>
            <div>
              <ul className="infoWindowDetail">
                <li>
                  <div className="row">
                    <div className="col-xs-2">
                      <i className="fa fa-calendar" aria-hidden="true" />
                    </div>
                    <div className="col-xs-10">
                      <span>
                        Installed on{" "}
                        {this.state.selectedPlace.dateOfInstallation}
                      </span>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="row">
                    <div className="col-xs-2">
                      <i className="fa fa-map-marker" aria-hidden="true" />
                    </div>
                    <div className="col-xs-10">
                      <span>{this.state.selectedPlace.owner.block}</span>
                      <p>
                        {this.state.selectedPlace.owner.district},{" "}
                        {this.state.selectedPlace.owner.state}{" "}
                      </p>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="row">
                    <div className="col-xs-2">
                      <i className="fa fa-tint" aria-hidden="true" />
                    </div>
                    <div className="col-xs-10">
                      {this.state.selectedPlace.assetType ===
                        "IRRIGATION_PUMP" && (
                        <div>
                          <span>
                            Irrigation Pump{" "}
                            <b>
                              {this.state.selectedPlace.pumpCapacity}{" "}
                              {this.state.selectedPlace.powerType}{" "}
                              {this.state.selectedPlace.pumpType}
                            </b>
                          </span>
                          <p>
                            Solar Panel Capacity{" "}
                            {this.state.selectedPlace.panelRating}{" "}
                          </p>
                        </div>
                      )}
                      {this.state.selectedPlace.assetType === "MINIGRID" && (
                        <span>
                          Minigrid <b>{this.state.selectedPlace.assetName} </b>
                        </span>
                      )}
                      {this.state.selectedPlace.assetType === "PATVAN" && (
                        <div>
                          <span>
                            Patvan{" "}
                            <b>
                              {this.state.selectedPlace.pumpCapacity}{" "}
                              {this.state.selectedPlace.powerType}{" "}
                              {this.state.selectedPlace.pumpType}
                            </b>
                          </span>
                          <p>
                            Solar Panel Capacity{" "}
                            {this.state.selectedPlace.panelRating}{" "}
                          </p>
                        </div>
                      )}
                      {this.state.selectedPlace.assetType ===
                        "DRINKING_WATER_PUMP" && (
                        <div>
                          <span>
                            Drinking Water Pump{" "}
                            <b>
                              {this.state.selectedPlace.pumpCapacity}{" "}
                              {this.state.selectedPlace.powerType}{" "}
                              {this.state.selectedPlace.pumpType}
                            </b>
                          </span>
                          <p>
                            Solar Panel Capacity{" "}
                            {this.state.selectedPlace.panelRating}{" "}
                          </p>
                        </div>
                      )}
                      {this.state.selectedPlace.assetType === "ROOFTOP" && (
                        <div>
                          <span>Rooftop</span>
                          <p>
                            Solar Panel Capacity{" "}
                            {this.state.selectedPlace.panelRating}{" "}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </li>
              </ul>
              <div className="portal">
                {this.state.selectedPlace.assetType === "DRINKING_WATER_PUMP" ||
                this.state.selectedPlace.assetType === "IRRIGATION_PUMP" ? (
                  <div>
                    <span>Visit portal</span>
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      href={
                        "../all_rms/rmspage.html?CID=" +
                        this.state.selectedPlace.id
                      }
                    >
                      <i
                        className="fa fa-external-link-square"
                        aria-hidden="true"
                      />
                    </a>
                  </div>
                ) : (
                  <div />
                )}
              </div>
            </div>
          </div>
        </InfoWindow>
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyCHi5ryWgN1FcZI-Hmqw3AdxJQmpopYJGk"
})(MapContainer);
