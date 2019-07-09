import React, { Component } from 'react';
// import logo from './logo.svg';
import Aggregate from './components/Aggregate/Aggregate';
import Filter from './components/Filter/Filter';
import Playlist from './components/Playlist/Playlist';
import './App.css';

class App extends Component {
  render() {
    let name = 'David';
    let green = '#FF1212';
    let headerStyle = { color: green, 'font-size': '50px' };
    return (
      <div className="App">
        <h1>Title</h1>
        <Aggregate />
        <Aggregate />
        <Filter />
        <Playlist />
        <Playlist />
        <Playlist />
        <Playlist />
      </div>
    );
  }
}

export default App;
