import React from 'react';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { hot } from 'react-hot-loader/root';

import { Spacing, Colors, APP_MARGIN, APP_FOOTER_HEIGHT } from './styles';
import { Footer, Header } from './components';
import { Stream, Home, Account } from './pages';
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

  async componentDidMount() {
    const token = SpotifyService.resolveUserToken();
    this.setState({ loggedIn: !!token });
  }

  renderRoutes() {
    const { loggedIn } = this.state;

    // Always render the homepage if a user is not authenticated
    if (!loggedIn) {
      return (
        <div style={styles.routeContainer}>
          <Home />
        </div>
      );
    }

    return (
      <div style={styles.routeContainer}>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/stream" component={Stream} />
          <Route path="/account" component={Account} />
        </Switch>
      </div>
    );
  }

  render() {
    const { loggedIn } = this.state;

    return (
      <Router>
        <div style={styles.app}>
          <Header />
          {this.renderRoutes()}
          {loggedIn && <Footer />}
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
    boxShadow: `inset ${Spacing.s224}px 0 ${Spacing.s224}px -${Spacing.s224}px ${Colors.ShareableLavender}, inset -${Spacing.s224}px 0 ${Spacing.s224}px -${Spacing.s224}px ${Colors.ShareableLavender}`,
  },
  routeContainer: {
    paddingLeft: APP_MARGIN,
    paddingRight: APP_MARGIN,
    paddingTop: APP_FOOTER_HEIGHT,
    paddingBottom: APP_FOOTER_HEIGHT,
    width: '100%',
  },
};
