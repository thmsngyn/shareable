import React from 'react';

import { connect } from 'react-redux';

import SpotifyPlayer from 'react-spotify-web-playback';
import { IProps, ICallbackState, IStylesProps } from 'react-spotify-web-playback/lib/types/common';
import { IPlayerTrack } from 'react-spotify-web-playback/lib/types/spotify';

import { Theme, createStyles, withStyles, WithStyles } from '@material-ui/core';
import { StyleRules } from '@material-ui/styles';

import { SpotifyService } from '../../services';
import { Colors } from '../../styles';
import { setFocused } from '../../redux/actions';
import { Repost } from '../repost';

type ReducedSpotifyPlayerProps = Pick<IProps, Exclude<keyof IProps, 'token'>>;
interface OwnProps extends ReducedSpotifyPlayerProps {}
interface StyleProps extends WithStyles<typeof styles> {}
interface DispatchProps {
  setFocusedTrack: typeof setFocused;
}

type PlayerProps = OwnProps & DispatchProps & StyleProps;

interface PlayerState {
  token: string;
  deviceId: string;
  playerIsActive: boolean;
}
class Player extends React.Component<PlayerProps, PlayerState> {
  constructor(props: any) {
    super(props);

    this.state = {
      token: '',
      deviceId: '',
      playerIsActive: false,
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
    this.setState({ playerIsActive: isActive });
  }

  render() {
    const { classes } = this.props;
    const { playerIsActive } = this.state;
    return (
      <div className={classes.container}>
        {playerIsActive && <Repost></Repost>}
        <SpotifyPlayer
          name={'Shareable Web Player'}
          styles={styleRules.custom as IStylesProps}
          token={this.state.token}
          autoPlay={true}
          showSaveIcon={true}
          persistDeviceSelection={true}
          callback={this.handlePlayerCallback.bind(this)}
        />
      </div>
    );
  }
}

const styleRules: StyleRules = {
  container: {
    display: 'flex',
    flexDirection: 'row',
  },
  custom: {
    sliderColor: Colors.ShareableLavender,
    savedColor: Colors.ShareableLavender,
  },
  repost: {
    height: '100%',
    width: '100%',
  },
};

const styles = (theme: Theme) => createStyles(styleRules);

const MapDispatchToProps = {
  setFocusedTrack: setFocused,
};

export default connect(undefined, MapDispatchToProps)(withStyles(styles)(Player));
