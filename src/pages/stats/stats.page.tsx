import React from 'react';

import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';

import { SharedLayout } from '../shared-layout';
import { Section, Profile, Button } from '../../components';
import { TopResponse, SpotifyService, SpotifyTopType, ArtistsEntity, SpotifyTimeRange, Track } from '../../services';
import { Spacing } from '../../styles';
import { playSong } from '../../redux/actions';
import { ButtonTypes } from '../../components/shared/button.component';
import { withWidth, isWidthDown } from '@material-ui/core';

interface OwnProps {
  width: any;
}

interface DispatchProps {
  playSong: typeof playSong;
}

type StatsProps = OwnProps & DispatchProps;

interface StatsState {
  hasError: boolean;
  topArtistsTimeRange: SpotifyTimeRange;
  topTracksTimeRange: SpotifyTimeRange;
  topArtists?: any;
  topTracks?: any;
  isLoading: boolean;
  topArtistsPage: number;
  topTracksPage: number;
}

class Stats extends React.Component<StatsProps, StatsState> {
  maxTopPageOffset = 5;
  topLimit = 10;

  constructor(props: any) {
    super(props);

    this.state = {
      topArtistsTimeRange: SpotifyTimeRange.ShortTerm,
      topTracksTimeRange: SpotifyTimeRange.ShortTerm,
      hasError: false,
      isLoading: true,
      topArtistsPage: 0,
      topTracksPage: 0,
    };
  }

  componentDidMount() {
    this.setTopsState(() => this.setState({ hasError: true }));
  }

  async setTopsState(onError: Function) {
    const { topArtistsTimeRange, topTracksTimeRange, topArtistsPage, topTracksPage } = this.state;
    const topArtists: TopResponse = await SpotifyService.getTop(
      SpotifyTopType.Artists,
      topArtistsTimeRange,
      this.topLimit,
      topArtistsPage * this.topLimit
    );
    const topTracks: TopResponse = await SpotifyService.getTop(
      SpotifyTopType.Tracks,
      topTracksTimeRange,
      this.topLimit,
      topTracksPage * this.topLimit
    );

    const { error: topArtistsError } = topArtists;
    const { error: topTracksError } = topTracks;

    if (topArtistsError || topTracksError) {
      return onError(topArtistsError, topTracksError);
    }

    this.setState({ topArtists, topTracks, isLoading: false });
  }

  renderTimeRangeButtons(type: SpotifyTopType) {
    const SpotifyTimeRangeToDisplay = {
      [SpotifyTimeRange.ShortTerm]: 'Last 4 weeks',
      [SpotifyTimeRange.MediumTerm]: 'Last 6 months',
      [SpotifyTimeRange.LongTerm]: 'Last several years',
    };
    const SpotifyTimeRangeList = [SpotifyTimeRange.ShortTerm, SpotifyTimeRange.MediumTerm, SpotifyTimeRange.LongTerm];
    const timeRangeForType: keyof StatsState =
      type === SpotifyTopType.Artists ? 'topArtistsTimeRange' : 'topTracksTimeRange';

    return (
      <div style={{ ...styles.row, ...styles.timeToggle }}>
        {SpotifyTimeRangeList.map((range, index) => {
          return (
            <Button
              key={index}
              onClick={() => {
                // Using never as a workaround when calling setState with dynamic keys
                this.setState<never>({ [timeRangeForType]: range }, () =>
                  this.setTopsState(() => this.setState({ hasError: true }))
                );
              }}
            >
              {SpotifyTimeRangeToDisplay[range]}
            </Button>
          );
        })}
      </div>
    );
  }

  scrollTopTypeStart(topType: SpotifyTopType) {
    const topElement = document.getElementById(topType);

    if (topElement) {
      topElement.scrollLeft = 0;
    }
  }

  incrementPage(topType: SpotifyTopType, increment: number) {
    const pageState = topType === SpotifyTopType.Artists ? 'topArtistsPage' : 'topTracksPage';

    this.setState<never>(
      (previousState) => {
        let previousPage = previousState[pageState];
        const nextPage = previousPage + increment >= this.maxTopPageOffset ? 0 : previousPage + increment;
        return { [pageState]: nextPage };
      },
      () => {
        this.setTopsState(() => this.setState({ hasError: true }));
        this.scrollTopTypeStart(topType);
      }
    );
  }

