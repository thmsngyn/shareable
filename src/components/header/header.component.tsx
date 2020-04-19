import React from 'react';

import logo from '../../assets/gradient-logo.png';
import { Spacing, FontSizes, Colors, APP_MARGIN, APP_HEADER_HEIGHT } from '../../styles';

export class Header extends React.Component {
  constructor(props: any) {
    super(props);
  }

  componentDidMount() {}

  render() {
    return (
      <div style={styles.header}>
        <div style={styles.headerContents}>
          <div style={styles.headerLeft}>
            <img style={styles.logo} src={logo} alt="logo" />
            <div style={FontSizes.Medium}>shareable</div>
            <div style={FontSizes.Medium}>stream</div>
          </div>
          <div style={styles.headerRight}>
            <div style={FontSizes.Medium}>account</div>
          </div>
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
};
