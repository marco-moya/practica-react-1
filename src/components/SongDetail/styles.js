import styled from "styled-components";

const SongDetailCard = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
`;

const SongDetailContainer = styled.div`
  max-width: 250px;
  padding: 8px;
  background-color: #ffffff;
  border: 1px solid #ddd;
  border-radius: 10px;
  box-shadow: ${({ theme }) => theme.colors.boxShadowCard};
  text-align: center;
  transition: transform 0.2s ease-in-out;
`;

const SongDetailCardImage = styled.img`
  width: 100%;
  height: auto;
  border-radius: 8px;
  margin-bottom: 10px;
`;

const SongDetailTitle = styled.h2`
  margin-bottom: 10px;
  font-size: 1.5rem;
  font-weight: bold;
  color: #333;
`;

const SongDetailArtist = styled.p`
  margin-bottom: 8px;
  font-size: 1rem;
  color: #666;
`;

const SongDetailAlbum = styled.p`
font-size: 0.9rem;
color: #999;
`;

export {
  SongDetailCard,
  SongDetailContainer,
  SongDetailCardImage,
  SongDetailTitle,
  SongDetailArtist,
  SongDetailAlbum
};