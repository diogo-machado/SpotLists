import React, { Component } from 'react';

export default class HoursCounter extends Component {
  render() {
    let allSongs = this.props.playlists.reduce((songs, eachPlaylist) => {
      return songs.concat(eachPlaylist.songs);
    }, []);
    let totalDuration = allSongs.reduce((sum, eachSong) => {
      return sum + eachSong.duration;
    }, 0);
    return (
      <div>
        <h2>{Math.round(totalDuration / 3600)} hours</h2>
      </div>
    );
  }
}
