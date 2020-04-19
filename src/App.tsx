import React from 'react';

import { BrowserRouter as Router, Route } from 'react-router-dom';

import { hot } from 'react-hot-loader/root';

import logo from './logo.svg';

import { Spacing, FontSizes, Colors, APP_MARGIN, APP_FOOTER_HEIGHT } from './styles';
import { Login, Footer, Header } from './components';
import { Stream } from './pages';
import { SpotifyService } from './services';

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

  renderRoutes() {
    const { loggedIn } = this.state;
    return (
      <div style={styles.routeContainer}>
        {!loggedIn && <Login></Login>}
        {loggedIn && <Route path="/" component={Stream}></Route>}
      </div>
    );
  }

  render() {
    return (
      <Router>
        <div style={styles.app}>
          <Header />
          {this.renderRoutes()}
          <Footer />
        </div>
      </Router>
    );
  }
}

export default hot(App);

const styles: Record<string, React.CSSProperties> = {
  app: {
    backgroundColor: Colors.ScreenBackground,
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    color: Colors.c100,
    alignItems: 'flex-start',
    fontFamily: 'CentraNo2-Book ',
  },
  routeContainer: {
    paddingLeft: APP_MARGIN,
    paddingRight: APP_MARGIN,
    paddingTop: APP_FOOTER_HEIGHT,
    paddingBottom: APP_FOOTER_HEIGHT,
    width: '100%',
    backgroundClip: 'content-box',
    boxShadow: `inset ${Spacing.s224}px 0 ${Spacing.s128}px -${Spacing.s128}px ${Colors.ShareableLavender}, inset -${Spacing.s224}px 0 ${Spacing.s128}px -${Spacing.s128}px ${Colors.ShareableLavender}`,
  },
};
