 
import './App.css';
import HomeContainer from './container/homecontainer';
import MapContainer from './container/mapcontainer';
import UserLocation from './components/userlocation';
import PlaceOnMap from './components/placeonmap';
function App() {
  return (
    <>
      <HomeContainer />
      <UserLocation/>
      <PlaceOnMap/>
      <MapContainer/>
      </>
  );
}

export default App;
