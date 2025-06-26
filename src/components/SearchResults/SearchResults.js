import React from "react";
import { Link } from "react-router-dom";
import "./SearchResults.css";
const SearchResults = ({
  artist,
  albums,
  songsByAlbum,
  addToLibrary,
  expandedAlbumId,
  setExpandedAlbumId,
  error,
}) => {
  const toggleAlbum = (albumId) => {
    setExpandedAlbumId(prevId => (prevId === albumId ? null : albumId));
  };

  return (
    <main className="search-results">
      {error && <p>{error}</p>}

      {artist && (
        <section className="artist-info">
          <h2>Resultados para: {artist.name}</h2>
        </section>
      )}

      {albums.length > 0 && (
        <section className="albums-list">
          {albums.map((album) => (
            <div key={album.id} className="album">
              <div className="album-header" onClick={() => toggleAlbum(album.id)}>
                <img
                  src={album.images[0]?.url}
                  alt={album.name}
                  width={120}
                  height={120}
                  className="album-cover"
                />
                <div className="album-details">
                  <h3>{album.name}</h3>
                  <p>{album.release_date}</p>
                </div>
              </div>

              {expandedAlbumId === album.id && (
                <ul className="songs-list">
                  {songsByAlbum[album.id]?.map((song) => (
                    <li key={song.id} className="songs-list-item">
                      <div className="songs-list-info">
                        <Link to={`/song/${song.id}`}><strong>{song.name}</strong></Link>
                      </div>
                      <button className="song-list-add-button" onClick={() => addToLibrary(song, album)}>➕</button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </section>
      )}
    </main>
  );
};

export default SearchResults;
