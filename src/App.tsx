import React from 'react';

import { hot } from 'react-hot-loader/root';

import logo from './logo.svg';
import { Login, Player } from './components';
import { SpotifyService, CurrentPlayback } from './services';

import './App.css';

interface AppProps {}

interface AppState {
  item: any;
  is_playing: boolean;
  progress_ms: number;
  loggedIn: boolean;
}

class App extends React.Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);
    this.state = {
      item: {
        album: {
          images: [{ url: '', height: 0, width: 0 }],
        },
        name: '',
        artists: [{ name: '' }],
        duration_ms: 0,
      },
      is_playing: true,
      progress_ms: 0,
      loggedIn: false,
    };
  }

  async componentDidMount() {
    if (SpotifyService.resolveUserToken()) {
      this.setState({ loggedIn: true });

      const currentlyPlaying: CurrentPlayback = await SpotifyService.getCurrentlyPlaying();
      this.setState({
        item: currentlyPlaying.item,
        is_playing: currentlyPlaying.is_playing,
        progress_ms: currentlyPlaying.progress_ms,
      });
    } else {
      this.setState({ loggedIn: false });
    }
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          {!this.state.loggedIn && <Login></Login>}
          {this.state.loggedIn && (
            <Player item={this.state.item} is_playing={this.state.is_playing} progress_ms={this.state.progress_ms} />
          )}
        </header>
      </div>
    );
  }
}

export default hot(App);
