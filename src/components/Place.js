import React from 'react'

class Place extends React.Component {

  getFocus=()=>{
    window.updateFocus(this.props.place.name)
  }

  render(){
    console.log('inside place, name:',this.props.place.name,' LoadStatus:',this.props.LoadStatus,' focus:',this.props.focus,' inside place rate:',this.props.place.rate);
    let hoursStr = 'No hours'
    if (!(this.props.place.hours==='No hours')){
      hoursStr='days:'+this.props.place.hours.days+' open hours:'+this.props.place.hours.open[0].renderedTime
      console.log('inside place condition No hours name:'+this.props.place.name+'hoursStr:'+hoursStr);
    }
    return(
      <div onClick={this.getFocus}>{this.props.place.name} <img src={this.props.place.pic} alt={this.props.place.pic}></img>
        {hoursStr}
      <p>Rate: {this.props.place.rate}</p>
      </div>
    )
  }
}

export { Place }
