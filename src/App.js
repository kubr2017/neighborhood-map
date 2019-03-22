import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Map } from './components/Map';
import { List } from './components/List';
import {FourSquareClient_id} from './components/APIkeys'
import {FourSquareClient_secret} from './components/APIkeys'
import axios from 'axios'
import escapeRegExp from 'escape-string-regexp'

const neighborhood = {title:'Brooklyn heights',location:{lat:40.6947591, lng:-73.9950086}};
var places = [];


const locations = [
  {id:10,name:'Iron Chef House',lat:40.697099,lng:-73.9934161,rate:'8.1',pic:'No pic',menu:'No menu',hours:'No hours',address:'No address'},
  {id:11,name:'Ozu Japanese Cuisine Lounge',lat:40.6973144,lng:-73.9934115,rate:'8.2',pic:'No pic',menu:'No menu',hours:'No hours',address:'No address'},
  {id:20,name:'Sociale',lat:40.6986932,lng:-73.9925305,rate:'8.3',pic:'No pic',menu:'No menu',hours:'No hours',address:'No address'},
  {id:15,name:'Noodle Pudding',lat:40.6995644,lng:-73.9921543,rate:'8.4',pic:'No pic',menu:'No menu',hours:'No hours',address:'No address'},
  {id:12,name:'Dellaroccos',lat:40.695028,lng:-73.9961773,rate:'8.5',pic:'No pic',menu:'No menu',hours:'No hours',address:'No address'},
  {id:13,name:'Heights Cafe',lat:40.6951996,lng:-73.9959476,rate:'8.6',pic:'No pic',menu:'No menu',hours:'No hours',address:'No address'},
  {id:14,name:'Hancos',lat:40.6946937,lng:-73.9936949,rate:'8.7',pic:'No pic',menu:'No menu',hours:'No hours',address:'No address'},
  {id:16,name:'Caffe Buon Gusto',lat:40.6946937,lng:-73.9935876,rate:'8.8',pic:'No pic',menu:'No menu',hours:'No hours',address:'No address'},
  {id:17,name:'B.GOOD',lat:40.6946967,lng:-73.9938547,rate:'8.9',pic:'No pic',menu:'No menu',hours:'No hours',address:'No address'},
  {id:18,name:'Vineapple Cafe',lat:40.6984697,lng:-73.9941551,rate:'',pic:'No pic',menu:'No menu',hours:'No hours',address:'No address'},
  {id:19,name:'Jack the Horse Tavern',lat:40.6996909,lng:-73.9939797,rate:'5.0',pic:'No pic',menu:'No menu',hours:'No hours',address:'No address'},
  {id:21,name:'Tutt Heights',lat:40.6996909,lng:-73.9939797,rate:'6.5',pic:'No pic',menu:'No menu',hours:'No hours',address:'No address'},
  {id:22,name:'Joe Coffee Company',lat:40.6986654,lng:-73.9951892,rate:'5.1',pic:'No pic',menu:'No menu',hours:'No hours',address:'No address'},
  {id:23,name:'Montero',lat:40.6913725,lng:-73.9988203,rate:'5.2',pic:'No pic',menu:'No menu',hours:'No hours',address:'No address'},
  {id:24,name:'Table 87',lat:40.6913003,lng:-73.9974819,rate:'5.3',pic:'No pic',menu:'No menu',hours:'No hours',address:'No address'}
];

class App extends Component {

  state = {isLoading:true,
           query:'',
           focus:'',
           places:[]}

  getVenues = (location) => {
    const endPoint = 'https://api.foursquare.com/v2/venues/search?'
    const parameters = {
      client_id:FourSquareClient_id,
      client_secret:FourSquareClient_secret,
      ll:location.lat+','+location.lng,
      query:'restaurant,pizza',
      radius:500,
      limit:3,
      v:'20182507'
    }
    console.log('location:',location);
    axios.get(endPoint+new URLSearchParams(parameters))
    .then(response=>{console.log('response:',response)
                     response.data.response.venues.map((item) => {
                                                                   this.venue = {id:item.id, name:item.name, lat:item.location.lat, lng:item.location.lng, rate:'',pic:'No pic',menu:'No menu',hours:'No hours',address:'No address'};
                                                                   places.push(this.venue)
                                                                   //console.log('venue:',this.venue);
                                                                 })
                      //places.map((item)=>{this.getVenuesRate(item)})
                      console.log('places array:',places);
                      this.getVenuesDetails(places);
                    //  this.setState({isLoading:false})
                    }
    )
    .catch(e=>(console.log('get venues Error:',e)))
  }

