import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { fetchToken, fetchForArtist, fetchAlbums, fetchSongsFromAlbum } from "./api";
import Modal from "react-modal";
import Header from "./components/Header/Header";
import Library from "./components/Library/Library";
import SearchBar from "./components/SearchBar/SearchBar";
import SearchResults from "./components/SearchResults/SearchResults";
import SongDetail from "./components/SongDetail/SongDetail";
import GlobalStyles from "./GlobalStyles";
import theme from "./theme";

Modal.setAppElement("#root");

const App = () => {
  const [artist, setArtist] = useState(null);
  const [albums, setAlbums] = useState([]);
  const [songsByAlbum, setSongsByAlbum] = useState({});
  const [expandedAlbumId, setExpandedAlbumId] = useState(null);
  const [error, setError] = useState(null);
  
  const dispatch = useDispatch();
  const library = useSelector((state) => state.library);
  const token = useSelector((state) => state.token);

  useEffect(() => {
    localStorage.setItem("myLibrary", JSON.stringify(library));
  }, [library]);

  useEffect(() => {
    fetchToken(dispatch);
  }, [dispatch]);

  const handleSearch = async (artistName) => {
    if (!token) {
    setError("Token no disponible. Intenta de nuevo en unos segundos.");
    return;
    }
    setError(null);
    setAlbums([]);
    setArtist(null);
    setExpandedAlbumId(null);
    setSongsByAlbum({});

    try {
      const fetchedArtist = await fetchForArtist(artistName, token);
      if (!fetchedArtist) {
        setError("Artista no encontrado");
        return;
      }

      setArtist(fetchedArtist);
      const fetchedAlbums = await fetchAlbums(fetchedArtist.id, token);
      setAlbums(fetchedAlbums);

      const allSongs = {};
      for (const album of fetchedAlbums) {
        const tracks = await fetchSongsFromAlbum(album.id, token);
        allSongs[album.id] = tracks;
      }
      setSongsByAlbum(allSongs);
    } catch (err) {
      setError("Error al cargar los datos del artista");
    }
  };

  const addToLibrary = (song, album) => {
    const songWithAlbum = { ...song, album };
    dispatch({ type: "ADD_SONG", payload: songWithAlbum });
  };

  return (
    <ThemeProvider theme={theme}>
      <>
        <GlobalStyles />
        <Header />
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
          <Route path="/library" element={<Library songs={library} />} />
        </Routes>
      </>
    </ThemeProvider>
  );
};

export default App;
