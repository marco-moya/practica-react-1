import React from 'react';

class Song extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      song: props.song || "Unknown",
      artist: props.artist || "Unknown",
      album: props.album || "Unknown",
    };
  }

  render() {
    return (
      <div className="song-container">
        <h2 className="song-title">{this.state.song}</h2>
        <p className="song-artist">{this.state.artist}</p>
        <p className="song-album">{this.state.album}</p>
      </div>
    );
  }
}

export default Song;