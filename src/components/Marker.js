import React from 'react'

class Marker extends React.Component {

/**  componentDidMount(){
    var marker = new window.google.maps.Marker({
        position:this.props.placeLat + ','+this.props.placeLng,
        map:window.map,
        title:this.props.place.title
      })
  } **/

  render() {
     {console.log('inside marker - this.props.focus:',this.props.focus)}
      let latlng = {lat:this.props.placeLat,lng:this.props.placeLng}
      let marker = new window.google.maps.Marker({
          position:latlng,
          map: window.map,
          title: this.props.name
        });
      this.props.markerPush(marker);
      var infowindow = new window.google.maps.InfoWindow({
        content:'<div>'+this.props.name+'<div style="border:solid 1px blue; height:50px;width:50px;margin:auto;">pic</div>'+'</div>'
      })
      marker.addListener('click',()=>{
        infowindow.open(window.map,marker)
        window.updateFocus(this.props.name);
        console.log('inside markers - this.props.name for updateFocus',this.props.name);
      })
      if(this.props.name===this.props.focus){
        infowindow.open(window.map,marker)
      }

      //{console.log('Marker map:',window.map)}
      //{console.log('marker',marker)}
    return(<div>
           </div>)
  }
}

export { Marker }
