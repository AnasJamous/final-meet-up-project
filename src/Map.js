import React, { Component } from 'react';
import { withGoogleMap, GoogleMap } from 'react-google-maps';
import { MarkerWithLabel } from 'react-google-maps/lib/components/addons/MarkerWithLabel'

const GoogleMapExample = withGoogleMap( props => {
  return (
   <GoogleMap
     center = { props.center || { lat: 33.881938, lng: 35.541888 } }
     defaultZoom = { 14 }
     ref={ props.ref }
   >
   { props.markers.map( ({id, title,...props}) => 
      <MarkerWithLabel labelAnchor={new window.google.maps.Point(0, 0)} key={id} id={id} {...props}>
        <div style={{color:'red', backgroundColor:'white', padding:'0.1em',fontSize:'13px'}}>{ title }</div>
      </MarkerWithLabel>
    )}
   </GoogleMap>
)});

class Map extends Component {
    render() {
    const markers = this.props.markers || []
    return(
      <div>
        <GoogleMapExample
          containerElement={ <div className={this.props.className} /> }
          mapElement={ <div style={{ height: `100%` }} /> }
          markers={markers}
          center={this.props.center}
          ref={this.onMapMounted}
        />
      </div>
   );
   }
};
export default Map;
