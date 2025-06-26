import React from "react";
import "./Song.css";

const Song = ({ info, onRemove  }) => {
  if (!info) return null;

  const {
    id,
    name = "Unknown",
    artists = [],
    album = { name: "Unknown", images: [] },
  } = info;

  return (
      <li className="song-item">
        <img src={album.images[1].url} alt={album.name} />
        <div className="song-details">
          <h3 className="song-title">{name}</h3>
          <p className="song-artist">
            <strong>Artist:</strong> {artists.map((a) => a.name).join(", ")}
          </p>
          <p className="song-album">
            <strong>Album:</strong> {album.name}
          </p>
        </div>
        <button className="song-remove-button" onClick={() => onRemove(id)}>➖</button>
      </li>
  );
};

export default Song;

