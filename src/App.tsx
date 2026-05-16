import './App.css';

import React from 'react';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import withSizes from 'react-sizes';

import { hot } from 'react-hot-loader/root';

import { Provider } from 'react-redux';

import backgroundImage from './assets/bg.jpg';

import { Colors, APP_FOOTER_HEIGHT, APP_HEADER_HEIGHT, Spacing } from './styles';
import { MOBILE_NAV_HEIGHT } from './components/mobile-nav/mobile-nav.component';
import { Footer, Header, ScrollToTop, Loader } from './components';
import { MobileNav } from './components/mobile-nav/mobile-nav.component';
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
  isMinDurationElapsed: boolean;
  isFadingOut: boolean;
}

class App extends React.Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);

    this.state = {
      loggedIn: false,
      isResolving: true,
      isMinDurationElapsed: false,
      isFadingOut: false,
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
    if (this.state.isMinDurationElapsed) {
      this.startFadeOut();
    }
  }

  private fadeTimer: ReturnType<typeof setTimeout> | null = null;

  startFadeOut = () => {
    this.setState({ isFadingOut: true });
    this.fadeTimer = setTimeout(() => {
      this.setState({ isFadingOut: false });
    }, 300);
  };

  componentWillUnmount() {
    if (this.fadeTimer) {
      clearTimeout(this.fadeTimer);
    }
  }

  handleLoaderComplete = () => {
    this.setState({ isMinDurationElapsed: true });
    if (!this.state.isResolving) {
      this.startFadeOut();
    }
  };

  renderRoutes(location: any) {
    const { loggedIn } = this.state;
    const { isMobile } = this.props;

    return (
      <div
        style={{ ...styles.routeContainer, ...(isMobile ? styles.routeContainerMobile : {}) }}
        className={'App-margins'}
      >
        {!loggedIn && <Home />}
        {loggedIn && <PageTransition key={location.pathname} location={location} isMobile={isMobile} />}
      </div>
    );
  }

  render() {
    const { loggedIn, isResolving, isMinDurationElapsed, isFadingOut } = this.state;
    const { isMobile } = this.props;
    const showLoader = isResolving || !isMinDurationElapsed || isFadingOut;
    const showApp = !isResolving && isMinDurationElapsed;

    return (
      <Provider store={store}>
        <Router>
          <Route
            render={({ location }) => (
              <>
                <ScrollToTop />
                <div style={styles.app}>
                  {showApp && <Header loggedIn={loggedIn} isMobile={isMobile} />}
                  {showApp && this.renderRoutes(location)}
                  {showApp && loggedIn && <Footer isMobile={isMobile} />}
                  {showApp && loggedIn && isMobile && <MobileNav />}
                  {showLoader && (
                    <div style={{ ...styles.loadingOverlay, opacity: isFadingOut ? 0 : 1 }}>
                      <Loader minDuration={2000} onComplete={this.handleLoaderComplete} />
                    </div>
                  )}
                </div>
              </>
            )}
          />
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
  loadingOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
    backgroundImage: `linear-gradient(to top, rgba(24, 13, 34, 0.95), rgba(2, 10, 26, 0.95))`,
    transition: 'opacity 300ms ease-out',
  },
  routeContainer: {
    marginTop: APP_HEADER_HEIGHT,
    marginBottom: APP_FOOTER_HEIGHT,
    paddingTop: Spacing.s24,
  },
  routeContainerMobile: {
    marginBottom: APP_FOOTER_HEIGHT + MOBILE_NAV_HEIGHT,
  },
  pageTransition: {
    animation: 'pageSlideIn 300ms ease-out',
  },
};
