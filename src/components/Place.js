import React from 'react'

class Place extends React.Component {

  getFocus=()=>{
    window.updateFocus(this.props.place.name)
  }

  render(){
    console.log('inside place:',this.props.place);
    console.log('this.props.place.rate:',this.props.place.rate);
    return(
      <div onClick={this.getFocus} className={this.props.focus===this.props.place.name ? 'focused': null}>{this.props.place.name} - Rate: {this.props.place.rate}
      </div>
    )
  }
}

export { Place }