  renderPageChange(topType: SpotifyTopType) {
    const pageState = topType === SpotifyTopType.Artists ? 'topArtistsPage' : 'topTracksPage';
    const currentPage: number = this.state[pageState];
    return (
      <div style={{ ...styles.row, ...styles.pageToggle }}>
        <Button
          style={{ width: 'auto' }}
          disabled={currentPage === 0}
          buttonType={ButtonTypes.Secondary}
          onClick={() => this.incrementPage(topType, -1)}
        >
          Back
        </Button>
        <Button
          style={{ width: 'auto' }}
          disabled={currentPage + 1 === this.maxTopPageOffset}
          buttonType={ButtonTypes.Secondary}
          onClick={() => this.incrementPage(topType, 1)}
        >
          Next
        </Button>
        <div>Page {currentPage + 1}</div>
      </div>
    );
  }

  get responsiveRowStyle(): React.CSSProperties {
    const { width } = this.props;
    const mobileStyles: React.CSSProperties = isWidthDown('sm', width)
      ? {
          overflowX: 'auto',
          flexDirection: 'column',
          flexWrap: 'wrap',
          alignItems: 'flex-start',
          height: '260px',
          width: 'auto',
          justifyContent: 'none',
        }
      : {};
    return {
      ...styles.row,
      ...mobileStyles,
    };
  }

  get responsiveProfileStyles(): React.CSSProperties {
    const { width } = this.props;
    const mobileStyles: React.CSSProperties = isWidthDown('sm', width)
      ? {
          width: 'fit-content',
          marginRight: Spacing.s16,
          marginBottom: Spacing.s16,
        }
      : {};
    return {
      ...styles.profile,
      ...mobileStyles,
    };
  }

  render() {
    const {
      hasError,
      topArtists,
      topTracks,
      isLoading,
      topArtistsTimeRange,
      topTracksTimeRange,
      topArtistsPage,
      topTracksPage,
    } = this.state;
    const SpotifyTimeRangeToDisplay = {
      [SpotifyTimeRange.ShortTerm]: 'Last 4 weeks',
      [SpotifyTimeRange.MediumTerm]: 'Last 6 months',
      [SpotifyTimeRange.LongTerm]: 'Last several years',
    };

    return (
      <SharedLayout hasError={hasError} isLoading={isLoading}>
        <div>
          <Section headerText={`Top artists (${SpotifyTimeRangeToDisplay[topArtistsTimeRange]})`}>
            {this.renderTimeRangeButtons(SpotifyTopType.Artists)}
            <div id={SpotifyTopType.Artists} style={this.responsiveRowStyle}>
              {topArtists &&
                topArtists!.items!.map((artist: ArtistsEntity, index: number) => {
                  return (
                    <Profile
                      key={index}
                      style={this.responsiveProfileStyles}
                      imageStyle={styles.image}
                      imageUrl={artist.images![0].url}
                      onClickImage={() => window.open(artist.external_urls.spotify, '_blank')}
                      displayKeys={false}
                      info={{
                        rank: `${index + topArtistsPage * 10 + 1}`,
                        name: artist.name,
                        genres: artist.genres!.join(', '),
                      }}
                    ></Profile>
                  );
                })}
            </div>
            {this.renderPageChange(SpotifyTopType.Artists)}
          </Section>
        </div>
        <div>
          <Section headerText={`Top tracks (${SpotifyTimeRangeToDisplay[topTracksTimeRange]})`}>
            {this.renderTimeRangeButtons(SpotifyTopType.Tracks)}
            <div id={SpotifyTopType.Tracks} style={this.responsiveRowStyle}>
              {topTracks &&
                topTracks!.items!.map((track: Track, index: number) => {
                  return (
                    <Profile
                      key={index}
                      style={this.responsiveProfileStyles}
                      imageStyle={styles.image}
                      imageUrl={track.album!.images![0].url}
                      onClickImage={() => this.props.playSong(track)}
                      displayKeys={false}
                      info={{
                        rank: `${index + topTracksPage * 10 + 1}`,
                        title: track.name,
                        artist: track.artists![0].name,
                      }}
                    ></Profile>
                  );
                })}
            </div>
            {this.renderPageChange(SpotifyTopType.Tracks)}
          </Section>
        </div>
      </SharedLayout>
    );
  }
}

const styles: Record<any, React.CSSProperties> = {
  row: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: Spacing.s16,
    scrollBehavior: 'smooth',
  },
  profile: {
    width: 500,
    marginBottom: Spacing.s12,
    marginRight: Spacing.s48,
  },
  image: {
    width: 100,
    height: 100,
  },
  timeToggle: {
    maxWidth: '525px',
  },
  pageToggle: {
    maxWidth: '275px',
    flexWrap: 'nowrap',
  },
};

const MapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>) => ({
  playSong: (track: any) => dispatch(playSong(track)),
});

export default connect(undefined, MapDispatchToProps)(withWidth()(Stats));
