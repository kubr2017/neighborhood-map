import React from 'react'

class Place extends React.Component {

  getFocus=()=>{
    window.updateFocus(this.props.place.name)
  }

  render(){
    console.log('inside place, props.place.name:',this.props.place.name,' focus:',this.props.focus);
    console.log('this.props.place.rate:',this.props.place.rate);
    return(
      <div onClick={this.getFocus}>{this.props.place.name} <img src={this.props.place.pic} alt={this.props.place.pic}></img>
      days:{this.props.place.hours.days ? this.props.place.hours.days : 'no days'} open: {this.props.place.hours.open[0].renderedTime ? this.props.place.hours.open[0].renderedTime : 'no open'}
      <p>Rate: {this.props.place.rate}</p>
      </div>
    )
  }
}

export { Place }
