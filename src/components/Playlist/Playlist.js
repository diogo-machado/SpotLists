import React, { Component } from 'react';

export default class Playlist extends Component {
  render() {
    const playlist = this.props.playlist;
    return (
      <div style={{ width: '25%', display: 'inline-block' }}>
        <img src="" alt="" />
        <h3>{playlist.name}</h3>
        <ul>
          {playlist.songs.map(song => {
            return <li>{song.name}</li>;
          })}
        </ul>
      </div>
    );
  }
}
