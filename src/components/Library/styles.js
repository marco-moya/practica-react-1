import styled from "styled-components";

const LibraryContainer = styled.div`
  width: 100%;
  flex-grow: 1;
`;

const LibraryTitle = styled.h2`
  margin: 20px 0;
  text-align: center;
`;

const LibraryList = styled.ul`
  width: 100%;
  padding: 20px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 10px;
`;

const SongMessage = styled.p`
  text-align: center;
`;

export {
  LibraryContainer,
  LibraryTitle,
  LibraryList,
  SongMessage
};