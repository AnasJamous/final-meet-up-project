import React from "react";
import { compose, withProps } from "recompose";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker
} from "react-google-maps";
import { MarkerWithLabel } from 'react-google-maps/lib/components/addons/MarkerWithLabel'


const key = "AIzaSyCLguyX_LmJn8gijtp8F57ExTgp8lt6mWk";
const googleMapURL = `https://maps.googleapis.com/maps/api/js?key=${key}&v=3.exp&libraries=geometry,drawing,places`;

export const MyMapComponent = compose(
  withProps({
    googleMapURL,
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `400px` }} />,
    mapElement: <div style={{ height: `100%` }} />
  }),
  withScriptjs,
  withGoogleMap
)(({ position, zoom, markers }) => (
  <GoogleMap defaultZoom={zoom} defaultCenter={position} >
    <Marker/>
    {markers.map((marker) => 
        <Marker position={marker.position} />
    )}
  </GoogleMap>
));
