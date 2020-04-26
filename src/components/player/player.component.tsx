import React from 'react';

import { connect } from 'react-redux';

import SpotifyPlayer from 'react-spotify-web-playback';
import { IProps, IStylesProps } from 'react-spotify-web-playback/lib/types/common';

import * as AppStateTypes from 'AppStateTypes';

import { SpotifyService } from '../../services';
import { Colors } from '../../styles';
import { Track } from '..';

type ReducedSpotifyPlayerProps = Pick<IProps, Exclude<keyof IProps, 'token'>>;
interface OwnProps extends ReducedSpotifyPlayerProps {}

interface StateProps {
  currentlyPlaying: any;
}

type PlayerProps = OwnProps & StateProps;

interface PlayerState {
  token: string;
}
class Player extends React.Component<PlayerProps, PlayerState> {
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
    const {
      currentlyPlaying: { track: { uri = '' } = {} },
    } = this.props;
    console.log(uri);
    SpotifyService.playSongs([uri]);

    return (
      <SpotifyPlayer
        name={'Shareable Web Player'}
        styles={styles.custom}
        token={this.state.token}
        autoPlay={true}
        showSaveIcon={true}
        // uris={[uri]}
      />
    );
  }
}

const styles: Record<string, React.CSSProperties & IStylesProps> = {
  custom: {
    sliderColor: Colors.ShareableLavender,
    savedColor: Colors.ShareableLavender,
  },
};

const MapStateToProps = (store: AppStateTypes.ReducerState) => {
  return {
    currentlyPlaying: store.currentlyPlaying,
  };
};

export default connect(MapStateToProps, {})(Player);
