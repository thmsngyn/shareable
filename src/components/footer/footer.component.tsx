import React from 'react';

import { Player } from '../player';

export class Footer extends React.Component {
  componentDidMount() {}

  render() {
    return (
      <div style={styles.footer}>
        <Player />
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
