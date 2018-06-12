import React from "react";


export let Location = {lat:0, lng:0}
export default class UserLocation extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            userLocation: false,
            position: { lat: 0, lng: 0 }
        };
    }
            onPositionChange = pos => {
                const lat = pos.coords.latitude;
                const lng = pos.coords.longitude;
                const position = { lat, lng };
                this.setState({ position, userLocation: true }, function(){
                Location = this.state.position
                console.log(Location)
                console.log(this.state.position )
                this.props.handleUserLocation(lat , lng)
            });
            }
            comdMount = () => {
              this.watchID = navigator.geolocation.watchPosition(this.onPositionChange);
            };
    componentWillUnmount() {
      navigator.geolocation.clearWatch(this.watchID);
    }
  render() {
    const { userLocation, position } = this.state;
    if (!userLocation) {
      return(
          <div>
              <button onClick={this.comdMount} className="off-two-fifth error" > Your Location </button>
          </div>
      ) }else{
          return(
              <h1>test</h1>
          )
      }
    {console.log(this.state.position)}
  }
}
