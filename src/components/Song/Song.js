import React from "react";
import "./Song.css";

const Song = ({info = {}}) => {
  const { title = "Unknown", artist = "Unknown", album = "Unknown" } = info
  return (
    <li className="song-container">
      <h2 className="song-title">{title}</h2>
      <p className="song-artist">{artist}</p>
      <p className="song-album">{album}</p>
    </li>
  );
}

export default Song;
