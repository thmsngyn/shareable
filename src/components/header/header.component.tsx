import React from 'react';

import { NavLink } from 'react-router-dom';

import logo from '../../assets/gradient-logo.png';
import { FontSizes, Colors, APP_MARGIN, APP_HEADER_HEIGHT } from '../../styles';
import { AppRoutes, AppRoute } from '../../utils';

interface HeaderProps {}
interface HeaderState {}
export class Header extends React.Component<HeaderProps, HeaderState> {
  constructor(props: any) {
    super(props);
  }

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
          <NavLink exact to={route.path} style={styles.headerItem} activeStyle={styles.headerItemActive}>
            {route.header}
          </NavLink>
        );
      }
    );
  }

  render() {
    return (
      <div style={styles.header}>
        <div style={styles.headerContents}>
          <div style={styles.headerLeft}>
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
    backgroundColor: Colors.White,
    color: Colors.ScreenBackground,
    height: APP_HEADER_HEIGHT,
  },
  headerContents: {
    marginLeft: APP_MARGIN,
    marginRight: APP_MARGIN,
    display: 'flex',
    alignItems: 'center',
    height: '100%',
    ...FontSizes.Medium,
  },
  logo: {
    width: 35,
    height: 35,
  },
  headerLeft: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: 400,
  },
  headerRight: {
    display: 'flex',
    marginLeft: 'auto',
  },
  headerItem: {
    display: 'flex',
    cursor: 'pointer',
    textDecoration: 'none',
    color: Colors.ScreenBackground,
  },
  headerItemActive: {
    fontFamily: 'CentraNo2-Medium',
  },
};
