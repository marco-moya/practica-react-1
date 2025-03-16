import React from "react";
import Song from "../Song/Song";
import "./Library.css";

const Library = ({songs}) => {
  return (
    <div className="library-container">
      <h2>Mi Biblioteca</h2>
      <ul>
        {songs.length === 0 ? 
          <p className="song-message">No hay canciones en tu biblioteca</p>
          : 
          songs.map((song) => (
            <React.Fragment key={song.id}>
              <Song info={song}/>
            </React.Fragment>
          ))}
      </ul>
    </div>
  );
}

export default Library;