import React from 'react';
import { LOGIN_OAUTH } from '../../services';

export class Login extends React.Component {
  render() {
    return (
      <a className="btn btn--loginApp-link" href={LOGIN_OAUTH}>
        Login to Spotify
      </a>
    );
  }
}
