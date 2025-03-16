import React from "react";
import Song from "../Song/Song";
import "./SearchResults.css";

const SearchResults = ({songs, onAddToLibrary}) => {
  return (
    <div className="search-container">
      <h2>Resultados de búsqueda</h2>
      <ul>
        {songs.map((song) => (
          <React.Fragment key={song.id}>
            <Song info={song}/>
            <button className="add-song-btn" onClick={() => onAddToLibrary(song)}>+ Agregar a mi biblioteca</button>
          </React.Fragment>
        ))}
      </ul>
    </div>
  );
}

export default SearchResults;