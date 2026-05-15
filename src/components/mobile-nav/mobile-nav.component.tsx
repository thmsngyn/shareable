import React from 'react';
import { NavLink } from 'react-router-dom';

import { Colors, APP_HEADER_HEIGHT, Spacing } from '../../styles';
import { AppRoutes } from '../../utils';

export const MOBILE_NAV_HEIGHT = APP_HEADER_HEIGHT;

export class MobileNav extends React.Component {
  render() {
    return (
      <div style={styles.nav}>
        {AppRoutes.map((route) => (
          <NavLink key={route.path} exact to={route.path} style={styles.navItem} activeStyle={styles.navItemActive}>
            {route.header}
          </NavLink>
        ))}
      </div>
    );
  }
}

const styles: Record<string, React.CSSProperties> = {
  nav: {
    position: 'fixed',
    left: 0,
    bottom: 0,
    width: '100%',
    height: MOBILE_NAV_HEIGHT,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: Colors.Header,
    zIndex: 2,
  },
  navItem: {
    textDecoration: 'none',
    color: Colors.White,
    fontSize: 14,
    padding: '0 8px',
  },
  navItemActive: {
    fontWeight: 700,
  },
};
