import './App.css';

import React from 'react';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import withSizes from 'react-sizes';

import { hot } from 'react-hot-loader/root';

import { Colors, APP_FOOTER_HEIGHT, APP_HEADER_HEIGHT, getAppMargin } from './styles';
import { Footer, Header } from './components';
import { Home } from './pages';
import { SpotifyService } from './services';
import { AppRoutes } from './utils';

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
      marginLeft: getAppMargin(isMobile),
      marginRight: getAppMargin(isMobile),
    };

    return (
      <div style={responsiveStyle}>
        {!loggedIn && <Home />}
        {loggedIn && (
          <Switch>
            {AppRoutes.map((route) => {
              const { path, page } = route;
              return <Route key={route.path} exact path={path} component={page} />;
            })}
          </Switch>
        )}
      </div>
    );
  }

  render() {
    const { loggedIn } = this.state;
    const { isMobile } = this.props;

    return (
      <Router basename="/shareable/">
        <div style={styles.app}>
          <Header isMobile={isMobile} />
          {this.renderRoutes()}
          {loggedIn && <Footer />}
        </div>
      </Router>
    );
  }
}

const mapSizesToProps = ({ width }: any) => ({
  isMobile: width < 500,
});

export default hot(withSizes(mapSizesToProps)(App));

const styles: Record<string, React.CSSProperties> = {
  app: {
    backgroundColor: Colors.ScreenBackground,
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    color: Colors.c100,
    fontFamily: 'Muli',
    // boxShadow: `inset ${Spacing.s224}px 0 ${Spacing.s224}px -${Spacing.s224}px ${Colors.ShareableLavender}, inset -${Spacing.s224}px 0 ${Spacing.s224}px -${Spacing.s224}px ${Colors.ShareableLavender}`,
  },
  routeContainer: {
    paddingTop: APP_HEADER_HEIGHT,
    paddingBottom: APP_FOOTER_HEIGHT,
    overflow: 'scroll',
  },
};
