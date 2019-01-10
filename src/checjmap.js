/* global google */
import React, { Component } from "react";
import { Map, Marker, InfoWindow, GoogleApiWrapper } from "google-maps-react";

class MarkersList extends React.Component {

  constructor(props) {
    super(props);
    this.markersRendered = false;
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (JSON.stringify(this.props.places) === JSON.stringify(nextProps.places) && this.markersRendered) {
      return false;
    }
    this.markersRendered = true;
    return true;
  }

  render() {
    return (
      <span>
        {this.props.places.map((place, i) => {
          return (
            <Marker
              {...this.props}
              key={i}
              data={place}
              position={{ lat: place.lat, lng: place.lng }}
            />
          );
        })}
      </span>
    )
  }

}

class MapContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showInfoWindow: false,
      activeMarker: {},
      selectedPlace: {}
    };
  }

  handleMarkerClick = (markerProps, marker, e) => {
    this.setState({
      selectedPlace: markerProps.data,
      activeMarker: marker,
      showInfoWindow: true
    });
  };


  render() {
    return (
      <div className="map-container">
        <Map
          google={this.props.google}
          className={"map"}
          zoom={4}
          initialCenter={this.props.center}
        >
          <MarkersList google={this.props.google} places={this.props.places} onClick={this.handleMarkerClick} />
          <InfoWindow
            ref={this.infoWindowRef}
            marker={this.state.activeMarker}
            visible={this.state.showInfoWindow}
          >
            <h3>{this.state.selectedPlace.name}</h3>
          </InfoWindow>
        </Map>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "",
  libraries: []
})(MapContainer);
