import React, { Component } from 'react';
import { Map, Marker, GoogleApiWrapper } from 'google-maps-react';
// import ClaroAllpins from './ClaroAllPins.json';
import DRINKING_WATER_PUMP from './pins/Drinking_RMS_Absent.png'
import ROOFTOP from './pins/Rooftop_RMS_Absent.png'
import IRRIGATION_PUMP from './pins/Irrigation_RMS_Absent.png'
import PATVAN from './pins/Patvan_RMS_Absent.png'
import MINIGRID from './pins/Minigrid_RMS_Absent.png'
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
    return (

      <Map
        mapTypeControl={false}
        zoomControl= {false}
        streetViewControl={false}
        fullscreenControl={false}
        google={this.props.google}
        zoom={5}
        style={mapStyles}
        initialCenter={{
         lat: 21.5937,
         lng: 78.9629
        }}
      >
      {
        this.props.datapins.map((marker, index) => {
          let assetType=marker.assetType
          let icon={
          url:'' ,
          anchor: new this.props.google.maps.Point(12,23),
          origin: new this.props.google.maps.Point(0,0),
          scaledSize:  new this.props.google.maps.Size(20,20)
          }
          switch(assetType){
            case 'PATVAN':icon.url=PATVAN; break;
            case 'MINIGRID':icon.url=MINIGRID; break;
            case 'IRRIGATION_PUMP':icon.url=IRRIGATION_PUMP; break;
            case 'DRINKING_WATER_PUMP':icon.url=DRINKING_WATER_PUMP; break;
            case 'ROOFTOP':icon.url=ROOFTOP; break;
          }
          return (
          <Marker key={index} icon={icon} position={{lat: parseFloat(marker.lat), lng: parseFloat(marker.lon)}} onClick={this.onMarkerClick.bind(this,index)}  />
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