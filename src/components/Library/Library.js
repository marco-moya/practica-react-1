import React from "react";
import Song from "../Song/Song";
import "./Library.css";

const Library = ({songs, removeFromLibrary }) => {
  return (
    <div className="library-container">
      <h2>Mi Biblioteca</h2>
      <ul className="library-list">
        {songs.length === 0 ? 
          <p className="song-message">No hay canciones en tu biblioteca</p>
          : 
          songs.map((song) => (
            <React.Fragment key={song.id}>
              <Song info={song} onRemove={removeFromLibrary} />
            </React.Fragment>
          ))}
      </ul>
    </div>
  );
}

export default Library;