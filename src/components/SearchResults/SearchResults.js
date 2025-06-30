import React from "react";
import { Link } from "react-router-dom";
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
  addToLibrary,
  expandedAlbumId,
  setExpandedAlbumId,
  error,
}) => {
  const toggleAlbum = (albumId) => {
    setExpandedAlbumId(prevId => (prevId === albumId ? null : albumId));
  };

  return (
    <Main>
      {error && <p>{error}</p>}

      {artist && (
        <ArtistInfo>
          <h2>Resultados para: {artist.name}</h2>
        </ArtistInfo>
      )}

      {albums.length > 0 && (
        <AlbumList>
          {albums.map((album) => (
            console.log(album.album_type),
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
                      <SongListAddButton  onClick={() => addToLibrary(song, album)}>➕</SongListAddButton>
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
