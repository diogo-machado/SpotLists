import React, { Component } from 'react';
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
    setTimeout(() => {
      this.setState({ serverData: fakeServerData });
    }, 1000);
  }

  render() {
    let playlistsToRender = this.state.serverData.user
      ? this.state.serverData.user.playlists.filter(playlist =>
          playlist.name.toLowerCase().includes(this.state.filterString.toLowerCase())
        )
      : [];
    return (
      <div className="App">
        {this.state.serverData.user ? (
          <div>
            <h1>{this.state.serverData.user && this.state.serverData.user.name}'s Playlist</h1>
            <PlaylistCounter
              playlist={this.state.serverData.user && this.state.serverData.user.playlists}
            />
            <HoursCounter playlists={playlistsToRender} />
            <Filter onTextChange={text => this.setState({ filterString: text })} />
            {playlistsToRender.map((playlist, index) => (
              <Playlist key={index} playlist={playlist} />
            ))}
          </div>
        ) : (
          <h1>Loading...</h1>
        )}
      </div>
    );
  }
}

export default App;
