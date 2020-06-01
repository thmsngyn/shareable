import React from 'react';

import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';

import './track.css';
import './track.scss';

import { Track as TrackType } from '../../services';
import { Spacing, FontSizes, Colors } from '../../styles';
import { playSong } from '../../redux/actions';
import { ShareableAccount, SharedTrackMetadata } from '../../services/shareable';
import { timeSince } from '../../utils';

interface OwnProps {
  track: TrackType;
  account?: ShareableAccount;
  metadata?: SharedTrackMetadata;
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

  renderMetadata() {
    const { account, metadata } = this.props;

    if (!account && !metadata) {
      return;
    }

    const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

    return (
      <div style={styles.metadataContainer}>
        {account && (account.displayName || account.spotifyUserId)}{' '}
        <span style={styles.metadata}>
          {metadata &&
            'shared' +
              ' ' +
              timeSince(new Date(metadata.createdAt).getTime()) +
              ' on ' +
              new Date(metadata.createdAt).toLocaleString('en-US', dateOptions)}
        </span>
      </div>
    );
  }

  render() {
    const { track } = this.props;

    return (
      <div className="track" style={styles.track}>
        {this.hasData(track) ? (
          <div style={styles.column}>
            {this.renderMetadata()}
            <div style={styles.row}>
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
            </div>
          </div>
        ) : (
          <div>Nothing found</div>
        )}
      </div>
    );
  }
}

const styles: Record<any, React.CSSProperties> = {
  row: {
    display: 'flex',
    flexDirection: 'row',
  },
  column: {
    display: 'flex',
    flexDirection: 'column',
  },
  metadataContainer: {
    marginBottom: Spacing.s12,
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
    ...FontSizes.MediumLarge,
  },
  metadata: {
    color: Colors.c400,
  },
};

const MapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>) => ({
  playSong: (track: any) => dispatch(playSong(track)),
});

export default connect(undefined, MapDispatchToProps)(Track);
