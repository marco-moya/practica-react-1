import { render, screen, fireEvent, waitFor, act } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { configureStore } from "@reduxjs/toolkit";
import App from "../App";
import libraryReducer from "../redux/slices/librarySlice";
import searchReducer from "../redux/slices/searchSlice";

// Mock de react-modal
jest.mock("react-modal", () => {
  const Modal = ({ children, isOpen }) => (isOpen ? <div>{children}</div> : null);
  Modal.setAppElement = jest.fn();
  return {
    __esModule: true,
    default: Modal,
  };
});

// Mock del thunk fetchSongs
jest.mock("../redux/slices/thunk", () => {
  const mockThunk = jest.fn((artist) => {
    // Retornar una función thunk que retorna una promesa
    return async (dispatch) => {
      dispatch({ type: "songs/fetchSongs/pending" });
      return Promise.resolve();
    };
  });
  
  // Simular las propiedades de un thunk real (pending, fulfilled, rejected)
  const createActionType = (type) => {
    const actionCreator = jest.fn();
    actionCreator.type = type;
    actionCreator.toString = () => type;
    actionCreator.match = jest.fn();
    return actionCreator;
  };
  
  mockThunk.pending = createActionType("songs/fetchSongs/pending");
  mockThunk.fulfilled = createActionType("songs/fetchSongs/fulfilled");
  mockThunk.rejected = createActionType("songs/fetchSongs/rejected");
  mockThunk.typePrefix = "songs/fetchSongs";
  
  return {
    fetchSongs: mockThunk,
  };
});

// Mock de useNavigate - SIN requireActual
jest.mock("react-router-dom", () => ({
  MemoryRouter: ({ children }) => <div>{children}</div>,
  useNavigate: () => jest.fn(),
  Routes: ({ children }) => <div>{children}</div>,
  Route: ({ element }) => element,
  Link: ({ children, to }) => <a href={to}>{children}</a>,
  useLocation: () => ({
    pathname: '/',
    search: '',
    hash: '',
    state: null,
  }),
  useParams: () => ({}),
}));

// Datos ficticios para las pruebas (estructura compatible con Spotify API)
const mockSearchResults = {
  artist: {
    id: "artist-1",
    name: "The Beatles",
  },
  albums: [
    {
      id: "album-1",
      name: "Abbey Road",
      release_date: "1969-09-26",
      album_type: "album",
      images: [{ url: "https://example.com/artwork1.jpg" }],
    },
  ],
  allSongs: {
    "album-1": [
      {
        id: "song-1",
        name: "Come Together",
        artists: [{ name: "The Beatles" }],
      },
      {
        id: "song-2",
        name: "Something",
        artists: [{ name: "The Beatles" }],
      },
    ],
  },
};

// Función helper para crear un store de prueba
const createMockStore = (initialState = {}) => {
  return configureStore({
    reducer: {
      library: libraryReducer,
      search: searchReducer,
    },
    preloadedState: {
      library: {
        myLibrary: [],
      },
      search: {
        results: [],
        loading: false,
        error: null,
      },
      ...initialState,
    },
  });
};

// Función helper para renderizar el componente con providers
const renderWithProviders = (
  component,
  {
    initialState = {},
    store = createMockStore(initialState),
    ...renderOptions
  } = {}
) => {
  const Wrapper = ({ children }) => (
    <Provider store={store}>
      <MemoryRouter>{children}</MemoryRouter>
    </Provider>
  );

  return {
    store,
    ...render(component, { wrapper: Wrapper, ...renderOptions }),
  };
};

describe("Pruebas del componente App", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  
  //  PRUEBA 1: Verificar que la aplicación renderiza todos los componentes principales
  it("Should render the Header, SearchBar, SearchResults, and Library components.", () => {
    renderWithProviders(<App />);

    // Verificar que el Header está presente
    const header = screen.getByRole("banner");
    expect(header).toBeInTheDocument();

    // Verificar que el SearchBar está presente (buscar el input de búsqueda)
    const searchInput = screen.getByPlaceholderText(/buscar/i);
    expect(searchInput).toBeInTheDocument();

    // Verificar que el botón de búsqueda está presente
    const searchButton = screen.getByRole("button", { name: /buscar/i });
    expect(searchButton).toBeInTheDocument();

    // Verificar que Library se renderiza con su título
    expect(screen.getByText(/mi biblioteca/i)).toBeInTheDocument();
  });

  // PRUEBA 2: Simular búsqueda de canciones y verificar resultados
  it("Should search for songs by typing in the input field and verify that the results are displayed", async () => {
    const { store } = renderWithProviders(<App />);

    // 1. Encontrar el input de búsqueda
    const searchInput = screen.getByPlaceholderText(/buscar/i);
    const searchButton = screen.getByRole("button", { name: /buscar/i });

    // 2. Escribir el nombre del artista en el input
    fireEvent.change(searchInput, { target: { value: "The Beatles" } });

    // Verificar que el valor del input cambió
    expect(searchInput.value).toBe("The Beatles");

    // 3. Hacer clic en el botón de búsqueda
    fireEvent.click(searchButton);

    // 4. Despachar manualmente la acción para simular los resultados
    act(() => {
      store.dispatch({
        type: "songs/fetchSongs/fulfilled",
        payload: mockSearchResults,
      });
    });

    // 5. Esperar a que aparezca el álbum Abbey Road
    await waitFor(() => {
      expect(screen.getByText("Abbey Road")).toBeInTheDocument();
    });

    // 6. Expandir el álbum haciendo clic en él
    const albumElement = screen.getByText("Abbey Road");
    fireEvent.click(albumElement);

    // 7. Esperar a que las canciones se muestren después de expandir
    await waitFor(() => {
      expect(screen.getByText("Come Together")).toBeInTheDocument();
      expect(screen.getByText("Something")).toBeInTheDocument();
    });
  });

  // PRUEBA 3: Simular agregar una canción a la biblioteca
  it("Should add a song to the library and verify that it appears in the Library.", async () => {
    // Renderizar con resultados de búsqueda precargados
    const { store } = renderWithProviders(<App />, {
      initialState: {
        search: {
          results: mockSearchResults,
          loading: false,
          error: null,
        },
        library: {
          myLibrary: [],
        },
      },
    });

    // 1. Verificar que el álbum se muestra
    expect(screen.getByText("Abbey Road")).toBeInTheDocument();

    // 2. Expandir el álbum haciendo clic en él
    const albumElement = screen.getByText("Abbey Road");
    fireEvent.click(albumElement);

    // 3. Esperar a que se muestren las canciones del álbum expandido
    await waitFor(() => {
      expect(screen.getByText("Come Together")).toBeInTheDocument();
    });

    // 4. Buscar los botones de agregar
    const addButtons = screen.getAllByRole("button", { name: /➕/i });
    expect(addButtons.length).toBeGreaterThan(0);

    // 5. Hacer clic en el botón para agregar la primera canción
    fireEvent.click(addButtons[0]);

    // 6. Verificar que la canción se agregó al estado de Redux
    await waitFor(() => {
      const state = store.getState();
      expect(state.library.myLibrary).toHaveLength(1);
      expect(state.library.myLibrary[0].title).toBe("Come Together");
    });
  });
});
