import React from 'react';

import SpotifyPlayer from 'react-spotify-web-playback';
import { IProps } from 'react-spotify-web-playback/lib/types/common';

import { SpotifyService } from '../../services';

type ReducedSpotifyPlayerProps = Pick<IProps, Exclude<keyof IProps, 'token'>>;
interface PlayerProps extends ReducedSpotifyPlayerProps {}
interface PlayerState {
  token: string;
}
export class Player extends React.Component<PlayerProps, PlayerState> {
  constructor(props: any) {
    super(props);

    this.state = {
      token: '',
    };
  }

  componentDidMount() {
    const token = SpotifyService.resolveUserToken();
    if (token) {
      this.setState({ token });
    }
  }

  render() {
    return <SpotifyPlayer token={this.state.token} autoPlay={true} showSaveIcon={true} />;
  }
}
