import React, { Component } from 'react';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
// import ClaroAllpins from './ClaroAllPins.json';
import DRINKING_WATER_PUMP from './pins/Drinking_RMS_Absent.png'
import ROOFTOP from './pins/Rooftop_RMS_Absent.png'
import IRRIGATION_PUMP from './pins/Irrigation_RMS_Absent.png'
import PATVAN from './pins/Patvan_RMS_Absent.png'
import MINIGRID from './pins/Minigrid_RMS_Absent.png'
import farmer from './pins/CCAFS-image.jpg'
const mapStyles = {
  width: '100%',
  height: '100%',
  position:'relative',
  display: 'flex', 
  flexFlow: 'row nowrap', 
  justifyContent: 'center',
};
export class MapContainer extends Component {
  constructor(props){
      super(props)
      this.state = {
        showingInfoWindow: false,  //Hides or the shows the infoWindow
        activeMarker: {},          //Shows the active marker upon click
        selectedPlace: {}          //Shows the infoWindow to the selected place upon a marker
      };
      this.onMarkerClick=this.onMarkerClick.bind(this)
      this.onClose=this.onClose.bind(this)
    }
  onMarkerClick(props, marker, e){
    console.log('on click called:')
    this.setState({
    selectedPlace: props,
    activeMarker: marker,
    showingInfoWindow: true
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
    console.log('render')
    return (
      <Map id="map"
        mapTypeControl={false}
        gestureHandling= {'greedy'}
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
              default: break;
            }
            return (
            <Marker key={index} icon={icon} position={{lat: parseFloat(marker.lat), lng: parseFloat(marker.lng)}} onClick={this.onMarkerClick}  />
            )
          })
        }
        <InfoWindow className="infoWindowCard"
          pixelOffset={new this.props.google.maps.Size(170,380)}
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}
          onClose={this.onClose}
        >
          <div style={{'overflow':'hidden'}}>
            <img src={farmer} alt='farmer' className="infoWindowImg"/>
            <h4 className="infoWindowName"> Satpal Singh </h4>
            <h6 className="infoWindowName"> Customer ID: 007 </h6>
            <div>
            <ul className="infoWindowDetail">
              <li>
                <div className="row">
                  <div className="col-md-2">
                    <i className="fa fa-calendar" aria-hidden="true"></i>
                  </div>
                  <div className="col-md-10">
                  <span>Installed on 02 Dec 2017</span>
                  </div>
                </div>
              </li>
              <li>
                <div className="row">
                  <div className="col-md-2">
                    <i className="fa fa-map-marker" aria-hidden="true"></i>
                  </div>
                  <div className="col-md-10">
                  <span>Chuni ka Pura</span>
                  <p>Morena, Madhya pradesh </p>
                  </div>
                </div>
              </li>
              <li>
                <div className="row">
                  <div className="col-md-2">
                    <i className="fa fa-tint" aria-hidden="true"></i>
                  </div>
                  <div className="col-md-10">
                  <span>Irrigation Pump <b>2HP AC Surface</b></span>
                  <p>Solar Panel Capacity 300Wp </p>
                  </div>
                </div>
              </li>
            </ul>
            <div className="portal">
              <span>Visit portal</span><a href="/"><i className="fa fa-external-link-square" aria-hidden="true"></i></a>
            </div>
            </div>
          </div>
        </InfoWindow>
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyCHi5ryWgN1FcZI-Hmqw3AdxJQmpopYJGk'
})(MapContainer);