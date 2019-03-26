import React from 'react'

class Place extends React.Component {

  getFocus=()=>{
    window.updateFocus(this.props.place.name)
  }

  render(){
    console.log('inside place, name:',this.props.place.name,' LoadStatus:',this.props.LoadStatus,' focus:',this.props.focus,' inside place rate:',this.props.place.rate);
    let hoursStr = 'No hours'
    if (!(this.props.place.hours==='No hours')){
      hoursStr='<h3>Days:</h3> '+this.props.place.hours.days+'<h3>Open hours:</h3><p>'+this.props.place.hours.open[0].renderedTime+'</p>'
      console.log('inside place condition No hours name:'+this.props.place.name+'hoursStr:'+hoursStr);
      //<iframe id="frame" src={this.props.place.menu} width='300' height='300' scrolling="yes"></iframe>
    }
    return(
      <div onClick={this.getFocus}>
        <div className='placeHeader'>
          <div className='placeNameContainer'>
            <h2 className='placeName'>{this.props.place.name}</h2>
          </div>
          <div className='placeRateContainer'>
            <span className='placeRate'>Rate:{this.props.place.rate}</span>
          </div>
        </div>
      <div className='placeDetailsContainer'>
        <img src={this.props.place.pic} alt={this.props.place.pic}></img>
        <a href={this.props.place.menu==='No menu' ? null:this.props.place.menu} target='_blank'><img src='../images/menu-75.jpg' alt='Menu'></img></a>
        <div className='placeTimeDetails'>
          <div dangerouslySetInnerHTML={{__html: hoursStr}}/>
        </div>
        <div className='placeAddressContainer'>
          <h3 className='placeAddress'>Address:</h3>
          <p>{this.props.place.address}</p>
        </div>
      </div>
      </div>
    )
  }
}

export { Place }
