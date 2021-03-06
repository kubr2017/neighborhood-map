import React from 'react'

class Place extends React.Component {

  getFocus=()=>{
    window.map.setCenter({lat:this.props.place.lat,lng:this.props.place.lng})
    window.map.zoom=15;
    window.updateFocus(this.props.place.name)
  }

  render(){
    console.log('inside place, name:',this.props.place.name,' LoadStatus:',this.props.LoadStatus,' focus:',this.props.focus,' inside place rate:',this.props.place.rate);
    let hoursStr = 'No hours'
    if (!(this.props.place.hours==='No hours')){
      hoursStr='<p>Days:</p> '+'<span>'+this.props.place.hours.days+'</span>'+'<p>Open hours:</p><span>'+this.props.place.hours.open[0].renderedTime+'</span>'
      console.log('inside place condition No hours name:'+this.props.place.name+'hoursStr:'+hoursStr);
      //<iframe id="frame" src={this.props.place.menu} width='300' height='300' scrolling="yes"></iframe>
    }
    return(
      <div onClick={this.getFocus}>
        <div className='place-Header'>
          <div className='place-Name-Container'>
            <h2 className='place-Name'>{this.props.place.name}</h2>
          </div>
          <div className='place-Rate-Container'>
            <span className='place-Rate'>Rate:{this.props.place.rate}</span>
          </div>
        </div>
      <div className='place-Details-Container'>
        <img src={this.props.place.pic} alt={this.props.place.pic}></img>
        <div className='place-Menu-Container'>
          <span className='place-Menu'>Menu</span>
          <a href={this.props.place.menu==='No menu' ? null:this.props.place.menu} target='_blank'><img src='../images/menu-75.jpg' alt='Menu'></img></a>
        </div>
        <div className='place-Time-Container'>
          <div dangerouslySetInnerHTML={{__html: hoursStr}}/>
        </div>
        <div className='place-Address-Container'>
          <span className='place-Address'>Address:</span>
          <p>{this.props.place.address}</p>
        </div>
      </div>
      </div>
    )
  }
}

export { Place }
