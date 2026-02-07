import { render, screen, fireEvent } from "@testing-library/react";
import { ThemeProvider } from "styled-components";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import SearchBar from "../components/SearchBar/SearchBar";
import theme from "../theme";
import searchReducer from "../redux/slices/searchSlice";

// Mock de react-router-dom
const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  useNavigate: () => mockNavigate,
}));

// Mock del thunk
const mockFetchSongs = jest.fn();

jest.mock("../redux/slices/thunk", () => {
  return {
    fetchSongs: (...args) => {
      mockFetchSongs(...args);
      return (dispatch) => {
        dispatch({ type: "songs/fetchSongs/pending" });
        return Promise.resolve({
          type: "songs/fetchSongs/fulfilled",
          payload: [],
        });
      };
    },
  };
});

// Agregar propiedades del thunk después del mock
const { fetchSongs } = require("../redux/slices/thunk");
fetchSongs.pending = { type: "songs/fetchSongs/pending" };
fetchSongs.fulfilled = { type: "songs/fetchSongs/fulfilled" };
fetchSongs.rejected = { type: "songs/fetchSongs/rejected" };

describe("SearchBar Component", () => {
  let store;

  beforeEach(() => {
    // Crear un store limpio para cada prueba
    store = configureStore({
      reducer: {
        search: searchReducer,
      },
    });
    mockNavigate.mockClear();
    mockFetchSongs.mockClear();
  });

  const renderSearchBar = () => {
    return render(
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <SearchBar />
        </ThemeProvider>
      </Provider>
    );
  };


  // Prueba 1: El input se renderiza correctamente
  it("should render the input component", () => {
    renderSearchBar();
    const input = screen.getByPlaceholderText(/buscar canciones, artistas o álbumes/i);
    expect(input).toBeInTheDocument();
  });

  // Prueba 2: El usuario puede escribir en el input
  it("should allow user to type in the search input", () => {
    renderSearchBar();
    const input = screen.getByPlaceholderText(/buscar canciones, artistas o álbumes/i);
    
    fireEvent.change(input, { target: { value: "The Beatles" } });
    
    expect(input.value).toBe("The Beatles");
  });

  // Prueba 3: La función de búsqueda se ejecuta al hacer clic en el botón
  it("should trigger search when clicking the search button", () => {
    renderSearchBar();
    
    const input = screen.getByPlaceholderText(/buscar canciones, artistas o álbumes/i);
    const button = screen.getByRole("button", { name: /buscar/i });
    
    fireEvent.change(input, { target: { value: "Queen" } });
    fireEvent.click(button);
    
    expect(mockFetchSongs).toHaveBeenCalledWith("Queen");
    expect(mockNavigate).toHaveBeenCalledWith("/");
  });

  // Prueba 4: La función de búsqueda se ejecuta al presionar Enter
  it("should trigger search when pressing Enter key", () => {
    // const { fetchSongs } = require("../redux/slices/thunk");
    renderSearchBar();
    
    const input = screen.getByPlaceholderText(/buscar canciones, artistas o álbumes/i);
    
    fireEvent.change(input, { target: { value: "Pink Floyd" } });
    fireEvent.keyDown(input, { key: "Enter", code: "Enter" });
    
    expect(mockFetchSongs).toHaveBeenCalledWith("Pink Floyd");
    expect(mockNavigate).toHaveBeenCalledWith("/");
  });
})