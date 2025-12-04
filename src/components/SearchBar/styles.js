import styled from "styled-components";

const SearchBarContainer = styled.div`
  width: 50%;
  min-width: 300px;
  margin: 20px auto;
  position: relative;
  `;
  
  const SearchInput = styled.input`
  width: 100%;
  min-width: 300px;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 5px ;
`;

const SearchButton = styled.button`
  height: 100%;
  padding: 8px 12px;
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  border: none;
  border-radius: 0 5px 5px 0;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.3s;
  position: absolute;
  top: 0;
  right: 0;

  &:hover {
    background-color: ${({ theme }) => theme.colors.bgButtonHover};
    color: ${({ theme }) => theme.colors.text};
  }
`;

export { 
  SearchBarContainer, 
  SearchInput, 
  SearchButton
};