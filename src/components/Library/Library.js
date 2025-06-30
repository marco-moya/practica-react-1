import React from "react";
import Song from "../Song/Song";
import {
  LibraryContainer,
  LibraryTitle,
  LibraryList,
  SongMessage
} from "./styles.js";

const Library = ({songs, removeFromLibrary }) => {
  return (
    <LibraryContainer className="library-container">
      <LibraryTitle>Mi Biblioteca</LibraryTitle>
      <LibraryList className="library-list">
        {songs.length === 0 ? 
          <SongMessage className="song-message">No hay canciones en tu biblioteca</SongMessage>
          : 
          songs.map((song) => (
            <React.Fragment key={song.id}>
              <Song info={song} onRemove={removeFromLibrary} />
            </React.Fragment>
          ))}
      </LibraryList>
    </LibraryContainer>
  );
}

export default Library;