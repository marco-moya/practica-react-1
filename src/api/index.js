import { setToken } from "../redux/libraryActions";

export const fetchToken = async (dispatch) => {
    try {
      const client_id = "eba79c0ca5fc4125b4f921501f73bb87";
      const client_secret = "cf889b1789fa4af0a79c293581f39b99";
      const authString = btoa(`${client_id}:${client_secret}`);

      const response = await fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Basic ${authString}`,
        },
        body: "grant_type=client_credentials",
      });

      const data = await response.json();
      dispatch( setToken(data.access_token) );
    } catch (err) {
      return null;
    }
};

export const fetchForArtist = async (artistName, token) => {
    const response = await fetch(
      `https://api.spotify.com/v1/search?q=${encodeURIComponent(artistName)}&type=artist&limit=1`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await response.json();
    return data.artists?.items[0];
};

export const fetchAlbums = async (artistId, token) => {
    const response = await fetch(
      `https://api.spotify.com/v1/artists/${artistId}/albums?include_groups=album,single&limit=40`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await response.json();
    return data.items;
};

export const fetchSongsFromAlbum = async (albumId, token) => {
    const response = await fetch(
      `https://api.spotify.com/v1/albums/${albumId}/tracks`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await response.json();
    return data.items;
};

