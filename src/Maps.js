import React, { Component } from 'react';
import { Map, Marker, GoogleApiWrapper } from 'google-maps-react';
import ClaroAllpins from './ClaroAllPins.json';
import logo from './pins/Minigrid_RMS_Absent.png'
const mapStyles = {
  width: '100%',
  height: '100%',
  position:'relative'
};

export class MapContainer extends Component {
  constructor(props){
      super(props)
      this.onMarkerClick=this.onMarkerClick.bind(this)
    }
    onMarkerClick(index){
      console.log('called:',index)
    }
  render() {
    const points=[
    {lat: 35.674520, lng: 76.845245},
    {lat: 6.74678, lng: 93.84260},
    {lat: 23.71307,lng:68.03215},
    {lat: 28.01168,lng:97.39564},
    ]
    var bounds = new this.props.google.maps.LatLngBounds();
    for (var i = 0; i < points.length; i++) {
      bounds.extend(points[i]);
    }
    return (

      <Map
        mapTypeControl={false}
        zoomControl= {false}
        streetViewControl={false}
        fullscreenControl={false}
        bounds={bounds}
        google={this.props.google}
        zoom={5}
        style={mapStyles}
        initialCenter={{
         lat: 21.5937,
         lng: 78.9629
        }}
      >
      {
        ClaroAllpins.allPins.map((marker, index) => {
          return (
          <Marker key={index} icon={{
          url: logo,
          anchor: new this.props.google.maps.Point(12,23),
          origin: new this.props.google.maps.Point(0,0),
          scaledSize:  new this.props.google.maps.Size(20,20)
          }} position={{lat: parseFloat(marker.latitude), lng: parseFloat(marker.longitude)}} onClick={this.onMarkerClick.bind(this,index)}  />
          )
        })
      }
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyAkKZ_9YmXhzkTcN5rDp8ghKZbIvCMkNdo'
})(MapContainer);