import React from 'react';

export default function Playlist(props) {
  const playlist = props.playlist;
  return (
    <div style={{ width: '25%', display: 'inline-block' }}>
      <img src={playlist.imageUrl} style={{ width: '60px' }} alt="" />
      <h3>{playlist.name}</h3>
      <ul>
        {playlist.songs.map((song, index) => (
          <li key={index}>{song.name}</li>
        ))}
      </ul>
    </div>
  );
}
