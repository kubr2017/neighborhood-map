import React from 'react';
import { Place } from './Place';

class List extends React.Component {

  render() {
      {console.log('List...places:',this.props.places)}

    return(
      <div>
        <ul>
          {this.props.places.map((item) => (<li key = {item.name} className={this.props.focus===item.name ? 'focused': null}><Place place = {item} focus={this.props.focus}/></li>))}
        </ul>
      </div>
    )
  }
}

export {List}
