import React from 'react';

import { connect } from 'react-redux';

import SpotifyPlayer from 'react-spotify-web-playback';
import { IProps, ICallbackState, IStylesProps } from 'react-spotify-web-playback/lib/types/common';
import { IPlayerTrack } from 'react-spotify-web-playback/lib/types/spotify';

import { Theme, createStyles, withStyles, WithStyles } from '@material-ui/core';
import { StyleRules } from '@material-ui/styles';

import { SpotifyService } from '../../services';
import { Colors, Spacing } from '../../styles';
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
        {playerIsActive && <Repost className={classes.repost}></Repost>}
        <SpotifyPlayer
          name={'Shareable Web Player'}
          styles={playerStyles}
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

const playerStyles = {
  sliderColor: Colors.ShareableLavender,
  savedColor: Colors.ShareableLavender,
  bgColor: Colors.Header,
  color: Colors.White,
  trackNameColor: Colors.White,
  trackArtistColor: Colors.White,
  sliderTrackColor: Colors.c500,
};

const styles = (theme: Theme) =>
  createStyles({
    container: {
      display: 'flex',
      flexDirection: 'row',
    },
    playerStyles,
    repost: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      position: 'fixed',
      backgroundColor: 'transparent',
      marginLeft: Spacing.s64,
      width: 50,
      height: 50,
      left: '50%',
      bottom: 0,
      zIndex: 1,
      [theme.breakpoints.down('xs')]: {
        marginLeft: 0,
        left: 0,
      },
    },
  });

const MapDispatchToProps = {
  setFocusedTrack: setFocused,
};

export default connect(undefined, MapDispatchToProps)(withStyles(styles)(Player));
