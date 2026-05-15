import './App.css';

import React from 'react';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import withSizes from 'react-sizes';

import { hot } from 'react-hot-loader/root';

import { Provider } from 'react-redux';

import backgroundImage from './assets/bg.jpg';

import { Colors, APP_FOOTER_HEIGHT, APP_HEADER_HEIGHT, Spacing } from './styles';
import { Footer, Header, ScrollToTop, Section } from './components';
import { Home } from './pages';
import { SpotifyService } from './services';
import { StorageService, StorageKeys } from './services/storage';
import { AppRoutes, mapSizesToProps } from './utils';
import store from './redux/store';
import { setUser } from './redux/actions';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'lottie-player': any;
    }
  }
}

interface AppProps {
  isMobile: boolean;
}

interface AppState {
  loggedIn: boolean;
  isResolving: boolean;
}

class App extends React.Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);

    this.state = {
      loggedIn: false,
      isResolving: true,
    };
  }

  async componentDidMount() {
    const token = await SpotifyService.resolveUserTokenAsync();
    if (token) {
      const accountId = StorageService.get(StorageKeys.ShareableAccountId);
      const userProfile = StorageService.get(StorageKeys.UserProfile);
      if (accountId) {
        const storedUser = userProfile ? JSON.parse(userProfile) : {};
        store.dispatch(setUser({ _id: accountId, ...storedUser } as any));
      }
    }
    this.setState({ loggedIn: !!token, isResolving: false });
  }

  renderRoutes(location: any) {
    const { loggedIn, isResolving } = this.state;
    const { isMobile } = this.props;

    return (
      <div style={styles.routeContainer} className={'App-margins'}>
        {isResolving && (
          <Section>
            <div style={styles.loadingContainer}>
              <lottie-player
                src="https://lottie.host/f3d782fd-2ae2-4622-84ca-37ebfe662ad4/PVyXBvcmUn.json"
                background="transparent"
                speed="1"
                style={{ width: 350, height: 350 }}
                loop
                autoplay
              ></lottie-player>
            </div>
          </Section>
        )}
        {!isResolving && !loggedIn && <Home />}
        {!isResolving && loggedIn && (
          <PageTransition key={location.pathname} location={location} isMobile={isMobile} />
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
          <Route render={({ location }) => (
            <>
              <ScrollToTop />
              <div style={styles.app}>
                <Header loggedIn={loggedIn} isMobile={isMobile} />
                {this.renderRoutes(location)}
                {loggedIn && <Footer isMobile={isMobile} />}
              </div>
            </>
          )} />
        </Router>
      </Provider>
    );
  }
}

class PageTransition extends React.Component<{ location: any; isMobile: boolean }> {
  render() {
    const { location, isMobile } = this.props;
    return (
      <Switch location={location}>
        {AppRoutes.map((route) => {
          const { path, page: Page } = route;
          return (
            <Route key={route.path} exact path={path} render={(props) => <Page {...props} isMobile={isMobile} />} />
          );
        })}
      </Switch>
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
  pageTransition: {
    animation: 'pageSlideIn 300ms ease-out',
  },
  loadingContainer: {
    display: 'flex',
    justifyContent: 'center',
  },
};
