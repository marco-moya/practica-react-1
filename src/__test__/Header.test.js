import { render, screen, fireEvent } from "@testing-library/react";
import { ThemeProvider } from "styled-components";
import Header from "../components/Header/Header";
import theme from "../theme";

// Mock de react-router-dom
const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  useNavigate: () => mockNavigate,
}));

// Helper para renderizar con ThemeProvider
const renderWithTheme = (component) => {
  return render(<ThemeProvider theme={theme}>{component}</ThemeProvider>);
};

describe("Header Component", () => {
  beforeEach(() => {
    mockNavigate.mockClear();
  });

  it("should render the application title", () => {
    renderWithTheme(<Header />);
    
    const title = screen.getByText("Music App");
    expect(title).toBeInTheDocument();
    expect(title.tagName).toBe("H1");
  });

  it("should render the Back button", () => {
    renderWithTheme(<Header />);
    
    const buttonBack = screen.getByText(/volver/i);
    expect(buttonBack).toBeInTheDocument();
    expect(buttonBack.tagName).toBe("BUTTON");
  });

  it("should render the View Library button", () => {
    renderWithTheme(<Header />);
    
    const buttonLibrary = screen.getByText(/biblioteca/i);
    expect(buttonLibrary).toBeInTheDocument();
    expect(buttonLibrary.tagName).toBe("BUTTON");
  });

  it("should be able to navigate back by clicking on Back", () => {
    renderWithTheme(<Header />);
    
    const buttonBack = screen.getByText(/volver/i);
    fireEvent.click(buttonBack);
    
    expect(mockNavigate).toHaveBeenCalledTimes(1);
    expect(mockNavigate).toHaveBeenCalledWith(-1);
  });

  it("should be able to navigate to /library when you click on View Library", () => {
    renderWithTheme(<Header />);
    
    const buttonLibrary = screen.getByText(/biblioteca/i);
    fireEvent.click(buttonLibrary);
    
    expect(mockNavigate).toHaveBeenCalledTimes(1);
    expect(mockNavigate).toHaveBeenCalledWith("/library");
  });
});