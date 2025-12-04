
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchSongs = createAsyncThunk("songs/fetchSongs", async (artistName) => {
  const client_id = "eba79c0ca5fc4125b4f921501f73bb87";
  const client_secret = "cf889b1789fa4af0a79c293581f39b99";
  const authString = btoa(`${client_id}:${client_secret}`);
  // Obtener token de spotify
  const response = await axios.post(
    "https://accounts.spotify.com/api/token",
    "grant_type=client_credentials",
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${authString}`,
      },
    }
  );
  const token = response.data.access_token;

  // Obtener id del artista
  const artistRes = await axios.get(
    `https://api.spotify.com/v1/search?q=${encodeURIComponent(artistName)}&type=artist&limit=1`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  const artist = artistRes.data.artists?.items[0];

  if (!artist) {
    throw new Error('Artista no encontrado');
  }

  // Obtener id de los albunes
  const albumsRes = await axios.get(
    `https://api.spotify.com/v1/artists/${artist.id}/albums?include_groups=album,single&limit=40`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  const albums = albumsRes.data.items;

  // Obtener canciones por álbumes
  const allSongs = {};
  for (const album of albums) {
    const tracks = await axios.get(
      `https://api.spotify.com/v1/albums/${album.id}/tracks`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    // Crea una propiedad con el id del album y guarda sus canciones
    allSongs[album.id] = tracks.data.items; 
  }
  
  return {
    token,
    artist,
    albums,
    allSongs};
});
