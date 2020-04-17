import React, { Fragment } from 'react';
import { AUTH_API } from '../../services';
import { clientId, redirectUri, scopes } from '../../config';

export class Login extends React.Component {
  // constructor(props: any) {
  //   super(props);
  // }

  render() {
    return (
      <a
        className="btn btn--loginApp-link"
        href={`${AUTH_API}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
          '%20'
        )}&response_type=token&show_dialog=true`}
      >
        Login to Spotify
      </a>
    );
  }
}
