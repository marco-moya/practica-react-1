import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  SearchBarContainer, 
  SearchInput, 
  LoadingText, 
  SearchButton
} from "./styles.js";

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
    <SearchBarContainer>
      <SearchInput
        type="text"
        placeholder="Buscar canciones, artistas o álbumes..."
        value={artist}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        disabled={loading}
      />
      {loading ? (
        <LoadingText>Cargando...</LoadingText>
      ) : (
        <SearchButton onClick={handleSearch}>
          Buscar
        </SearchButton>
      )}
    </SearchBarContainer>
  );
};

export default SearchBar;
