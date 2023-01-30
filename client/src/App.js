import { Component } from 'react';
import { MapContainer, TileLayer,useMap, Marker, Popup } from 'react-leaflet';
import './App.css';
//import marker from '../../Assets/icons/Location.svg';
/*import { Icon } from 'leaflet'
const myIcon = new Icon({
 iconUrl: marker,
 iconSize: [32,32]
})*/

function ChangeMapView({ coords }) {
  const map = useMap();
  map.setView(coords, map.getZoom());

  return null;
}

class App extends Component{
  state= {
   location:{ 
    lat: 51.505,
    lng: -0.09,
  },
    haveUserLocation: false,
    zoom:16,
  }

  
  
  componentDidMount(){
    navigator.geolocation.getCurrentPosition((position) => {
      this.setState({
        location: {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      },
       haveUserLocation: true,
       zoom: 13,
      });
     console.log(position);
    });
    
  }
  

  render(){
    const position = [this.state.location.lat, this.state.location.lng];
    return (
      
      <MapContainer className="map" center={position} zoom={this.state.zoom} scrollWheelZoom={false}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {
        this.state.haveUserLocation ?
        <Marker position={position}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker> : ''

      }  
      <ChangeMapView coords={position} />
    </MapContainer>
    );
  }
}

export default App;
