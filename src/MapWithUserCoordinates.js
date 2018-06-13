import React from "react";
import { MyMapComponent } from "./MyMapComponent";
import Map from "./Map";

export class MapWithUserCoordinates extends React.Component {
  state = {
    userLocation: false,
    center: null
  };
  onPositionChange = pos => {
    const lat = pos.coords.latitude;
    const lng = pos.coords.longitude;
    const center = { lat, lng };
    this.setState({ center, userLocation: true });
  };
  comdMount = () => {
    this.watchID = navigator.geolocation.watchPosition(this.onPositionChange);
  };
  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID);
  }
  render() {
    const { userLocation, center } = this.state;
    const markers = userLocation ? [ ...this.props.markers, {position:center,title:'ME!'}] : this.props.markers
    return <div>
        <button className="error off-two-fifth" onClick={this.comdMount}>Your Location</button>
        <Map className="batata" markers={markers} center={center}/>
    </div>  
  }
}
