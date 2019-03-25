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
      //<iframe id="frame" src={this.props.place.menu} width='300' height='300' scrolling="yes"></iframe>
    }
    return(
      <div onClick={this.getFocus}><h2 className='placeName'>{this.props.place.name}</h2><hr/> <img src={this.props.place.pic} alt={this.props.place.pic}></img>
        {hoursStr}
      <p>Rate: {this.props.place.rate}</p><a href={this.props.place.menu==='No menu' ? null:this.props.place.menu} target='_blank'>{this.props.place.menu==='No menu' ? 'No menu':'Menu'}</a>
      </div>
    )
  }
}

export { Place }
