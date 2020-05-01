import React, { Fragment } from 'react';

import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';

import './track.css';
import './track.scss';

import { Track as TrackType } from '../../services';
import { Spacing, FontSizes } from '../../styles';
import { playSong } from '../../redux/actions';

interface OwnProps {
  track: TrackType;
}
interface DispatchProps {
  playSong: typeof playSong;
}
interface StateProps {}

type TrackProps = OwnProps & DispatchProps & StateProps;

interface TrackState {}

class Track extends React.Component<TrackProps, TrackState> {
  renderArtists() {
    const { track } = this.props;

    return <div style={styles.artistName}>{track.artists!.map((artist: any) => artist.name).join(', ')}</div>;
  }

  renderTrackTitle() {
    const { track } = this.props;

    return <div style={styles.trackTitle}>{track.name}</div>;
  }

  hasData(track: TrackType) {
    return track && track.album!.images![0].url && track.artists;
  }

  render() {
    const { track } = this.props;

    return (
      <div className="track" style={styles.track}>
        {this.hasData(track) ? (
          <Fragment>
            <div style={styles.coverArt}>
              <img
                alt={'trackImage'}
                className="art"
                src={track.album!.images![0].url}
                onClick={() => this.props.playSong(track)}
              />
            </div>
            <div className="track__content">
              {this.renderArtists()}
              {this.renderTrackTitle()}
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

const MapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>) => ({
  playSong: (track: any) => dispatch(playSong(track)),
});

export default connect(undefined, MapDispatchToProps)(Track);
