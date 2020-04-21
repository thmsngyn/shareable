import React, { Fragment } from 'react';

import './track.css';
import './track.scss';

import { Track as TrackType } from '../../services';
import { Spacing, FontSizes } from '../../styles';

interface TrackProps {
  track: TrackType;
  is_playing?: any;
  progress_ms?: any;
}

interface TrackState {}

export class Track extends React.Component<TrackProps, TrackState> {
  componentDidMount() {}

  // backgroundStyles() {
  //   const { track } = this.props;
  //   console.log(track);

  //   return {
  //     backgroundImage: `url(${track.album!.images![0].url})`,
  //     width: 500,
  //     height: 500,
  //   };
  // }

  // progressBarStyles() {
  //   const { track } = this.props;

  //   return {
  //     width: (this.props.progress_ms * 100) / track.duration_ms + '%',
  //   };
  // }

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
                onClick={() => window.open(track.external_urls.spotify, '_blank')}
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
