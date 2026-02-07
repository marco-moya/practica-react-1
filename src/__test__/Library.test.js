import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import Library from "../components/Library/Library";
import libraryReducer from "../redux/slices/librarySlice";

// Configurar react-modal para pruebas
import Modal from "react-modal";
Modal.setAppElement(document.createElement("div"));

// Función helper para crear un store de prueba con estado inicial personalizado
const createTestStore = (initialState = {}) => {
  return configureStore({
    reducer: {
      library: libraryReducer,
    },
    preloadedState: {
      library: {
        myLibrary: initialState.myLibrary || [],
      },
    },
  });
};

// Función helper para renderizar con Provider
const renderWithProvider = (component, store) => {
  return render(<Provider store={store}>{component}</Provider>);
};

describe("Library Component", () => {
  // Datos de prueba simulados
  const mockSongs = [
    {
      id: "1",
      title: "Canción de Prueba 1",
      artist: "Artista 1",
      album: {
        name: "Álbum 1",
        images: [
          { url: "https://example.com/image1-small.jpg" },
          { url: "https://example.com/image1-medium.jpg" },
        ],
      },
    },
    {
      id: "2",
      title: "Canción de Prueba 2",
      artist: "Artista 2",
      album: {
        name: "Álbum 2",
        images: [
          { url: "https://example.com/image2-small.jpg" },
          { url: "https://example.com/image2-medium.jpg" },
        ],
      },
    },
    {
      id: "3",
      title: "Canción de Prueba 3",
      artist: "Artista 3",
      album: {
        name: "Álbum 3",
        images: [
          { url: "https://example.com/image3-small.jpg" },
          { url: "https://example.com/image3-medium.jpg" },
        ],
      },
    },
  ];

  // PRUEBA 1: La lista de canciones de la biblioteca se muestra correctamente.
  it("Should correctly display the library's song list", () => {
    // Crear store con canciones simuladas
    const store = createTestStore({ myLibrary: mockSongs });

    // Renderizar el componente
    renderWithProvider(<Library />, store);

    // Verificar que el título de la biblioteca se muestra
    expect(screen.getByText("Mi Biblioteca")).toBeInTheDocument();

    // Verificar que todas las canciones se renderizan
    expect(screen.getByText("Canción de Prueba 1")).toBeInTheDocument();
    expect(screen.getByText("Canción de Prueba 2")).toBeInTheDocument();
    expect(screen.getByText("Canción de Prueba 3")).toBeInTheDocument();

    // Verificar que los artistas se muestran
    expect(screen.getByText("Artista 1")).toBeInTheDocument();
    expect(screen.getByText("Artista 2")).toBeInTheDocument();
    expect(screen.getByText("Artista 3")).toBeInTheDocument();

    // Verificar que los álbumes se muestran
    expect(screen.getByText("Álbum 1")).toBeInTheDocument();
    expect(screen.getByText("Álbum 2")).toBeInTheDocument();
    expect(screen.getByText("Álbum 3")).toBeInTheDocument();
  });


  // PRUEBA 2: Cada canción tiene un botón "Eliminar" que ejecuta una función al hacer clic.
  it("Should have a 'Delete' button that executes a function when clicked.", () => {
    // Crear store con canciones simuladas
    const store = createTestStore({ myLibrary: mockSongs });

    // Renderizar el componente
    renderWithProvider(<Library />, store);

    // Obtener todos los botones de eliminar (representados por ➖)
    const removeButtons = screen.getAllByText("➖");

    // Verificar que hay 3 botones de eliminar (uno por cada canción)
    expect(removeButtons).toHaveLength(3);

    // Verificar el estado inicial: todas las canciones están presentes
    expect(screen.getByText("Canción de Prueba 1")).toBeInTheDocument();
    expect(screen.getByText("Canción de Prueba 2")).toBeInTheDocument();
    expect(screen.getByText("Canción de Prueba 3")).toBeInTheDocument();

    // Hacer clic en el primer botón de eliminar
    fireEvent.click(removeButtons[0]);

    // Verificar que se muestra el modal de confirmación
    expect(screen.getByText("Canción eliminada")).toBeInTheDocument();

    // Verificar que la primera canción ya no está en el DOM
    expect(screen.queryByText("Canción de Prueba 1")).not.toBeInTheDocument();

    // Verificar que las otras canciones siguen presentes
    expect(screen.getByText("Canción de Prueba 2")).toBeInTheDocument();
    expect(screen.getByText("Canción de Prueba 3")).toBeInTheDocument();
  });


  // PRUEBA 3: La biblioteca vacía muestra un mensaje "No hay canciones en tu biblioteca".
  it("Should display a message 'There are no songs in your library'", () => {
    // Crear store sin canciones (biblioteca vacía)
    const store = createTestStore({ myLibrary: [] });

    // Renderizar el componente
    renderWithProvider(<Library />, store);

    // Verificar que el título de la biblioteca se muestra
    expect(screen.getByText("Mi Biblioteca")).toBeInTheDocument();

    // Verificar que se muestra el mensaje de biblioteca vacía
    expect(
      screen.getByText("No hay canciones en tu biblioteca")
    ).toBeInTheDocument();

    // Verificar que no hay botones de eliminar
    const removeButtons = screen.queryAllByText("➖");
    expect(removeButtons).toHaveLength(0);
  });
});
