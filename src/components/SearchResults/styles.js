import styles, { keyframes } from "styled-components";

const Main = styles.main`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

const spin = keyframes`
  to {
    transform: rotate(360deg);
  }
`;

const Spinner = styles.div`
  padding: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  p {
    padding-bottom: 1rem;
  }

  div {
    width: 40px;
    height: 40px;
    border: 4px solid #f3f3f3;
    border-top: 4px solid #3498db;
    border-radius: 50%;
    animation: ${spin} 1s linear infinite;
    margin-bottom: 1re;
  }
`;

const ArtistInfo = styles.section`
  margin-bottom: 40px;
`;

const AlbumList = styles.section`
  width: 80%;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 10px;
`;

const Album = styles.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 10px;
  padding: 10px;
  border-radius: 8px;
  background-color: #f0f0f0;
  box-shadow: ${({ theme }) => theme.colors.boxShadowCard};
  text-align: center;
  transition: transform 0.2s ease-in-out;
  overflow: hidden;
  position: relative;
  &:hover {
    transform: scale(1.05);
  }

`;

const Ribbon = styles.div`
  position: absolute;
  top: 10px;
  right: -48px;
  width: 140px;
  padding: 0.3rem 0;
  background-color: ${({ type }) =>
    type === 'album' ? '#4CAF50' : '#2196F3'};
  color: white;
  text-align: center;
  font-size: 0.75rem;
  font-weight: bold;
  transform: rotate(45deg);
  box-shadow: 0 2px 6px rgba(0,0,0,0.2);
`;

const AlbumHeader = styles.div`
  width: 100%;
  margin-bottom: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  cursor: pointer;
`;

const AlbumCover = styles.img`
  width: 120px;
  height: 120px;
`;

const AlbumDetails = styles.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  & p{
    margin: 0;
    font-size: 14px;
    color: #555;
  }
`;

const SongList = styles.ul`
  width: 100%;
`;
 
const SongListItem = styles.li`
  padding: 6px;
  display: flex;
  justify-content: center;
  position: relative;
`;

const SongsListInfo = styles.div`
  width: 80%;
  & a {
    color: ${({ theme }) => theme.colors.text};
    font-size: 14px;
  }
  & a:hover {
    text-decoration: underline;
  }
`;

const SongListAddButton = styles.button`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  border: none;
  cursor: pointer;
  position: absolute;
  right: 0;
  &:hover {
    background-color: ${({ theme }) => theme.colors.bgButtonHover};
    transform: scale(1.2);
  }
`;
  
export {
  Main,
  Spinner,
  ArtistInfo,
  AlbumList,
  Album,
  Ribbon,
  AlbumHeader,
  AlbumCover,
  AlbumDetails,
  SongList,
  SongListItem,
  SongsListInfo,
  SongListAddButton
};