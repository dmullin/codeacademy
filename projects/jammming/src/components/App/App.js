import React, { Component } from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchResults: [{
        name: name,
        artist: artist,
        album: album,
        id: id
      }],
      playlistName: play,
      playlistTracks: [{
        name: name,
        artist: artist,
        album: album,
        id: id
      }]
    };

    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
  }

  // method to add tracks to playlist
  addTrack(track) {
    if (this.state.playlistTracks.find(savedTrack => savedTrack.id === track.id)) {
      return;
    }
  }

  // method to remove tracks from playlist
  removeTrack(track) {
    this.state.playlistTracks.filter(playlistTrack => playlistTrack.id !== track.id);
    this.setState({ playlistTracks: this.state.playlistTracks });
  }

  // ability to rename created playlist
  updatePlaylistName(name) {
    this.setState({
      playlistName: name
    });
  }
  // save playlist to user's spotify account
  savePlaylist() {
    let trackURIs = this.state.playlistTracks.map(track => track.uri);
    //this.state.playlistTracks.map(track => track.uri);
  }

  // search spotify
  search(term) {
    this.setState({ searchResults: term});
    console.log(term);
  }

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar onSearch={this.search} />
          <div className="App-playlist">
            <SearchResults searchResults={this.state.searchResults} onAdd={this.state.addTrack()} />
            <Playlist 
              playlistName={this.state.playlistName} 
              playlistTracks={this.state.playlistTracks} 
              onRemove={this.removeTrack}
              onNameChange={this.updatePlaylistName}
              onSave={this.savePlaylist} />
          </div>
        </div>
    </div>
    );
  }
}

export default App;
