import './App.css';

import React from 'react';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import withSizes from 'react-sizes';

import { hot } from 'react-hot-loader/root';

import { Provider } from 'react-redux';

import backgroundImage from './assets/bg.jpg';

import { Colors, APP_FOOTER_HEIGHT, APP_HEADER_HEIGHT, Spacing } from './styles';
import { Footer, Header, ScrollToTop } from './components';
import { Home } from './pages';
import { SpotifyService } from './services';
import { AppRoutes, mapSizesToProps } from './utils';
import store from './redux/store';

interface AppProps {
  isMobile: boolean;
}

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
    const { isMobile } = this.props;

    let responsiveStyle = {
      ...styles.routeContainer,
    };

    return (
      <div style={responsiveStyle} className={'App-margins'}>
        {!loggedIn && <Home />}
        {loggedIn && (
          <Switch>
            {AppRoutes.map((route) => {
              const { path, page: Page } = route;
              return (
                <Route key={route.path} exact path={path} render={(props) => <Page {...props} isMobile={isMobile} />} />
              );
            })}
            ;
          </Switch>
        )}
      </div>
    );
  }

  render() {
    const { loggedIn } = this.state;
    const { isMobile } = this.props;

    return (
      <Provider store={store}>
        <Router>
          <ScrollToTop />
          <div style={styles.app}>
            <Header loggedIn={loggedIn} isMobile={isMobile} />
            {this.renderRoutes()}
            {loggedIn && <Footer isMobile={isMobile} />}
          </div>
        </Router>
      </Provider>
    );
  }
}

export default hot(withSizes(mapSizesToProps)(App));

const styles: Record<string, React.CSSProperties> = {
  app: {
    backgroundImage: `linear-gradient(to top, rgba(24, 13, 34, 0.52), rgba(2, 10, 26, 0.78)), url(${backgroundImage})`,
    backgroundSize: '100% 100%',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    color: Colors.c100,
    fontFamily: 'Muli',
    fontWeight: 500,
  },
  routeContainer: {
    marginTop: APP_HEADER_HEIGHT,
    marginBottom: APP_FOOTER_HEIGHT,
    paddingTop: Spacing.s24,
  },
};
