import React from 'react';

import { hot } from 'react-hot-loader/root';

import './App.css';
import { clientId, redirectUri, scopes } from './config';
import hash from './utils/hash';
import Player from './components/player/player';
import logo from './logo.svg';
import { SpotifyService, AUTH_API } from './services';
import { StorageService } from './services/storage';
import { StorageKeys } from './services/storage/storage.constants';

interface AppProps {}

interface AppState {
  token: string | null;
  item: any;
  is_playing: string;
  progress_ms: number;
}

class App extends React.Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);
    this.state = {
      token: null,
      item: {
        album: {
          images: [{ url: '' }],
        },
        name: '',
        artists: [{ name: '' }],
        duration_ms: 0,
      },
      is_playing: 'Paused',
      progress_ms: 0,
    };
  }
  componentDidMount() {
    this.setUserToken();
  }

  setUserToken() {
    // Set token
    let token = hash.access_token;
    const tokenFromStorage = StorageService.get(StorageKeys.SpotifyToken);

    if (token || tokenFromStorage) {
      token = token || tokenFromStorage;

      if (!tokenFromStorage) {
        StorageService.set(StorageKeys.SpotifyToken, token);
        StorageService.setExpiration(StorageKeys.SpotifyToken, 36000000); // 1 hr
      } else {
        StorageService.checkExpiration();
      }

      // Set token
      this.setState({ token });
      SpotifyService.getCurrentlyPlaying(token, this.setCurrentlyPlaying.bind(this));
    }
  }

  setCurrentlyPlaying(data: any) {
    this.setState({
      item: data.item,
      is_playing: data.is_playing,
      progress_ms: data.progress_ms,
    });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          {!this.state.token && (
            <a
              className="btn btn--loginApp-link"
              href={`${AUTH_API}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
                '%20'
              )}&response_type=token&show_dialog=true`}
            >
              Login to Spotify
            </a>
          )}
          {this.state.token && (
            <Player item={this.state.item} is_playing={this.state.is_playing} progress_ms={this.state.progress_ms} />
          )}
        </header>
      </div>
    );
  }
}

export default hot(App);
