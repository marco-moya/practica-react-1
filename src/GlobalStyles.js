import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: ${({theme}) => theme.fonts.main};
  }

  #root{
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    color: ${({theme}) => theme.colors.text};
    background-color: ${({theme}) => theme.colors.background};
  }

  li {
    list-style: none;
  }

  a {
    text-decoration: none;
    transition: color 0.2s;
  }

  .modal-content {
    padding: 1rem;
    color: white;
    background: ${({ theme }) => theme.colors.success};
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
    font-size: 1rem;
    font-weight: 700;
    pointer-events: all;
    animation: fadeIn 0.3s ease-out;
  }

  .modal-overlay {
    position: fixed;
    top: 1rem;
    right: 1rem;
    width: auto;
    height: auto;
    background-color: transparent;
    z-index: 100;
    pointer-events: none;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

`;

export default GlobalStyles;