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
      <div onClick={this.getFocus}><h2 className='placeName'>{this.props.place.name}</h2><hr/>
      <p className='placeAddress'>{this.props.place.address}</p>
      <div className='placeDetailsContainer'>
        <div className='placeTimeDeatils'>
          <div dangerouslySetInnerHTML={{ __html: hoursStr }} />
        </div>
        <a href={this.props.place.menu==='No menu' ? null:this.props.place.menu} target='_blank'><img src='../images/menu-75.jpg' alt='Menu'></img></a>
        <img src={this.props.place.pic} alt={this.props.place.pic}></img>
      </div>
      <p>Rate: {this.props.place.rate}</p>
      </div>
    )
  }
}

export { Place }
