import React, { Fragment } from 'react';

import { hot } from 'react-hot-loader/root';

import logo from './logo.svg';
import { Login, Player } from './components';
import { SpotifyService, CurrentPlaybackResponse, LikesResponse, SpotifyError, ItemsEntity } from './services';

import './App.css';
import { Spacing } from './styles';

interface AppProps {}

interface AppState {
  item: any;
  is_playing: boolean;
  progress_ms: number;
  loggedIn: boolean;
  likes: ItemsEntity[];
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
      likes: [],
    };
  }

  componentDidMount() {
    if (SpotifyService.resolveUserToken()) {
      this.setState({ loggedIn: true });
      this.setCurrentlyPlayingState((error: SpotifyError) => {
        this.setState({ loggedIn: false });
      });
      this.setLikesState((error: SpotifyError) => {
        this.setState({ loggedIn: false });
      });
    } else {
      this.setState({ loggedIn: false });
    }
  }

  async setCurrentlyPlayingState(onError: Function) {
    const currentlyPlaying: CurrentPlaybackResponse = await SpotifyService.getCurrentlyPlaying();
    const { error } = currentlyPlaying;

    if (error) {
      return onError(error);
    }

    this.setState({
      item: currentlyPlaying.item,
      is_playing: currentlyPlaying.is_playing,
      progress_ms: currentlyPlaying.progress_ms,
    });
  }

  async setLikesState(onError: Function) {
    const likes: LikesResponse = await SpotifyService.getLikes();
    const { error } = likes;

    if (error) {
      return onError(error);
    }

    console.log(likes);
    this.setState({ likes: likes.items! });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <div style={styles.appContainer}>
            <img src={logo} className="App-logo" alt="logo" />
            {!this.state.loggedIn && <Login></Login>}
            {this.state.loggedIn && (
              <Fragment>
                <Player
                  item={this.state.item}
                  is_playing={this.state.is_playing}
                  progress_ms={this.state.progress_ms}
                />
                {this.state.likes.map((like) => {
                  return (
                    <Player item={like.track} is_playing={this.state.is_playing} progress_ms={this.state.progress_ms} />
                  );
                })}
              </Fragment>
            )}
          </div>
        </header>
      </div>
    );
  }
}

export default hot(App);

const styles: Record<string, React.CSSProperties> = {
  appContainer: {
    marginLeft: Spacing.s224,
    marginRight: Spacing.s224,
  },
};
