import React, { Component } from "react";
import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";
import MANDI from "../../pins/pin1.png";
import OFFICE from "../../pins/pin2.png";
import MARKET from "../../pins/pin3.png";
import PROCESSING_CENTRES from "../../pins/pin4.png";
import CUSTOMER from "../../pins/pin5.png";
import axios from "axios";
import config from "../../config.js";
import Swal from "sweetalert2";
import democenterimg from "../../pins/Coming Soon.png";
import Irrigationicon from "../../pins/Irrigation.png";
import Powericon from "../../pins/Power Supply.png";
import Oilicon from "../../pins/Oil Expeller.png";
import Flouricon from "../../pins/Flour Mill.png";
import Spicesicon from "../../pins/Spices.png";
import Corriandericon from "../../pins/Coriander.png";
import Wheaticon from "../../pins/wheat.png";
import Mustardicon from "../../pins/Mustard.png";
import Coldicon from "../../pins/Cold Storage.png";
import Ripeningicon from "../../pins/Cold Storage.png";
import Bananasicon from "../../pins/banana.png";
import Procurementicon from "../../pins/Procurement.png";
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
            case "CUSTOMER":
              icon.url = CUSTOMER;
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
      case "CUSTOMER":
        url = config.agrocustomer;
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
        if (e.response !== undefined && e.response.status === 401) {
          window.location.reload();
        } else if (e.response !== undefined && e.response.status === 403) {
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
                      style={{
                        fontFamily: "gotham-light",
                        display: "flex",
                        justifyContent: "center",
                        fontWeight: "600"
                      }}
                    >
                      <h4 style={{ color: "white", fontWeight: "600" }}>
                        {/* {this.state.selectedPlace["name"]} */}
                        MANDI
                        {/* <br className="breakline" />
                        <small style={{ color: "#333131" }}>
                          <span style={{ textTransform: "capitalize" }}>
                            ({" "}
                            {this.state.selectedPlace[
                              "agroAssetType"
                            ].toLowerCase()}{" "}
                            )
                          </span>
                        </small> */}
                      </h4>
                    </div>
                    <div className="body clearfix ">
                      <div className="row" style={{padding: '0.2em'}}>
                        <div className="image">
                          {this.state.selectedPlace.image &&
                          this.state.selectedPlace.image !== "NA" &&
                          this.state.selectedPlace.image !== "0" ? (
                            <img
                              alt="famerimg"
                              className="customerimgg"
                              src={this.state.selectedPlace.image}
                              // width="65%"
                            />
                          ) : (
                            <img
                              alt="placeholderfamerimg"
                              className="palceholder"
                              // style={{ margin: "2.5em 0 0em 1em" }}
                              src={democenterimg}
                              // width="60%"
                            />
                          )}
                        </div>
                        <h4
                          style={{
                            color: "#3663b3",
                            marginBottom: "5px",
                            textAlign: "center",
                            fontWeight: '600'
                          }}
                        >
                          {this.state.selectedPlace.name}
                        </h4>
                        {/* <span style={{ fontSize: "15px", fontWeight: "200" }}>
                          ID:CCC83
                        </span> */}
                      </div>
                      <div
                        style={{
                          marginTop: "0.5em",
                          padding: "1em"
                          // borderTop: "1px #325ca6 solid"
                        }}
                      >
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
                          {this.state.selectedPlace.location}
                        </div>
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
                      style={{
                        fontFamily: "gotham-light",
                        display: "flex",
                        justifyContent: "center",
                        fontWeight: "600"
                      }}
                    >
                      <h4 style={{ color: "white", fontWeight: "600" }}>
                        {/* {this.state.selectedPlace["name"]} */}
                        MARKET
                        {/* <br className="breakline" />
                        <small style={{ color: "#333131" }}>
                          <span style={{ textTransform: "capitalize" }}>
                            ({" "}
                            {this.state.selectedPlace[
                              "agroAssetType"
                            ].toLowerCase()}{" "}
                            )
                          </span>
                        </small> */}
                      </h4>
                    </div>
                    <div
                      className="body clearfix "
                      // style={{ textAlign: "left" }}
                    >
                      <div className="row" style={{padding: '0.2em'}}>
                        <div className="image">
                          {this.state.selectedPlace.image &&
                          this.state.selectedPlace.image !== "NA" &&
                          this.state.selectedPlace.image !== "0" ? (
                            <img
                              alt="famerimg"
                              className="customerimgg"
                              src={this.state.selectedPlace.image}
                              // width="65%"
                            />
                          ) : (
                            <img
                              alt="placeholderfamerimg"
                              className="palceholder"
                              // style={{ margin: "2.5em 0 0em 1em" }}
                              src={democenterimg}
                              // width="60%"
                            />
                          )}
                        </div>
                        <h4
                          style={{
                            color: "#3663b3",
                            marginBottom: "5px",
							textAlign: "center",
							fontWeight: '600'
                          }}
                        >
                          {this.state.selectedPlace.location}
                        </h4>
                        <span style={{ fontSize: "15px", fontWeight: "200" }}>
                          {this.state.selectedPlace.type}
                        </span>
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
                      style={{
                        fontFamily: "gotham-light",
                        display: "flex",
                        justifyContent: "center",
                        fontWeight: "600"
                      }}
                    >
                      <h4 style={{ color: "white", fontWeight: "600" }}>
                        {/* {this.state.selectedPlace["name"]} */}
                        OFFICE
                        {/* <br className="breakline" />
                        <small style={{ color: "#333131" }}>
                          <span style={{ textTransform: "capitalize" }}>
                            ({" "}
                            {this.state.selectedPlace[
                              "agroAssetType"
                            ].toLowerCase()}{" "}
                            )
                          </span>
                        </small> */}
                      </h4>
                    </div>
                    <div
                      className="body clearfix "
                      // style={{ textAlign: "left" }}
                    >
                      <div className="row" style={{padding: '0.2em'}}>
                        <div className="image">
                          {this.state.selectedPlace.image &&
                          this.state.selectedPlace.image !== "NA" &&
                          this.state.selectedPlace.image !== "0" ? (
                            <img
                              alt="famerimg"
                              className="customerimgg"
                              src={this.state.selectedPlace.image}
                              // width="65%"
                            />
                          ) : (
                            <img
                              alt="placeholderfamerimg"
                              className="palceholder"
                              // style={{ margin: "2.5em 0 0em 1em" }}
                              src={democenterimg}
                              // width="60%"
                            />
                          )}
                        </div>
                        <h4
                          style={{
                            color: "#3663b3",
                            marginBottom: "5px",
							textAlign: "center",
							fontWeight: '600'
                          }}
                        >
                          {/* {this.state.selectedPlace.type} */}
                          {this.state.selectedPlace.location}
                        </h4>
                        <p style={{ fontSize: "15px", fontWeight: "200" }}>
                          {this.state.selectedPlace.type}
                          <br />
                        </p>
                        <p
                          style={{
                            marginTop: "0.5em",
                            fontSize: "15px",
                            fontWeight: "200"
                          }}
                        >
                          {this.state.selectedPlace.address}
                        </p>
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
                        {this.state.selectedPlace.type}
                      </h4>
                    </div>
                    <div className="body clearfix ">
                      <div className="row">
                        <div className="image">
                          {this.state.selectedPlace.image !== null &&
                          this.state.selectedPlace.image !== "NA" &&
                          this.state.selectedPlace.image !== "0" ? (
                            <img
                              alt="famerimg"
                              className="customerimgg"
                              src={this.state.selectedPlace.image}
                              // width="65%"
                            />
                          ) : (
                            <img
                              alt="placeholderfamerimg"
                              className="palceholder"
                              // style={{ margin: "2.5em 0 0em 1em" }}
                              src={democenterimg}
                              // width="60%"
                            />
                          )}
                        </div>
                        <h4 style={{ color: "#3663b3", marginBottom: "5px",fontWeight: '600' }}>
                          {this.state.selectedPlace.location}
                        </h4>
                        <span style={{ fontSize: "15px", fontWeight: "200" }}>
                          ID:{this.state.selectedPlace.centreId}
                        </span>
                      </div>
                      {this.state.selectedPlace.facilities !== undefined &&
                        this.state.selectedPlace.facilities !== "NA" && (
                          <div className="row">
                            <div className="headerfacilities">
                              <span>Facilities </span>{" "}
                            </div>
                            <ul id="myList">
                              {this.state.selectedPlace.facilities
                                .split(",")
                                .map(item => {
                                  item = item.trim();
                                  if (item.includes("Irrigation")) {
                                    return (
                                      <li key={item}>
                                        <img
                                          style={{ width: "16%" }}
                                          src={Irrigationicon}
                                          alt="irrigation"
                                        />
                                        &nbsp;{item}
                                      </li>
                                    );
                                  } else if (item.includes("Power")) {
                                    return (
                                      <li key={item}>
                                        <img
                                          style={{ width: "16%" }}
                                          src={Powericon}
                                          alt="Powericon"
                                        />
                                        &nbsp;{item}
                                      </li>
                                    );
                                  } else if (item.includes("Oil")) {
                                    return (
                                      <li key={item}>
                                        <img
                                          style={{ width: "16%" }}
                                          src={Oilicon}
                                          alt="Oil"
                                        />
                                        &nbsp;{item}
                                      </li>
                                    );
                                  } else if (item.includes("Flour")) {
                                    return (
                                      <li key={item}>
                                        <img
                                          style={{ width: "16%" }}
                                          src={Flouricon}
                                          alt="Flour"
                                        />
                                        &nbsp;{item}
                                      </li>
                                    );
                                  } else if (item.includes("Ripening")) {
                                    return (
                                      <li key={item}>
                                        <img
                                          style={{ width: "14%" }}
                                          src={Ripeningicon}
                                          alt="Ripeningicon"
                                        />
                                        &nbsp;
                                        <span style={{ fontSize: "11px" }}>
                                          {item}
                                        </span>
                                      </li>
                                    );
                                  } else if (item.includes("Procurement")) {
                                    return (
                                      <li key={item}>
                                        <img
                                          style={{ width: "16%" }}
                                          src={Procurementicon}
                                          alt="procurement"
                                        />
                                        &nbsp;{item}
                                      </li>
                                    );
                                  }
                                })}
                            </ul>
                          </div>
                        )}
                      {this.state.selectedPlace.processingGoods &&
                        this.state.selectedPlace.processingGoods !== "NA" && (
                          <div className="row">
                            <div className="headerfacilities">
                              <span>Processing Goods </span>{" "}
                            </div>
                            <ul id="myList">
                              {this.state.selectedPlace.processingGoods
                                .split(",")
                                .map(item => {
                                  item = item.trim();
                                  if (item.includes("Spice")) {
                                    return (
                                      <li key={item}>
                                        <img
                                          style={{ width: "16%" }}
                                          src={Spicesicon}
                                          alt="Spice"
                                        />
                                        &nbsp;{item}
                                      </li>
                                    );
                                  } else if (item.includes("Coriander")) {
                                    return (
                                      <li key={item}>
                                        <img
                                          style={{ width: "16%" }}
                                          src={Corriandericon}
                                          alt="Coriander"
                                        />
                                        &nbsp;{item}
                                      </li>
                                    );
                                  } else if (item.includes("Mustard")) {
                                    return (
                                      <li key={item}>
                                        <img
                                          style={{ width: "16%" }}
                                          src={Mustardicon}
                                          alt="Mustard"
                                        />
                                        &nbsp;{item}
                                      </li>
                                    );
                                  } else if (item.includes("Wheat")) {
                                    return (
                                      <li key={item}>
                                        <img
                                          style={{ width: "16%" }}
                                          src={Wheaticon}
                                          alt="Wheat"
                                        />
                                        &nbsp;{item}
                                      </li>
                                    );
                                  } else if (item.includes("anana")) {
                                    return (
                                      <li key={item}>
                                        <img
                                          style={{ width: "16%" }}
                                          src={Bananasicon}
                                          alt="Banana"
                                        />
                                        &nbsp;{item}
                                      </li>
                                    );
                                  }
                                })}
                            </ul>
                          </div>
                        )}
                    </div>
                  </div>
                )}
              {this.state.selectedPlace !== undefined &&
                this.state.selectedPlace.agroAssetType === "CUSTOMER" && (
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
                      <h4 style={{ color: "white", fontWeight: "600" }}>
                        B2B CUSTOMER
                      </h4>
                    </div>
                    <div className="body clearfix ">
                      <div className="row" style={{ padding:'0.2',marginBottom: "1.5em" }}>
                        <div className="image">
                          {this.state.selectedPlace.premisesImage !== null &&
                          this.state.selectedPlace.premisesImage !== "NA" &&
                          this.state.selectedPlace.premisesImage !== "0" ? (
                            <img
                              alt="famerimg"
                              src={this.state.selectedPlace.premisesImage}
                              // width="65%"
                              className="premisesImage"
                            />
                          ) : (
                            <img
                              alt="placeholderfamerimg"
                              className="palceholder"
                              // style={{ margin: "2.5em 0 0em 1em" }}
                              src={democenterimg}
                              // width="60%"
                            />
                          )}
                        </div>
                        <h4 style={{ color: "#3663b3", marginBottom: "5px",fontWeight: '600' }}>
                          {this.state.selectedPlace.name}
                        </h4>
                        <span style={{ fontSize: "15px", fontWeight: "200" }}>
                          {this.state.selectedPlace.location}
                        </span>
                      </div>
                      <div className="customer row">
                        {this.state.selectedPlace.rawId !== undefined && (
                          <div className="row">
                            <b>ID:</b>
                            {this.state.selectedPlace.customerId}
                          </div>
                        )}
                        {this.state.selectedPlace.rawId !== undefined && (
                          <div className="row">
                            <b>Type:</b>
                            {this.state.selectedPlace.typeOfCustomer}
                          </div>
                        )}
                        {this.state.selectedPlace.rawId !== undefined && (
                          <div className="row">
                            <b>Deals In:</b> Bananas
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}
            </div>
          </InfoWindow>
        </Map>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyCHi5ryWgN1FcZI-Hmqw3AdxJQmpopYJGk"
})(MapContainer);
