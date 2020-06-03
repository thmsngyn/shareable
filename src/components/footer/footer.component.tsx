import React from 'react';

import { Player } from '../player';

interface FooterProps {
  isMobile?: boolean;
}
export class Footer extends React.Component<FooterProps> {
  componentDidMount() {}

  render() {
    return (
      <div style={styles.footer}>
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
  },
};
