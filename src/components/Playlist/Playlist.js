import React from 'react';

export default function Playlist(props) {
  const playlist = props.playlist;
  return (
    <div>
      <img src={playlist.imageUrl} style={{ width: '200px' }} alt="" />
      <h3>{playlist.name}</h3>
      <ul style={{ padding: '0 20px' }}>
        {playlist.songs.map((song, index) => (
          <li key={index}>{song.name}</li>
        ))}
      </ul>
    </div>
  );
}
