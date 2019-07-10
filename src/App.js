import React, { Component } from 'react';
import querystring from 'querystring';
// import logo from './logo.svg';
import PlaylistCounter from './components/PlaylistCounter/PlaylistCounter';
import HoursCounter from './components/HoursCounter/HoursCounter';
import Filter from './components/Filter/Filter';
import Playlist from './components/Playlist/Playlist';
import './App.css';

let fakeServerData = {
  user: {
    name: 'David',
    playlists: [
      {
        name: 'My favorites',
        songs: [
          { name: 'Beat It', duration: 1345 },
          { name: 'Cannelloni Makaroni', duration: 1236 },
          { name: 'Loved to death', duration: 70000 }
        ]
      },
      {
        name: 'Discover Weekly',
        songs: [
          { name: 'Beat It', duration: 1345 },
          { name: 'Bad Boys', duration: 1236 },
          { name: 'Rosa helikopter', duration: 70000 }
        ]
      },
      {
        name: 'Another playlist - the best!',
        songs: [
          { name: 'Beat It', duration: 1345 },
          { name: 'Cannelloni Makaroni', duration: 1236 },
          { name: 'Jukebox Hero', duration: 70000 }
        ]
      },
      {
        name: 'Playlist - yeah!',
        songs: [
          { name: 'Vampires', duration: 1345 },
          { name: 'Cannelloni Makaroni', duration: 1236 },
          { name: 'Rosa helikopter', duration: 70000 }
        ]
      }
    ]
  }
};

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      serverData: {},
      filterString: ''
    };
  }

  componentDidMount() {
    let parsed = querystring.parse(window.location.search);
    let accessToken = parsed['?access_token'];

    // fetch('https://api.spotify.com/v1/me', { headers: { Authorization: 'Bearer ' + accessToken } })
    //   .then(response => response.json())
    //   .then(data => this.setState({ serverData: { user: { name: data.display_name } } }));

    fetch('https://api.spotify.com/v1/me/playlists', {
      headers: { Authorization: 'Bearer ' + accessToken }
    })
      .then(response => response.json())
      .then(data =>
        this.setState({
          serverData: {
            user: {
              playlists: data.items.map(item => ({
                name: item.name,
                songs: []
              }))
            }
          }
        })
      );
  }

  render() {
    let playlistsToRender =
      this.state.serverData.user && this.state.serverData.user.playlists
        ? this.state.serverData.user.playlists.filter(playlist =>
            playlist.name.toLowerCase().includes(this.state.filterString.toLowerCase())
          )
        : [];
    return (
      <div className="App">
        {this.state.serverData.user ? (
          <div>
            <h1>{this.state.serverData.user && this.state.serverData.user.name}'s Playlist</h1>
            <PlaylistCounter playlists={playlistsToRender} />
            <HoursCounter playlists={playlistsToRender} />
            <Filter onTextChange={text => this.setState({ filterString: text })} />
            {playlistsToRender.map((playlist, index) => (
              <Playlist key={index} playlist={playlist} />
            ))}
          </div>
        ) : (
          <button
            onClick={() => (window.location = 'http://localhost:8888/login')}
            style={{ padding: '20px', fontSize: '50px', marginTop: '20px' }}
          >
            Sign in with Spotify
          </button>
        )}
      </div>
    );
  }
}

export default App;
