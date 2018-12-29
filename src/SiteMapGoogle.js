import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import ClaroAllpins from './ClaroAllPins.json';
console.log('ClaroAllpins',ClaroAllpins)
// const AnyReactComponent = ({ text }) => <div>{text}</div>;
const Marker = ({ name }) =>
<div>
  {name}
</div>;
class SimpleMap extends Component {
  static defaultProps = {
    center: {
      lat: 23.5937,
      lng: 78.9629
    },
    zoom: 5,
    minZoom:10
  };
 
  render() {
    let mapmarkers = ClaroAllpins.allPins.map((marker, index) => {
      return (
        <Marker
          key={marker.installation_date}
          lat={marker.latitude}
          lng={marker.longitude}
          name={marker.Rooftop}
        />
      );
    });
    console.log('marker:',mapmarkers)
    return (
      // Important! Always set the container height explicitly
      <div className="container" style={{ height: '100vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyAkKZ_9YmXhzkTcN5rDp8ghKZbIvCMkNdo' }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
        >
          <Marker
          key='gaurav'
          lat='21.233892'
          lng='77.739486'
          name='gaurav'
        /><Marker
          key='asd'
          lat='31.233892'
          lng='77.739486'
          name='asd'
        />
        </GoogleMapReact>
      </div>
    );
  }
}
 
export default SimpleMap;