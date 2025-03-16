import React, {useEffect, useState} from "react";
import Header from "./components/Header/Header";
import SearchResults from "./components/SearchResults/SearchResults";
import Library from "./components/Library/Library";
import "./App.css";

const App = () => {
  const songDataFake = [
    {id:0, title:"Fireflies", artist:"The Midnight Owls", album:"Moonlit Memories"},
    {id:1, title:"Summer Breeze", artist:"Ocean Waves", album:"Coastal Serenity"},
    {id:2, title:"Starry Nights", artist:"Aurora Skyline", album:"Celestial Dreams"},
  ];
  
  const [searchResults, setSearchResults] = useState(songDataFake);
  const [library, setLibrary] = useState([]);
  
  const addToLibrary = (song) => {
    if (!library.find(item => item.id === song.id)) {
      setLibrary([...library, song]);
    }
  }

  useEffect(() => {
    console.log("La biblioteca se ha actualizado:", library);
  }, [library]);

  return (
    <>
        <Header />
      <main className="container-song">
        <SearchResults songs={songDataFake} onAddToLibrary={addToLibrary}/>
        <Library songs={library} />
      </main>
    </>
  );
}

export default App;