import React from 'react'

class Place extends React.Component {

  getFocus=()=>{
    window.updateFocus(this.props.place.name)
  }

  render(){
    console.log('inside place, props.place.name:',this.props.place.name,' focus:',this.props.focus);
    console.log('this.props.place.rate:',this.props.place.rate);
    return(
      <div onClick={this.getFocus}>{this.props.place.name} <p>Rate: {this.props.place.rate}</p>
      </div>
    )
  }
}

export { Place }
