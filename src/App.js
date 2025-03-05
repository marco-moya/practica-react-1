import React from 'react';
import Header from './components/Header';
import Song from './components/Song';
import './App.css';

class App extends React.Component {
  componentDidMount() {
    console.log("La app se ha cargado correctamente");
  }
  render() {
    return (
      <div className='container-song'>
        <Header />
        <Song song="Fireflies" artist="The Midnight Owls" album="Moonlit Memories" />
        <Song song="Summer Breeze" artist="Ocean Waves" album="Coastal Serenity" />
        <Song song="Starry Nights" artist="Aurora Skyline" album="Celestial Dreams" />
      </div>
    );
  }
}

export default App;