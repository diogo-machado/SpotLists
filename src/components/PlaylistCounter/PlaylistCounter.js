import React from 'react';

export default function PlaylistCounter(props) {
  return (
    <div>
      <h2>{props.playlists.length} playlists's</h2>
    </div>
  );
}
