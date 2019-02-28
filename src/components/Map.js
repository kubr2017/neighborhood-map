import React from 'react'
import { Marker } from './Marker'
import {GoogleAPIkey} from './APIkeys'

var markers = []  //every call create empty array of markers
class Map extends React.Component {

  state = {isLoad:false}


  getGoogleMaps() {
        // Load the Google Maps API
        const script = document.createElement("script");
        const API = GoogleAPIkey;
        script.src = `https://maps.googleapis.com/maps/api/js?key=${API}&v=3&callback=initMap`;
        script.async = true;
        script.defer = true;
        document.body.appendChild(script);
  }

  markerPush = (marker) => {
    markers.push(marker)
  }

  componentDidMount() {
    // Once the Google Maps API has finished loading, initialize the map
    this.getGoogleMaps()
    window.initMap = () => {
      var map = new window.google.maps.Map(document.getElementById('map'), {
        zoom: 15,
        center: this.props.neighborhood.location,
        mapTypeControl: false
      })
      // ???????????????????????? Why impossible this.map  and => var window.map  ?
      window.map = map
      //console.log('inside initMap window.map:',window.map);
      this.setState({isLoad:true})
      //console.log('<Map/> google:',window.google);
    }
   }

  render() {
    markers.map((item)=>{item.setMap(null)})
    markers = []

    return (
      <div>
        <div id="map" ></div>
        {this.state.isLoad ?  (this.props.places.map((item)=>(<Marker key = {item.name} markerPush={this.markerPush} name={item.name} focus={this.props.focus} placeLat={item.lat} placeLng={item.lng}/>))):<div>Loading...</div>}
      </div>
    )
  }
}

export { Map }
