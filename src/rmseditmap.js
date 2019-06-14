import React from "react";
import { compose, withProps, lifecycle } from "recompose";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker
} from "react-google-maps";

 export const MyMapComponent = compose(
  withProps({
    googleMapURL:
      "https://maps.googleapis.com/maps/api/js?key=AIzaSyCHi5ryWgN1FcZI-Hmqw3AdxJQmpopYJGk&v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `400px` }} />,
    
    mapElement: <div style={{ height: `100%` }} />
  }),
  lifecycle({
    componentWillMount() {
      const refs = {};

      this.setState({
        position: null,
        onMarkerMounted: ref => {
          refs.marker = ref;
        },

        onPositionChanged: () => {
          // const position = refs.marker.getPosition();
          // console.log(position.toString());
        }
      });
    }
  }),
  withScriptjs,
  withGoogleMap
)(props => (
  <GoogleMap
    defaultZoom={8}
    defaultCenter={{ lat: 22.845625996700075, lng: 78.9629 }}
  >
    <Marker
      position={{ lat: 22.845625996700075, lng: 78.9629 }}
      draggable={true}
      ref={props.onMarkerMounted}
      onPositionChanged={props.onPositionChanged}
    />
  </GoogleMap>
));



export default MyMapComponent;