  getVenuesDetails = (places) => {
    let requestsArr = [];
    console.log('requestsArr:',requestsArr);
    for (let i=0;i<places.length;i++) {

      const endPoint = 'https://api.foursquare.com/v2/venues/'+places[i].id+'?'
      const parameters = {
        client_id:FourSquareClient_id,
        client_secret:FourSquareClient_secret,
        v:'20182507'
      }
      console.log('passing places[i].id',places[i].id);
      requestsArr.push(axios.get(endPoint+new URLSearchParams(parameters))
      .then(response=>{//console.log('FourSquare place Rate:',response.data.response.venue.rating)
                        //this.setState({placeRate:response.data.response.venue.rating})
                        //*********** get Rate
                        console.log('inside getVenuesDetails response:',response,' places['+i+']',places[i]);
                        response.data.response.venue.rating ? places[i].rate = Number(response.data.response.venue.rating): places[i].rate='No rate'
                        //condition check exist photo
                        if (response.data.response.venue.photos.groups[1]){
                          places[i].pic = response.data.response.venue.photos.groups[1].items[0].prefix+'75x75'+response.data.response.venue.photos.groups[1].items[0].suffix
                        }
                        console.log('inside getVenuesDetails Pic path:',places[i].pic);
                        //check menu
                        if (response.data.response.venue.menu) {
                          places[i].menu=response.data.response.venue.menu.mobileUrl
                        }
                        //check address
                        if (response.data.response.venue.location.address) {
                          places[i].address=response.data.response.venue.location.address
                        }
                        //check hours
                        if (response.data.response.venue.hours) {
                          places[i].hours=response.data.response.venue.hours.timeframes[0]
                        }

                      })
      .catch(e=>(console.log('Place Error:',e))))

    }
    console.log('requestsArr:',requestsArr);
    Promise.all(requestsArr).then(response=>{console.log('firing response PromiseAll');
                                              places = places.filter((item)=>{console.log('check >=:'+item.name+(item.rate>=6.8));
                                              return item.rate>=0;})
                                              this.setState({places:places}); //rerender components with new gotten data
                                              console.log('Inside PromiseAll Case setState places:',this.state.places);
                                             })

  }

  //search functionality
  updateQuery = (e) => {
    //console.log('e.target.value:',e.target.value);
    this.setState({query:e.target.value.trim()})
  }

  componentDidMount(){
    this.getVenues(neighborhood.location)

    //***************** Case of offline work   **************
      //places = locations.slice()
      //this.setState({places:places})
        window.updateFocus = (name)=>{
          this.setState({focus:name});
          console.log('fired window.updateFocus - argument:'+name+'; this.state.focus:',this.state.focus);
        }
        window.updateFocus=window.updateFocus.bind(this)

  }

  render() {

    // search box functionality
    let searchTitles = [];

    if (this.state.places.length){
      console.log('isLoading inside query:',this.state.places.length);
      if (this.state.query){
        const match = new RegExp(escapeRegExp(this.state.query),'i')
        searchTitles = this.state.places.filter(function(item){return match.test(item.name)})
        console.log('query:',this.state.query);
        console.log('searchTitles:',searchTitles);
      }else{
        searchTitles = this.state.places.slice();
        //console.log('places=',places);
      }
    }


    let venue = {id:'',name:'',lat:'',lng:'',rate:''};

    return (
      <div className="App">
        <h1>High rated cafe and restaurants in Brooklyn Heights</h1>
        <div className='App-main-field'>
          <div className='App-list-field App-fields'>
            <div className='search-box'>
              <input type='text' onChange={this.updateQuery} value={this.state.query}/>
            </div>
            <List places = {searchTitles} focus={this.state.focus} LoadStatus={this.state.isLoading}/>
          </div>
          <div className='App-map-field App-fields'>
             <Map neighborhood = {neighborhood} places = {searchTitles} focus={this.state.focus}/>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
