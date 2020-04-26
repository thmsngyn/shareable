import React, { Fragment, Dispatch } from 'react';

import { connect } from 'react-redux';

import './track.css';
import './track.scss';

import * as AppStateTypes from 'AppStateTypes';

import { Track as TrackType } from '../../services';
import { Spacing, FontSizes } from '../../styles';
import { ActionTypes } from '../../redux/actions';

interface OwnProps {
  track: TrackType;
}
interface DispatchProps {
  playSong: any;
}
interface StateProps {}

type TrackProps = OwnProps & DispatchProps & StateProps;

interface TrackState {}

class Track extends React.Component<TrackProps, TrackState> {
  coverArtStyle() {
    const { track } = this.props;

    return {
      backgroundImage: `url(${track.album!.images![0].url})`,
    };
  }

  renderArtists() {
    const { track } = this.props;

    return <div style={styles.artistName}>{track.artists!.map((artist: any) => artist.name).join(', ')}</div>;
  }

  renderTrackTitle() {
    const { track } = this.props;

    return <div style={styles.trackTitle}>{track.name}</div>;
  }

  playSong(track: TrackType) {
    const uri = track.album.uri;
    this.props.playSong(track);
  }

  render() {
    const { track } = this.props;

    return (
      <div className="track" style={styles.track}>
        {track ? (
          <Fragment>
            <div style={styles.coverArt}>
              <img
                alt={'trackImage'}
                className="art"
                src={track.album!.images![0].url}
                onClick={() => this.playSong(track)}
              />
            </div>
            <div className="track__content">
              {this.renderArtists()}
              {this.renderTrackTitle()}
              {/* <div style={styles.progress} className="progress"> */}
              {/* <div className="progress__bar" style={this.progressBarStyles()} /> */}
              {/* <SpotifyPlayer token={this.state.token} uris={[]} /> */}
              {/* </div> */}
            </div>
          </Fragment>
        ) : (
          <div>Nothing found</div>
        )}
      </div>
    );
  }
}

const styles: Record<any, React.CSSProperties> = {
  progress: {
    marginTop: Spacing.s16,
  },
  artistName: {
    ...FontSizes.MediumSmall,
  },
  track: {
    marginBottom: Spacing.s24,
  },
  coverArt: {
    marginRight: Spacing.s16,
  },
  trackTitle: {
    ...FontSizes.Large,
  },
};

const MapDispatchToProps = (dispatch: Dispatch<AppStateTypes.RootAction>) => ({
  playSong: (track: any) => dispatch({ type: ActionTypes.PLAY_SONG, payload: track }),
  pauseSong: (track: any) => dispatch({ type: ActionTypes.PAUSE_SONG, payload: track }),
});

export default connect(undefined, MapDispatchToProps)(Track);
