import React, { useState }from "react";
import Modal from "react-modal";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addSong } from "../../redux/libraryActions.js";
import { 
  Main,
  ArtistInfo,
  AlbumList,
  Album,
  Ribbon,
  AlbumHeader,
  AlbumCover,
  AlbumDetails,
  SongList,
  SongListItem,
  SongsListInfo,
  SongListAddButton 
} from "./styles.js";

const SearchResults = ({
  artist,
  albums,
  songsByAlbum,
  expandedAlbumId,
  setExpandedAlbumId,
  error,
  }) => {

    const [modalSongAdded, setModalSongAdded] = useState(false);
    const [modalSongAlreadyAdded, setModalSongAlreadyAdded] = useState(false);

    const dispatch = useDispatch();
    const library = useSelector((state) => state.library);

    const toggleAlbum = (albumId) => {
      setExpandedAlbumId(prevId => (prevId === albumId ? null : albumId));
    };

    const handleAddToLibrary = (song, album) => {
      const songData = {
        id: song.id,
        title: song.name,
        artist: song.artists[0]?.name || "Desconocido",
        album: {
          name: album.name,
          images: album.images,
        },
      };

      dispatch(addSong(songData));

      const isSongInLibrary = (songId) => {
      return library.some((item) => item.id === songId);
      };
      if (isSongInLibrary(song.id)) {
        setModalSongAlreadyAdded(true);
        setTimeout(() => setModalSongAlreadyAdded(false), 2000);
        return;
      }
      setModalSongAdded(true);
      setTimeout(() => setModalSongAdded(false), 2000);
    };


  return (
    <Main>
      <Modal 
        isOpen={modalSongAdded} 
        className="modal-content" 
        overlayClassName="modal-overlay">
        <p>🎵 Canción agregada a tu biblioteca</p>
      </Modal>
      <Modal 
        isOpen={modalSongAlreadyAdded} 
        className="modal-content" 
        overlayClassName="modal-overlay">
        <p>La canción ya esta en tu biblioteca</p>
      </Modal>
      {error && <p>{error}</p>}

      {artist && (
        <ArtistInfo>
          <h2>Resultados para: {artist.name}</h2>
        </ArtistInfo>
      )}

      {albums.length > 0 && (
        <AlbumList>
          {albums.map((album) => (
            <Album key={album.id} type={album.album_type}>
              <Ribbon type={album.album_type}>{album.album_type.toUpperCase()}</Ribbon>
              <AlbumHeader onClick={() => toggleAlbum(album.id)}>
                <AlbumCover
                  src={album.images[0]?.url}
                  alt={album.name}
                />
                <AlbumDetails>
                  <h3>{album.name}</h3>
                  <p>{album.release_date}</p>
                </AlbumDetails>
              </AlbumHeader>

              {expandedAlbumId === album.id && (
                <SongList>
                  {songsByAlbum[album.id]?.map((song) => (
                    <SongListItem key={song.id} >
                      <SongsListInfo>
                        <Link to={`/song/${song.id}`}><strong>{song.name}</strong></Link>
                      </SongsListInfo>
                      <SongListAddButton  onClick={() => handleAddToLibrary(song, album)}>➕</SongListAddButton>
                    </SongListItem>
                  ))}
                </SongList>
              )}
            </Album>
          ))}
        </AlbumList>
      )}
    </Main>
  );
};

export default SearchResults;
