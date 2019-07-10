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

    if (!accessToken) return;

    fetch('https://api.spotify.com/v1/me', { headers: { Authorization: 'Bearer ' + accessToken } })
      .then(response => response.json())
      .then(data => this.setState({ user: { name: data.display_name } }));

    fetch('https://api.spotify.com/v1/me/playlists', {
      headers: { Authorization: 'Bearer ' + accessToken }
    })
      .then(response => response.json())
      .then(data =>
        this.setState({
          playlists: data.items.map(item => {
            console.log(data.items);
            return {
              name: item.name,
              imageUrl: item.images[0].url,
              songs: []
            };
          })
        })
      );
  }

  render() {
    let playlistsToRender =
      this.state.user && this.state.playlists
        ? this.state.playlists.filter(playlist =>
            playlist.name.toLowerCase().includes(this.state.filterString.toLowerCase())
          )
        : [];
    return (
      <div className="App">
        {this.state.user ? (
          <div>
            <h1>{this.state.user.name}'s Playlist</h1>
            <PlaylistCounter playlists={playlistsToRender} />
            <HoursCounter playlists={playlistsToRender} />
            <Filter onTextChange={text => this.setState({ filterString: text })} />
            {playlistsToRender.map((playlist, index) => (
              <Playlist key={index} playlist={playlist} />
            ))}
          </div>
        ) : (
          <button
            onClick={() => {
              window.location = window.location.href.includes('localhost')
                ? 'http://localhost:8888/login'
                : 'https://diogo-spotlists-backend.herokuapp.com/login';
            }}
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
