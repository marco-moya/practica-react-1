import styles from "styled-components";

const Title = styles.h1`
  text-align: center;
  margin: 20px 0;
  font-size: 2rem;
  color: ${({ theme }) => theme.colors.text};
`;

const Navigate = styles.nav`
  padding: 10px;
  display: flex;
  justify-content: space-between;
  gap: 10px;
`;

const ButtonLibrary = styles.button`
  padding: 10px 20px;
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  font-weight: bold;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: ${({ theme }) => theme.colors.bgButtonHover};
    color: ${({ theme }) => theme.colors.text};
  }
`;

const ButtonBack = styles.button`
  padding: 10px 20px;
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  font-weight: bold;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: ${({ theme }) => theme.colors.bgButtonHover};
    color: ${({ theme }) => theme.colors.text};
  }
`;

export {
  Title,
  Navigate,
  ButtonLibrary,
  ButtonBack
};