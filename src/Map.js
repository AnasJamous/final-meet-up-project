import React, { Component } from 'react';
import { withGoogleMap, GoogleMap, Marker } from 'react-google-maps';

const GoogleMapExample = withGoogleMap( props => (
   <GoogleMap
     defaultCenter = { { lat: 33.8964022, lng: 35.5281077 } }
     defaultZoom = { 13 }
   >
   { props.markers.map( ({position,id}) => <Marker key={id} position={position}/>)}
   </GoogleMap>
));

class Map extends Component {
    render() {
    const markers = this.props.markers || []
    return(
      <div>
        <GoogleMapExample
          containerElement={ <div className="map" /> }
          mapElement={ <div style={{ height: `100%` }} /> }
          markers={markers}
        />
      </div>
   );
   }
};
export default Map;
