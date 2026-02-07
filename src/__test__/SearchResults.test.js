import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { ThemeProvider } from "styled-components";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import SearchResults from "../components/SearchResults/SearchResults";
import libraryReducer from "../redux/slices/librarySlice";
import searchReducer from "../redux/slices/searchSlice";
import theme from "../theme";

// Mock de react-modal
jest.mock("react-modal", () => {
  return {
    __esModule: true,
    default: ({ children, isOpen }) => (isOpen ? <div>{children}</div> : null),
  };
});

// Datos simulados para las pruebas
const mockSearchResults = {
  artist: {
    id: "1",
    name: "Taylor Swift",
  },
  albums: [
    {
      id: "album1",
      name: "1989",
      album_type: "album",
      release_date: "2014-10-27",
      images: [
        { url: "https://example.com/album1-large.jpg" },
        { url: "https://example.com/album1-medium.jpg" },
      ],
    },
    {
      id: "album2",
      name: "Lover",
      album_type: "album",
      release_date: "2019-08-23",
      images: [
        { url: "https://example.com/album2-large.jpg" },
        { url: "https://example.com/album2-medium.jpg" },
      ],
    },
  ],
  allSongs: {
    album1: [
      {
        id: "song1",
        name: "Shake It Off",
        artists: [{ name: "Taylor Swift" }],
      },
      {
        id: "song2",
        name: "Blank Space",
        artists: [{ name: "Taylor Swift" }],
      },
    ],
    album2: [
      {
        id: "song3",
        name: "Lover",
        artists: [{ name: "Taylor Swift" }],
      },
    ],
  },
};

// Función auxiliar para crear un store de prueba
const createTestStore = (searchState = {}, libraryState = {}) => {
  return configureStore({
    reducer: {
      library: libraryReducer,
      search: searchReducer,
    },
    preloadedState: {
      search: {
        results: null,
        loading: false,
        error: null,
        ...searchState,
      },
      library: {
        myLibrary: [],
        ...libraryState,
      },
    },
  });
};

// Función auxiliar para renderizar el componente con Redux
const renderWithRedux = (searchState = {}, libraryState = {}) => {
  const store = createTestStore(searchState, libraryState);
  return render(
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <SearchResults />
      </ThemeProvider>
    </Provider>
  );
};

describe("SearchResults Component", () => {
  
  it("Shoud display songs list", () => {
    renderWithRedux({ results: mockSearchResults });

    // Verificar que el nombre del artista se muestra
    expect(screen.getByText(/Resultados para: Taylor Swift/i)).toBeInTheDocument();

    // Verificar que los álbumes se renderizan
    expect(screen.getByText("1989")).toBeInTheDocument();
    expect(screen.getByText("Lover")).toBeInTheDocument();

    // Expandir el primer álbum para ver las canciones
    const firstAlbumHeader = screen.getByText("1989").closest("div[role='button'], div");
    fireEvent.click(firstAlbumHeader.parentElement);

    // Verificar que las canciones del álbum se muestran
    expect(screen.getByText("Shake It Off")).toBeInTheDocument();
    expect(screen.getByText("Blank Space")).toBeInTheDocument();
  });

  it("Shoud display title, artist and album to every song", () => {
    renderWithRedux({ results: mockSearchResults });

    // Expandir el primer álbum
    const firstAlbumHeader = screen.getByText("1989").closest("div[role='button'], div");
    fireEvent.click(firstAlbumHeader.parentElement);

    // Verificar que el título de la canción se muestra
    const song1Link = screen.getByText("Shake It Off");
    expect(song1Link).toBeInTheDocument();

    const song2Link = screen.getByText("Blank Space");
    expect(song2Link).toBeInTheDocument();
  });

  it("Should the bottom 'Add to my library' executes a function on click", () => {
    const store = createTestStore({ results: mockSearchResults });
    
    render(
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <SearchResults />
        </ThemeProvider>
      </Provider>
    );

    // Expandir el primer álbum para ver las canciones
    const firstAlbumHeader = screen.getByText("1989").closest("div[role='button'], div");
    fireEvent.click(firstAlbumHeader.parentElement);

    // Verificar que el estado inicial de la biblioteca está vacío
    let state = store.getState();
    expect(state.library.myLibrary).toHaveLength(0);

    // Encontrar y hacer clic en el botón de agregar de la primera canción
    const addButtons = screen.getAllByText("➕");
    fireEvent.click(addButtons[0]); // Click en el botón de "Shake It Off"

    // Verificar que la canción se agregó a la biblioteca
    state = store.getState();
    expect(state.library.myLibrary).toHaveLength(1);
    expect(state.library.myLibrary[0].title).toBe("Shake It Off");
    expect(state.library.myLibrary[0].artist).toBe("Taylor Swift");
    expect(state.library.myLibrary[0].album.name).toBe("1989");

    // Verificar que se muestra el modal de confirmación
    expect(screen.getByText("🎵 Canción agregada a tu biblioteca")).toBeInTheDocument();
  });

  it("Should display a message if the song is already in the library.", () => {
    // Inicializar la biblioteca con una canción ya agregada
    const libraryWithSong = {
      myLibrary: [
        {
          id: "song1",
          title: "Shake It Off",
          artist: "Taylor Swift",
          album: {
            name: "1989",
            images: mockSearchResults.albums[0].images,
          },
        },
      ],
    };

    const store = createTestStore({ results: mockSearchResults }, libraryWithSong);

    render(
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <SearchResults />
        </ThemeProvider>
      </Provider>
    );

    // Expandir el primer álbum
    const firstAlbumHeader = screen.getByText("1989").closest("div[role='button'], div");
    fireEvent.click(firstAlbumHeader.parentElement);

    // Intentar agregar la misma canción nuevamente
    const addButtons = screen.getAllByText("➕");
    fireEvent.click(addButtons[0]);

    // Verificar que NO se agregó duplicada
    const state = store.getState();
    expect(state.library.myLibrary).toHaveLength(1); // Sigue siendo 1

    // Verificar que se muestra el modal de advertencia
    expect(screen.getByText("La canción ya esta en tu biblioteca")).toBeInTheDocument();
  });
});
