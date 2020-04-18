import React, { Fragment } from 'react';
import './player.css';
import './player.scss';
import { Spacing, FontSizes } from '../../styles';

interface PlayerProps {
  item: any;
  is_playing: any;
  progress_ms: any;
}

export class Player extends React.Component<PlayerProps> {
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
    return <div>{this.props.item.name}</div>;
  }

  render() {
    return (
      <div className="track" style={styles.track}>
        {this.props.item ? (
          <Fragment>
            <div style={styles.coverArt}>
              <img className="art" src={this.props.item.album.images[0].url} />
            </div>
            <div className="track__content">
              {this.renderArtists()}
              {this.renderTrackTitle()}
              <div style={styles.progress} className="progress">
                <div className="progress__bar" style={this.progressBarStyles()} />
              </div>
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
};
