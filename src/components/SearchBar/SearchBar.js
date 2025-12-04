import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchSongs } from "../../redux/slices/thunk.js";
import {
  SearchBarContainer, 
  SearchInput, 
  SearchButton
} from "./styles.js";

const SearchBar = () => {
  const [artist, setArtist] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleInputChange = (e) => setArtist(e.target.value);

  const handleSearch = async () => {
    if (artist.trim() !== "") {
      try {
        dispatch(fetchSongs(artist));
        navigate("/");
        setArtist("");
      } catch (error) {
        console.error("Error al buscar:", error);
      } finally {
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
      />
      <SearchButton onClick={handleSearch}>
        Buscar
      </SearchButton>
    </SearchBarContainer>
  );
};

export default SearchBar;
