import React from 'react';

import { NavLink } from 'react-router-dom';
import { isWidthDown, withWidth } from '@material-ui/core';

import logo from '../../assets/logo-white.svg';
import { FontSizes, Colors, APP_HEADER_HEIGHT } from '../../styles';
import { AppRoutes, AppRoute } from '../../utils';

interface SizeProps {
  width: any;
}
interface OwnProps {
  isMobile: boolean;
  loggedIn: boolean;
}

type HeaderProps = SizeProps & OwnProps;

interface HeaderState {}
class Header extends React.Component<HeaderProps, HeaderState> {
  componentDidMount() {}

  renderHeaderItem(isRightAligned: boolean = false) {
    const keepRightHeaders = (route: AppRoute) => {
      return !route.header || (route.header && route.rightAlignedHeader === true);
    };
    const keepLeftHeaders = (route: AppRoute) => {
      return !route.header || (route.header && !route.rightAlignedHeader);
    };

    return AppRoutes.filter((route) => (isRightAligned ? keepRightHeaders(route) : keepLeftHeaders(route))).map(
      (route) => {
        return (
          <NavLink
            key={route.path}
            exact
            to={route.path}
            style={styles.headerItem}
            activeStyle={styles.headerItemActive}
          >
            {route.header}
          </NavLink>
        );
      }
    );
  }

  get splashBgColor() {
    const { loggedIn, width } = this.props;

    return (
      (!loggedIn &&
        (isWidthDown('xs', width)
          ? { backgroundColor: Colors.HeaderSplashMobile }
          : { backgroundColor: Colors.HeaderSplashDesktop })) ||
      {}
    );
  }

  get responsiveHeaderStyle() {
    const { width } = this.props;
    let responsiveHeaderStyle = {
      ...styles.headerContents,
      ...this.splashBgColor,
    };
    if (isWidthDown('xs', width)) {
      responsiveHeaderStyle = {
        ...responsiveHeaderStyle,
        fontSize: (responsiveHeaderStyle.fontSize as number) - 6,
      };
    }

    return responsiveHeaderStyle;
  }

  get responsiveLeftHeaderStyle() {
    const { isMobile } = this.props;
    return { ...styles.headerLeft, width: isMobile ? 250 : 300 };
  }

  render() {
    return (
      <div style={styles.header}>
        <div style={this.responsiveHeaderStyle} className={'AppHeader-padding'}>
          <div style={this.responsiveLeftHeaderStyle}>
            <NavLink exact to={'/'} style={styles.headerItem} activeStyle={styles.headerItemActive}>
              <img style={styles.logo} src={logo} alt="logo" />
            </NavLink>
            {this.renderHeaderItem()}
          </div>
          <div style={styles.headerRight}>{this.renderHeaderItem(true)}</div>
        </div>
      </div>
    );
  }
}

const styles: Record<string, React.CSSProperties> = {
  header: {
    width: '100%',
    position: 'fixed',
    left: 0,
    top: 0,
    backgroundColor: Colors.Header,
    height: APP_HEADER_HEIGHT,
    zIndex: 2,
  },
  headerContents: {
    display: 'flex',
    alignItems: 'center',
    height: '100%',
    ...FontSizes.Medium,
  },
  logo: {
    width: 20,
    height: 20,
  },
  headerLeft: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: 300,
  },
  headerRight: {
    display: 'flex',
    marginLeft: 'auto',
  },
  headerItem: {
    display: 'flex',
    cursor: 'pointer',
    textDecoration: 'none',
    color: Colors.White,
  },
  headerItemActive: {
    fontWeight: 700,
  },
};

export default withWidth()(Header);
