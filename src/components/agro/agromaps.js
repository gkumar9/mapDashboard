import React, { Component } from "react";
import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";
import MANDI from "../../pins/pin1.png";
import OFFICE from "../../pins/pin2.png";
import MARKET from "../../pins/pin3.png";
import PROCESSING_CENTRES from "../../pins/pin4.png";
import axios from "axios";
import config from "../../config.js";
import Swal from "sweetalert2";
import democenterimg from "../../pins/democenter.png";
// import office from "../../pins/Office.png";
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
    return (
      <span>
        {this.props.places.map((marker, index) => {
          let agroAssetType = marker.agroAssetType;
          let icon = {
            url: "",
            anchor: new this.props.google.maps.Point(12, 23),
            origin: new this.props.google.maps.Point(0, 0),
            scaledSize: new this.props.google.maps.Size(20, 20)
          };
          switch (agroAssetType) {
            case "MANDI":
              icon.url = MANDI;
              break;
            case "MARKET":
              icon.url = MARKET;
              break;
            case "OFFICE":
              icon.url = OFFICE;
              break;
            case "PROCESSING_CENTRES":
              icon.url = PROCESSING_CENTRES;
              break;

            default:
              break;
          }
          return (
            <Marker
              {...this.props}
              key={index}
              agroAssetId={marker.agroAssetId}
              agroAssetType={agroAssetType}
              icon={icon}
              position={{
                lat: parseFloat(marker.latitude),
                lng: parseFloat(marker.longitude)
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
    this.portalredirect = this.portalredirect.bind(this);
  }
  onMarkerClick(props, marker, e) {
    let url;
    switch (props.agroAssetType) {
      case "MANDI":
        url = config.agromandiassets;
        break;
      case "MARKET":
        url = config.agromarket;
        break;
      case "OFFICE":
        url = config.agrooffice;
        break;
      case "PROCESSING_CENTRES":
        url = config.agrocenter;
        break;

      default:
        break;
    }
    axios({
      url: url,
      method: "POST",
      data: {
        agroAssetId: props.agroAssetId
      },
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => {
        if (res.data.data !== null) {
          let data = res.data.data;
          data["agroAssetType"] = props.agroAssetType;
          this.setState({
            selectedPlace: data,
            activeMarker: marker,
            showingInfoWindow: true
            // showingInfoWindowadditional: false
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
        if (e.response.status === 401) {
          Swal({
            type: "error",
            title: "Unauthorized",
            text: "Please login again."
          });
          this.props.history.push({
            pathname: "/"
          });
        } else if (e.response.status === 403) {
          Swal({
            type: "error",
            title: "Forbidden"
          });
        } else {
          Swal({
            type: "error",
            title: "Oops...",
            text: e
          });
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

  portalredirect(id) {
    console.log("ddd");
  }
  render() {
    return (
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
          style={{ display: "none" }}
          google={this.props.google}
          places={this.props.datapins}
          onClick={this.onMarkerClick}
        />

        <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}
          onClose={this.onClose}
        >
          <div>
            {this.state.selectedPlace !== undefined &&
              this.state.selectedPlace.agroAssetType === "MANDI" && (
                <div
                  className="infobox clearfix"
                  style={{ textTransform: "capitalize" }}
                >
                  <div
                    className="header clearfix"
                    style={{ fontFamily: "gotham-regular" }}
                  >
                    <h3 style={{ color: "#315ca6" }}>
                      {this.state.selectedPlace["name"]}
                      <br className="breakline" />
                      <small style={{ color: "#333131" }}>
                        <span style={{ textTransform: "capitalize" }}>
                          ({" "}
                          {this.state.selectedPlace[
                            "agroAssetType"
                          ].toLowerCase()}{" "}
                          )
                        </span>
                      </small>
                    </h3>
                  </div>
                  <div className="body clearfix ">
                    <div
                      className="row"
                      style={{
                        marginLeft: "0",
                        marginRight: "0",
                        fontSize: "initial",
                        fontFamily: "gotham-light",
                        marginBottom: "1em"
                      }}
                    >
                      <b>Location: </b> {this.state.selectedPlace.location}
                    </div>
                    <div
                      className="row"
                      style={{
                        marginLeft: "0",
                        marginRight: "0",
                        fontSize: "initial",
                        fontFamily: "gotham-light",
                        marginBottom: "1em"
                      }}
                    >
                      <b>City: </b> {this.state.selectedPlace.city}
                    </div>
                    <div
                      className="row"
                      style={{
                        marginLeft: "0",
                        marginRight: "0",
                        fontSize: "initial",
                        fontFamily: "gotham-light",
                        marginBottom: "1em"
                      }}
                    >
                      <b>State: </b> {this.state.selectedPlace.state}
                    </div>
                  </div>
                </div>
              )}
            {this.state.selectedPlace !== undefined &&
              this.state.selectedPlace.agroAssetType === "MARKET" && (
                <div
                  className="infobox clearfix"
                  style={{ textTransform: "capitalize" }}
                >
                  <div
                    className="header clearfix"
                    style={{ fontFamily: "gotham-regular" }}
                  >
                    <h3 style={{ color: "#315ca6" }}>
                      {this.state.selectedPlace["location"]}
                      <br className="breakline" />
                      <small style={{ color: "#333131" }}>
                        <span style={{ textTransform: "capitalize" }}>
                          {" ("}{" "}
                          {this.state.selectedPlace[
                            "agroAssetType"
                          ].toLowerCase()}{" "}
                          )
                        </span>
                      </small>
                    </h3>
                  </div>
                  <div className="body clearfix ">
                    <div
                      className="row"
                      style={{
                        marginLeft: "0",
                        marginRight: "0",
                        fontSize: "initial",
                        fontFamily: "gotham-light",
                        marginBottom: "1em"
                      }}
                    >
                      <b>Area: </b> {this.state.selectedPlace.area}
                    </div>
                    <div
                      className="row"
                      style={{
                        marginLeft: "0",
                        marginRight: "0",
                        fontSize: "initial",
                        fontFamily: "gotham-light",
                        marginBottom: "1em"
                      }}
                    >
                      <b>Population: </b> {this.state.selectedPlace.population}
                    </div>
                    <div
                      className="row"
                      style={{
                        marginLeft: "0",
                        marginRight: "0",
                        fontSize: "initial",
                        fontFamily: "gotham-light",
                        marginBottom: "1em"
                      }}
                    >
                      <b>Type: </b> {this.state.selectedPlace.type}
                    </div>
                    <div
                      className="row"
                      style={{
                        marginLeft: "0",
                        marginRight: "0",
                        fontSize: "initial",
                        fontFamily: "gotham-light",
                        marginBottom: "1em"
                      }}
                    >
                      <b>State: </b> {this.state.selectedPlace.state}
                    </div>
                  </div>
                </div>
              )}
            {this.state.selectedPlace !== undefined &&
              this.state.selectedPlace.agroAssetType === "OFFICE" && (
                <div
                  className="infobox clearfix"
                  style={{ textTransform: "capitalize" }}
                >
                  <div
                    className="header clearfix"
                    style={{ fontFamily: "gotham-regular" }}
                  >
                    <h3 style={{ color: "#315ca6" }}>
                      {this.state.selectedPlace["location"]}
                      <br className="breakline" />
                      <small style={{ color: "#333131" }}>
                        <span style={{ textTransform: "capitalize" }}>
                          ({" "}
                          {this.state.selectedPlace[
                            "agroAssetType"
                          ].toLowerCase()}{" "}
                          )
                        </span>
                      </small>
                    </h3>
                  </div>
                  <div className="body clearfix ">
                    <div
                      className="row"
                      style={{
                        marginLeft: "0",
                        marginRight: "0",
                        fontSize: "initial",
                        fontFamily: "gotham-light",
                        marginBottom: "1em"
                      }}
                    >
                      <b>State: </b> {this.state.selectedPlace.state}
                    </div>
                  </div>
                </div>
              )}
            {this.state.selectedPlace !== undefined &&
              this.state.selectedPlace.agroAssetType ===
                "PROCESSING_CENTRES" && (
                <div
                  className="infobox clearfix"
                  style={{ textTransform: "capitalize" }}
                >
                  <div
                    className="header clearfix"
                    style={{ fontFamily: "gotham-regular" }}
                  >
                    <h3 style={{ color: "#315ca6" }}>
                      {this.state.selectedPlace["location"]}
                      <br className="breakline" />
                      <small style={{ color: "#333131" }}>
                        <span style={{ textTransform: "capitalize" }}>
                          {" ("}{" "}
                          {this.state.selectedPlace["agroAssetType"]
                            .toLowerCase()
                            .replace("_", " ")}{" "}
                          )
                        </span>
                      </small>
                    </h3>
                  </div>
                  <div className="body clearfix ">
                    <div className="image">
                      {this.state.selectedPlace.image !== null &&
                      this.state.selectedPlace.image !== "NA" &&
                      this.state.selectedPlace.image !== "0" ? (
                        <img
                          className="famrerimggg"
                          alt="famerimg"
                          src={this.state.selectedPlace.farmerImage}
                          width="65%"
                        />
                      ) : (
                        <img
                          alt="placeholderfamerimg"
                          className="palceholder"
                          style={{ margin: "2.5em 0 0em 1em" }}
                          src={democenterimg}
                          width="55%"
                        />
                      )}
                    </div>
                    <div className="column">
                      <div className="row">
                        <div
                          className="row"
                          style={{
                            marginLeft: "0",
                            marginRight: "0",
                            fontSize: "initial",
                            fontFamily: "gotham-light",
                            marginBottom: "1em"
                          }}
                        >
                          <b>Facilities: </b>{" "}
                          {this.state.selectedPlace.facilities}
                        </div>
                        <div
                          className="row"
                          style={{
                            marginLeft: "0",
                            marginRight: "0",
                            fontSize: "initial",
                            fontFamily: "gotham-light",
                            marginBottom: "1em"
                          }}
                        >
                          <b>Processing Goods: </b>{" "}
                          {this.state.selectedPlace.processingGoods}
                        </div>
                        <div
                          className="row"
                          style={{
                            marginLeft: "0",
                            marginRight: "0",
                            fontSize: "initial",
                            fontFamily: "gotham-light",
                            marginBottom: "1em"
                          }}
                        >
                          <b>Type: </b> {this.state.selectedPlace.type}
                        </div>
                        <div
                          className="row"
                          style={{
                            marginLeft: "0",
                            marginRight: "0",
                            fontSize: "initial",
                            fontFamily: "gotham-light",
                            marginBottom: "1em"
                          }}
                        >
                          <b>State: </b> {this.state.selectedPlace.state}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
          </div>
        </InfoWindow>
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyCHi5ryWgN1FcZI-Hmqw3AdxJQmpopYJGk"
})(MapContainer);
