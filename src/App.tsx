import React, { Fragment } from 'react';

import { BrowserRouter as Router, Route } from 'react-router-dom';

import { hot } from 'react-hot-loader/root';

import logo from './logo.svg';

import { Spacing, FontSizes } from './styles';
import { Login, Track, Player } from './components';
import { Stream } from './pages';
import { SpotifyService, CurrentPlaybackResponse, LikesResponse, SpotifyError, ItemsEntity } from './services';

import './App.css';

interface AppProps {}

interface AppState {
  loggedIn: boolean;
}

class App extends React.Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);

    this.state = {
      loggedIn: false,
    };
  }

  componentDidMount() {
    const loggedIn = !!SpotifyService.resolveUserToken();
    this.setState({ loggedIn });
  }

  render() {
    return (
      <Router>
        <div className="App">
          <div className="App-header">
            <div style={styles.header}>
              <img src={logo} className="App-logo" alt="logo" />
              <div style={FontSizes.ExtraLarge}>Shareable</div>
            </div>
            <div style={styles.appContainer}>
              {!this.state.loggedIn && <Login></Login>}
              {this.state.loggedIn && <Route path="/" component={Stream}></Route>}
            </div>
          </div>
        </div>
      </Router>
    );
  }
}

export default hot(App);

const styles: Record<string, React.CSSProperties> = {
  appContainer: {
    paddingLeft: Spacing.s224,
    paddingRight: Spacing.s224,
    width: '100%',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    marginLeft: Spacing.s48,
  },
  section: {
    marginBottom: Spacing.s24,
  },
};
