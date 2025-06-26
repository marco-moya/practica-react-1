import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./SongDetail.css";

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
    <main className="song-detail">
      <div className="song-detail-container">
        <img src={song.album.images[1]?.url} alt={song.album.name} />
        <h2 className="song-detail-title">{song.name}</h2>
        <p className="song-detail-artist">Artista: {song.artists.map((a) => a.name).join(", ")}</p>
        <p className="song-detail-album">Álbum: {song.album.name}</p>
      </div>
    </main>
  );
};

export default SongDetail;
