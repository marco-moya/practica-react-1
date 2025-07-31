import React from "react";
import Modal from "react-modal";
import { useState } from "react";
import { useDispatch } from "react-redux";
import Song from "../Song/Song";
import {
  LibraryContainer,
  LibraryTitle,
  LibraryList,
  SongMessage
} from "./styles.js";

const Library = ({ songs }) => {
  const [modalSongRemoved, setModalSongRemoved] = useState(false);

  const dispatch = useDispatch();

  const removeFromLibrary = (songId) => {
  dispatch({ type: "REMOVE_SONG", payload: songId });
  setModalSongRemoved(true);
  setTimeout(() => setModalSongRemoved(false), 2000);
  };

  return (
    <LibraryContainer className="library-container">
      <Modal 
        isOpen={modalSongRemoved} 
        className="modal-content" 
        overlayClassName="modal-overlay">
        <p>Canción eliminada</p>
      </Modal>
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