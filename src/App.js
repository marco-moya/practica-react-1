import { Routes, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";
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
  return (
    <ThemeProvider theme={theme}>
      <>
        <GlobalStyles />
        <Header />
        <SearchBar />
        <Routes>
          <Route path="/" element={<SearchResults />}/>
          <Route path="/song/:id" element={<SongDetail />} />
          <Route path="/library" element={<Library />} />
        </Routes>
      </>
    </ThemeProvider>
  );
};

export default App;
