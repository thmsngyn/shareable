import React from 'react';
import { LOGIN_OAUTH } from '../../services';

export class Login extends React.Component {
  render() {
    return (
      <div>
        <a style={styles.button} className="btn btn--loginApp-link" href={LOGIN_OAUTH}>
          Login to Spotify
        </a>
      </div>
    );
  }
}

const styles: Record<any, React.CSSProperties> = {
  button: {
    display: 'inline-block',
  },
};
