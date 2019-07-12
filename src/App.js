import React, { Component } from 'react';
import querystring from 'querystring';
// import logo from './logo.svg';
import PlaylistCounter from './components/PlaylistCounter/PlaylistCounter';
import HoursCounter from './components/HoursCounter/HoursCounter';
import Filter from './components/Filter/Filter';
import Playlist from './components/Playlist/Playlist';
import './App.css';

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
      .then(playlistData => {
        let playlists = playlistData.items;
        let trackDataPromises = playlists.map(playlist => {
          let responsePromise = fetch(playlist.tracks.href, {
            headers: { Authorization: 'Bearer ' + accessToken }
          });
          let trackDataPromise = responsePromise.then(response => response.json());
          return trackDataPromise;
        });
        let allTracksDataPromises = Promise.all(trackDataPromises);
        let playlistsPromise = allTracksDataPromises.then(trackDatas => {
          trackDatas.forEach((trackData, i) => {
            playlists[i].trackDatas = trackData.items
              .map(item => item.track)
              .map(trackData => ({
                name: trackData.name,
                duration: trackData.duration_ms / 1000
              }));
          });
          return playlists;
        });
        return playlistsPromise;
      })
      .then(playlists =>
        this.setState({
          playlists: playlists.map(item => {
            return {
              name: item.name,
              imageUrl: item.images[0].url,
              songs: item.trackDatas.slice(0, 3)
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
