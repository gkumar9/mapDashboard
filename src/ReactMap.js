import React from "react"
import { compose, withProps } from "recompose"
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"
import ClaroAllpins from './ClaroAllPins.json';
import logo from './logo.png'

const MyMapComponent = compose(
  withProps({
    googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyAkKZ_9YmXhzkTcN5rDp8ghKZbIvCMkNdo&v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `100vh` }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  withScriptjs,
  withGoogleMap
)((props) =>
  <GoogleMap
    defaultZoom={5}
    defaultCenter={{ lat: 23.5937, lng: 78.9629 }}
  >
   {
    	ClaroAllpins.allPins.map((marker, index) => {
		  return (
		    <Marker key={index} position={{lat: parseFloat(marker.latitude), lng: parseFloat(marker.longitude)}} onClick={props.onMarkerClick.bind(this,index)}  />
		  )
		})
	}
  </GoogleMap>
)


class MyFancyComponent extends React.PureComponent {
	constructor(props){
		super(props)
		this.handleMarkerClick=this.handleMarkerClick.bind(this)
	}
	handleMarkerClick(index){
		console.log('called',index)
	}
  render() {
    return (
    <div >
    <div className="header">
    	<div className="row">
		    <div className="col-3">
		      <img src={logo} alt="#" />
		    </div>
		    
		    
		  </div>
	</div>
	
	<div className="main">
      <MyMapComponent
      onMarkerClick={this.handleMarkerClick}        
      />
  	</div>
	</div>
    )
  }
}

export default MyFancyComponent;