import styled from "styled-components";

const SongItem = styled.li`
  padding: 8px;
  display: flex;
  align-items: center;
  background-color: #ffffff;
  border: 1px solid #ddd;
  border-radius: 10px;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
  position: relative;
`;

const SongItemImage = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 5px;
  margin-right: 10px;
`;

const SongInfoContainer = styled.div`
  width: 100%;
  padding-right: 20px;
  display: flex;
  flex-direction: column;
`;


const SongTitle = styled.h3`
  margin-bottom: 10px;
  font-size: 1rem;
  font-weight: bold;
  color: #333;
`;

const SongArtist = styled.p`
  margin-bottom: 8px;
  font-size: 0.9rem;
  color: #666;
`;

const SongAlbum = styled.p`
  font-size: 0.8rem;
  color: #999;
`;

const SongRemoveButton = styled.button`
  width: 24px;
  height: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  border-radius: 50%;
  background-color: transparent;
  cursor: pointer;
  position: absolute;
  top: 5px;
  right: 5px;
  &:hover {
    background-color: #e0e0e0;
    transform: scale(1.2);
  }
`;

export {
  SongItem,
  SongItemImage,
  SongInfoContainer,
  SongTitle,
  SongArtist,
  SongAlbum,
  SongRemoveButton
};
