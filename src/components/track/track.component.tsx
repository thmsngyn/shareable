import React, { Fragment } from 'react';

import './track.css';
import './track.scss';
import { Spacing, FontSizes } from '../../styles';

interface TrackProps {
  item: any;
  is_playing: any;
  progress_ms: any;
}

interface TrackState {}

export class Track extends React.Component<TrackProps, TrackState> {
  constructor(props: TrackProps) {
    super(props);
  }

  componentDidMount() {}

  backgroundStyles() {
    return {
      backgroundImage: `url(${this.props.item.album.images[0].url})`,
      width: 500,
      height: 500,
    };
  }

  progressBarStyles() {
    return {
      width: (this.props.progress_ms * 100) / this.props.item.duration_ms + '%',
    };
  }

  coverArtStyle() {
    return {
      backgroundImage: `url(${this.props.item.album.images[0].url})`,
    };
  }

  renderArtists() {
    return <div style={styles.artistName}>{this.props.item.artists.map((artist: any) => artist.name).join(', ')}</div>;
  }

  renderTrackTitle() {
    return <div style={styles.trackTitle}>{this.props.item.name}</div>;
  }

  render() {
    return (
      <div className="track" style={styles.track}>
        {this.props.item ? (
          <Fragment>
            <div style={styles.coverArt}>
              <img
                className="art"
                src={this.props.item.album.images[0].url}
                onClick={() => window.open(this.props.item.external_urls.spotify, '_blank')}
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
          <div style={FontSizes.Medium}>Nothing found</div>
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
