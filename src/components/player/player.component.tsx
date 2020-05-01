import React from 'react';

import { connect } from 'react-redux';

import SpotifyPlayer from 'react-spotify-web-playback';
import { IProps, IStylesProps, ICallbackState } from 'react-spotify-web-playback/lib/types/common';
import { IPlayerTrack } from 'react-spotify-web-playback/lib/types/spotify';

import { SpotifyService, Track } from '../../services';
import { Colors } from '../../styles';
import { setFocused } from '../../redux/actions';

type ReducedSpotifyPlayerProps = Pick<IProps, Exclude<keyof IProps, 'token'>>;
interface OwnProps extends ReducedSpotifyPlayerProps {}

interface DispatchProps {
  setFocusedTrack: typeof setFocused;
}

type PlayerProps = OwnProps & DispatchProps;

interface PlayerState {
  token: string;
  deviceId: string;
}
class Player extends React.Component<PlayerProps, PlayerState> {
  constructor(props: any) {
    super(props);

    this.state = {
      token: '',
      deviceId: '',
    };
  }

  componentDidMount() {
    const token = SpotifyService.resolveUserToken();
    if (token) {
      this.setState({ token });
    }
  }

  setDevice(deviceId: string, isActive: boolean) {
    const { deviceId: stateDeviceId } = this.state;
    if (!stateDeviceId && deviceId) {
      if (!isActive) {
        this.setState({ deviceId });
        SpotifyService.transferPlayback([deviceId]);
      }
    }
  }

  syncCurrentlyPlaying(track: IPlayerTrack) {
    // Sync the currently playing data from the library player
    // This helps with syncing back with other players like the desktop app
    this.props.setFocusedTrack({
      ...track,
      artists: track.artists.split(', ').map((artistName: string) => {
        return { name: artistName };
      }),
      album: {
        images: [{ url: track.image }],
      },
    } as any); // TODO: Build the proper object type. Consider requesting the track from spotify
  }

  handlePlayerCallback(playerData: ICallbackState) {
    const { deviceId, isActive, track } = playerData; // Top level deviceId is always this device
    this.setDevice(deviceId, isActive);
    this.syncCurrentlyPlaying(track);
  }

  render() {
    return (
      <SpotifyPlayer
        name={'Shareable Web Player'}
        styles={styles.custom}
        token={this.state.token}
        autoPlay={true}
        showSaveIcon={true}
        persistDeviceSelection={true}
        callback={this.handlePlayerCallback.bind(this)}
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

const MapDispatchToProps = {
  setFocusedTrack: setFocused,
};

export default connect(undefined, MapDispatchToProps)(Player);
