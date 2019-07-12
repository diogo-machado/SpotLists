import React, { Component } from 'react';

export default class PlaylistCounter extends Component {
  render() {
    return (
      <div>
        <h2>{this.props.playlists.length} playlists's</h2>
      </div>
    );
  }
}