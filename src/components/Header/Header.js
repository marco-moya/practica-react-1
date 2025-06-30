import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Title,
  Navigate,
  ButtonLibrary,
  ButtonBack
} from "./styles.js";

const Header = () => {
  const navigate = useNavigate();
  return (
    <header>
      <Title>Music App</Title>
      <Navigate>
          <ButtonBack onClick={() => navigate(-1)}>⬅ Volver</ButtonBack>
          <ButtonLibrary onClick={() => navigate("/library")}>🎧 Ver Biblioteca</ButtonLibrary>
      </Navigate>
    </header>
  );
}

export default Header;