import React from 'react';

import { NavLink } from 'react-router-dom';

import logo from '../../assets/gradient-logo.png';
import { FontSizes, Colors, APP_MARGIN, APP_HEADER_HEIGHT } from '../../styles';

interface HeaderProps {}
interface HeaderState {}
export class Header extends React.Component<HeaderProps, HeaderState> {
  constructor(props: any) {
    super(props);
  }

  componentDidMount() {}

  renderHeaderItem(text: string, route: string) {
    return (
      <NavLink to={route} style={styles.headerItem} activeStyle={styles.headerItem}>
        {text}
      </NavLink>
    );
  }

  render() {
    return (
      <div style={styles.header}>
        <div style={styles.headerContents}>
          <div style={styles.headerLeft}>
            <img style={styles.logo} src={logo} alt="logo" />
            {this.renderHeaderItem('shareable', '/')}
            {this.renderHeaderItem('stream', '/stream')}
          </div>
          <div style={styles.headerRight}>{this.renderHeaderItem('account', '/')}</div>
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
    width: 224,
  },
  headerRight: {
    display: 'flex',
    marginLeft: 'auto',
  },
  headerItem: {
    cursor: 'pointer',
    textDecoration: 'none',
    color: Colors.ScreenBackground,
  },
};
