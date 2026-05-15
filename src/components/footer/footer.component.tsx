import React from 'react';

import { Player } from '../player';
import { MOBILE_NAV_HEIGHT } from '../mobile-nav/mobile-nav.component';
import { Colors } from '../../styles';

interface FooterProps {
  isMobile?: boolean;
}
export class Footer extends React.Component<FooterProps> {
  componentDidMount() {}

  render() {
    const { isMobile } = this.props;

    return (
      <div style={{ ...styles.footer, ...(isMobile ? { bottom: MOBILE_NAV_HEIGHT - 1 } : {}) }}>
        <Player {...this.props} />
      </div>
    );
  }
}

const styles: Record<string, React.CSSProperties> = {
  footer: {
    position: 'fixed',
    left: 0,
    bottom: 0,
    width: '100%',
    backgroundColor: Colors.Header,
  },
};
