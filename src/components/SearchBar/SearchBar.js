import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SearchBar.css";

const SearchBar = ({ onSearch }) => {
  const [artist, setArtist] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => setArtist(e.target.value);

  const handleSearch = async () => {
    if (artist.trim() !== "") {
      setLoading(true);
      try {
        await onSearch(artist);
        navigate("/");
        setArtist("");
      } catch (error) {
        console.error("Error al buscar:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Buscar canciones, artistas o álbumes..."
        value={artist}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        className="search-input"
        disabled={loading}
      />
      {loading ? (
        <span className="loading-text">Cargando...</span>
      ) : (
        <button className="search-button" onClick={handleSearch}>
          Buscar
        </button>
      )}
    </div>
  );
};

export default SearchBar;
