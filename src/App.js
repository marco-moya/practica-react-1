import React, { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Modal from "react-modal";
import Header from "./components/Header/Header";
import Library from "./components/Library/Library";
import SearchBar from "./components/SearchBar/SearchBar";
import SearchResults from "./components/SearchResults/SearchResults";
import SongDetail from "./components/SongDetail/SongDetail";
import "./App.css";
import "./modalStyles.css";

Modal.setAppElement("#root");

const App = () => {
  const [artist, setArtist] = useState(null);
  const [albums, setAlbums] = useState([]);
  const [songsByAlbum, setSongsByAlbum] = useState({});
  const [expandedAlbumId, setExpandedAlbumId] = useState(null);
  const [error, setError] = useState(null);
  const [modalSongAdded, setModalSongAdded] = useState(false);
  const [modalSongAlreadyAdded, setModalSongAlreadyAdded] = useState(false);
  const [modalSongRemoved, setModalSongRemoved] = useState(false);
  const [token, setToken] = useState("");
  const [library, setLibrary] = useState([]);
  const [libraryLoaded, setLibraryLoaded] = useState(false);
  
  useEffect(() => {
    const storedLibrary = localStorage.getItem("myLibrary");
    if (storedLibrary) {
      setLibrary(JSON.parse(storedLibrary));
    }
    setLibraryLoaded(true);
  }, []);

  useEffect(() => {
    if (libraryLoaded) {
      localStorage.setItem("myLibrary", JSON.stringify(library));
    }
  }, [library, libraryLoaded]);

  const fetchToken = async () => {
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
      setToken(data.access_token);
    } catch (err) {
      setError("Error fetching token");
    }
  };

  useEffect(() => {
    fetchToken();
  }, []);

  const fetchForArtist = async (artistName) => {
    const response = await fetch(
      `https://api.spotify.com/v1/search?q=${encodeURIComponent(artistName)}&type=artist&limit=1`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await response.json();
    return data.artists?.items[0];
  };

  const fetchAlbums = async (artistId) => {
    const response = await fetch(
      `https://api.spotify.com/v1/artists/${artistId}/albums?include_groups=album,single&limit=40`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await response.json();
    return data.items;
  };

  const fetchSongsFromAlbum = async (albumId) => {
    const response = await fetch(
      `https://api.spotify.com/v1/albums/${albumId}/tracks`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await response.json();
    return data.items;
  };

  const handleSearch = async (artistName) => {
    setError(null);
    setAlbums([]);
    setArtist(null);
    setExpandedAlbumId(null);
    setSongsByAlbum({});

    try {
      const fetchedArtist = await fetchForArtist(artistName);
      if (!fetchedArtist) {
        setError("Artista no encontrado");
        return;
      }

      setArtist(fetchedArtist);
      const fetchedAlbums = await fetchAlbums(fetchedArtist.id);
      setAlbums(fetchedAlbums);

      const allSongs = {};
      for (const album of fetchedAlbums) {
        const tracks = await fetchSongsFromAlbum(album.id);
        allSongs[album.id] = tracks;
      }
      setSongsByAlbum(allSongs);
    } catch (err) {
      setError("Error al cargar los datos del artista");
    }
  };

  const addToLibrary = (song, album) => {
    if (!libraryLoaded) return;

    if (!library.find((item) => item.id === song.id)) {
      const songWithAlbum = { ...song, album };
      setLibrary([...library, songWithAlbum]);
      setModalSongAdded(true);
      setTimeout(() => setModalSongAdded(false), 2000);
    } else {
      setModalSongAlreadyAdded(true);
      setTimeout(() => setModalSongAlreadyAdded(false), 2000);
    }
  };

  const removeFromLibrary = (songId) => {
    const updatedLibrary = library.filter((song) => song.id !== songId);
    setLibrary(updatedLibrary);
    setModalSongRemoved(true);
    setTimeout(() => setModalSongRemoved(false), 2000);
  };


  const navigate = useNavigate();

  return (
    <>
      <Modal isOpen={modalSongAdded} className="modal-content" overlayClassName="modal-overlay">
        <p>Biblioteca actualizada</p>
      </Modal>
      <Modal isOpen={modalSongAlreadyAdded} className="modal-content" overlayClassName="modal-overlay">
        <p>La canción ya esta en tu biblioteca</p>
      </Modal>
      <Modal isOpen={modalSongRemoved} className="modal-content" overlayClassName="modal-overlay">
        <p>Canción eliminada</p>
      </Modal>


      <Header />

      <div style={{ display: "flex", gap: "10px", padding: "10px", justifyContent:"space-between" }}>
        <button onClick={() => navigate(-1)}>⬅ Volver</button>
        <button onClick={() => navigate("/library")}>🎧 Ver Biblioteca</button>
      </div>

      <SearchBar onSearch={handleSearch} />

      <Routes>
        <Route
          path="/"
          element={
            <SearchResults
              artist={artist}
              albums={albums}
              songsByAlbum={songsByAlbum}
              addToLibrary={addToLibrary}
              expandedAlbumId={expandedAlbumId}
              setExpandedAlbumId={setExpandedAlbumId}
              error={error}
            />
          }
        />
        <Route path="/song/:id" element={token ? <SongDetail token={token} /> : <p>Loading token...</p>} />
        <Route path="/library" element={<Library songs={library} removeFromLibrary={removeFromLibrary} />} />
      </Routes>
    </>
  );
};

export default App;
