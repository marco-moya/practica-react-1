import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  SongDetailCard,
  SongDetailContainer,
  SongDetailCardImage,
  SongDetailTitle,
  SongDetailArtist,
  SongDetailAlbum
} from "./styles.js";

const SongDetail = ({ token }) => {
  const { id } = useParams();
  const [song, setSong] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSongDetail = async () => {
      try {
        const response = await fetch(`https://api.spotify.com/v1/tracks/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        setSong(data);
      } catch (err) {
        setError("No se pudo cargar la canción");
      }
    };

    fetchSongDetail();
  }, [id, token]);

  if (error) return <p>{error}</p>;
  if (!song) return <p>Cargando...</p>;

  return (
    <SongDetailCard>
      <SongDetailContainer>
        <SongDetailCardImage src={song.album.images[1]?.url} alt={song.album.name} />
        <SongDetailTitle>{song.name}</SongDetailTitle>
        <SongDetailArtist>Artista: {song.artists.map((a) => a.name).join(", ")}</SongDetailArtist>
        <SongDetailAlbum>Álbum: {song.album.name}</SongDetailAlbum>
      </SongDetailContainer>
    </SongDetailCard>
  );
};

export default SongDetail;
