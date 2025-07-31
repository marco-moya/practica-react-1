import React from "react";
import {
  SongItem,
  SongItemImage,
  SongInfoContainer,
  SongTitle,
  SongArtist,
  SongAlbum,
  SongRemoveButton
} from "./styles.js";

const Song = ({ info, onRemove }) => {
  
  if (!info) return null;

  const {
    id,
    title = info.title || "Unknown",
    artist = info.artist || "Unknown",
    album = { name: "Unknown", images: [] },
  } = info;

  return (
    <SongItem>
      <SongItemImage src={album.images[1]?.url} alt={album.name} />
      <SongInfoContainer>
        <SongTitle>{title}</SongTitle>
        <SongArtist>
          <strong>Artist:</strong> {artist}
        </SongArtist>
        <SongAlbum>
          <strong>Album:</strong> {album.name}
        </SongAlbum>
      </SongInfoContainer>
      <SongRemoveButton onClick={() => onRemove(id)}>➖</SongRemoveButton>
    </SongItem>
  );
};

export default Song;

