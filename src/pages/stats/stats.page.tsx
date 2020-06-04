import React from 'react';

import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';

import MenuItem from '@material-ui/core/MenuItem';
import { withWidth, isWidthDown, isWidthUp } from '@material-ui/core';

import pineapple from '../../assets/pineapple.svg';
import dinosaur from '../../assets/dinosaur.svg';

import { SharedLayout, HasError } from '../shared-layout';
import { Section, Profile, Button, Dropdown } from '../../components';
import {
  TopResponse,
  SpotifyService,
  SpotifyTopType,
  ArtistsEntity,
  SpotifyTimeRange,
  Track,
  Album,
} from '../../services';
import { Spacing, Colors } from '../../styles';
import { playSong } from '../../redux/actions';
import { ButtonTypes } from '../../components/shared/button.component';
import { SpotifyTimeRangeToDisplay, SpotifyTimeRangeList } from './stats.page.constants';

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
  topArtists: ArtistsEntity[];
  topTracks: Track[];
  isLoading: boolean;
  topArtistsPage: number;
  topTracksPage: number;
  topArtistsTotal: number;
  topTracksTotal: number;
}

class Stats extends React.Component<StatsProps, StatsState> {
  maxTopPageOffset = 5;
  topLimit = 10;

  constructor(props: any) {
    super(props);

    this.state = {
      topArtistsTimeRange: SpotifyTimeRange.ShortTerm,
      topTracksTimeRange: SpotifyTimeRange.ShortTerm,
      topArtists: [],
      topTracks: [],
      hasError: false,
      isLoading: true,
      topArtistsPage: 0,
      topTracksPage: 0,
      topArtistsTotal: 0,
      topTracksTotal: 0,
    };
  }

  componentDidMount() {
    this.setTopsState(() => this.setState(HasError));
  }

  async setTopsState(onError: Function) {
    const { topArtistsTimeRange, topTracksTimeRange, topArtistsPage, topTracksPage } = this.state;
    const topArtistsResponse: TopResponse = await SpotifyService.getTop(
      SpotifyTopType.Artists,
      topArtistsTimeRange,
      this.topLimit,
      topArtistsPage * this.topLimit
    );
    const topTracksResponse: TopResponse = await SpotifyService.getTop(
      SpotifyTopType.Tracks,
      topTracksTimeRange,
      this.topLimit,
      topTracksPage * this.topLimit
    );

    const { error: topArtistsError, items: topArtists = [], total: topArtistsTotal } = topArtistsResponse;
    const { error: topTracksError, items: topTracks = [], total: topTracksTotal } = topTracksResponse;

    if (topArtistsError || topTracksError) {
      return onError(topArtistsError, topTracksError);
    }

    this.setState({ topArtists, topTracks, topArtistsTotal, topTracksTotal, isLoading: false });
  }

  private handleSelect(event, type: SpotifyTopType) {
    const {
      target: { value: range },
    } = event;
    const timeRangeForType: keyof StatsState =
      type === SpotifyTopType.Artists ? 'topArtistsTimeRange' : 'topTracksTimeRange';
    const pageForType: keyof StatsState = type === SpotifyTopType.Artists ? 'topArtistsPage' : 'topTracksPage';

    // Using never as a workaround when calling setState with dynamic keys
    this.setState<never>({ [timeRangeForType]: range, [pageForType]: 0 }, () => {
      this.setTopsState(() => this.setState(HasError));
      this.scrollTopTypeStart(type);
    });
  }

  renderTimeRangeButtons(type: SpotifyTopType) {
    const timeRangeForType: keyof StatsState =
      type === SpotifyTopType.Artists ? 'topArtistsTimeRange' : 'topTracksTimeRange';

    return (
      <div style={{ ...styles.row, ...styles.timeToggle }}>
        <Dropdown value={this.state[timeRangeForType]} onChange={(event) => this.handleSelect(event, type)}>
          {SpotifyTimeRangeList.map((range, index) => {
            return (
              <MenuItem key={index} value={range}>
                {SpotifyTimeRangeToDisplay[range]}
              </MenuItem>
            );
          })}
        </Dropdown>
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
        this.setTopsState(() => this.setState(HasError));
        this.scrollTopTypeStart(topType);
      }
    );
  }

  private hasNextPage(topType: SpotifyTopType) {
    const type = topType === SpotifyTopType.Artists ? 'topArtists' : 'topTracks';
    const currentPage: number = this.state[`${type}Page`];
    const topTotal: number = this.state[`${type}Total`];
    return currentPage + 1 < this.maxTopPageOffset && (currentPage + 1) * this.topLimit < topTotal;
  }

  renderPageChange(topType: SpotifyTopType) {
    const type = topType === SpotifyTopType.Artists ? 'topArtists' : 'topTracks';
    const currentPage: number = this.state[`${type}Page`];
    const topTotal: number = this.state[`${type}Total`];

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
          disabled={!this.hasNextPage(topType)}
          buttonType={ButtonTypes.Secondary}
          onClick={() => this.incrementPage(topType, 1)}
        >
          Next
        </Button>
        <div style={{ color: Colors.c300 }}>
          Page {currentPage + 1} of {Math.floor(topTotal / this.topLimit)}
        </div>
      </div>
    );
  }

  get responsiveRowStyle(): React.CSSProperties {
    const { width } = this.props;
    const mobileStyles: React.CSSProperties = isWidthDown('xs', width)
      ? {
          overflowX: 'auto',
          height: '260px',
          width: '100%',
        }
      : {
          height: isWidthUp('lg', width) ? '600px' : 'auto',
        };
    return {
      ...styles.row,
      flexDirection: 'column',
      flexWrap: 'wrap',
      alignItems: 'flex-start',
      justifyContent: 'none',
      ...mobileStyles,
    };
  }

  responsiveProfileStyles(type: SpotifyTopType): React.CSSProperties {
    const { width } = this.props;
    const mobileStyles: React.CSSProperties = isWidthDown('sm', width)
      ? {
          width: type === SpotifyTopType.Artists ? '90%' : '80%',
          marginRight: Spacing.s16,
          marginBottom: Spacing.s16,
        }
      : {};
    return {
      ...styles.profile,
      ...mobileStyles,
    };
  }

  getImageUrl(entity: ArtistsEntity | Album, defaultImage: string) {
    const { images = [] } = entity;

    if (images.length) {
      return (images[0] && images[0].url) || defaultImage;
    }
    return defaultImage;
  }

  render() {
    const { hasError, topArtists, topTracks, isLoading, topArtistsPage, topTracksPage } = this.state;

    return (
      <SharedLayout hasError={hasError} isLoading={isLoading}>
        <div>
          <Section headerText={`Top artists`}>
            {this.renderTimeRangeButtons(SpotifyTopType.Artists)}
            <div id={SpotifyTopType.Artists} style={this.responsiveRowStyle}>
              {topArtists &&
                topArtists.map((artist: ArtistsEntity, index: number) => {
                  return (
                    <Profile
                      key={index}
                      style={this.responsiveProfileStyles(SpotifyTopType.Artists)}
                      imageStyle={styles.image}
                      imageUrl={this.getImageUrl(artist, dinosaur)}
                      onClickImage={() => window.open(artist.external_urls.spotify, '_blank')}
                      displayKeys={false}
                      info={{
                        rank: `${index + topArtistsPage * 10 + 1}`,
                        name: artist.name,
                        genres: artist.genres!.slice(0, 4).join(', '),
                      }}
                    ></Profile>
                  );
                })}
            </div>
            {this.renderPageChange(SpotifyTopType.Artists)}
          </Section>
        </div>
        <div>
          <Section headerText={`Top tracks`}>
            {this.renderTimeRangeButtons(SpotifyTopType.Tracks)}
            <div id={SpotifyTopType.Tracks} style={this.responsiveRowStyle}>
              {topTracks &&
                topTracks.map((track: Track, index: number) => {
                  return (
                    <Profile
                      key={index}
                      style={this.responsiveProfileStyles(SpotifyTopType.Tracks)}
                      imageStyle={styles.image}
                      imageUrl={this.getImageUrl(track.album, pineapple)}
                      onClickImage={() => this.props.playSong(track)}
                      displayKeys={false}
                      info={{
                        rank: `${index + topTracksPage * 10 + 1}`,
                        title: track.name,
                        artist: track.artists![0].name,
                      }}
                      circular={false}
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
    marginBottom: Spacing.s24,
  },
  pageToggle: {
    maxWidth: '300px',
    flexWrap: 'nowrap',
  },
};

const MapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>) => ({
  playSong: (track: any) => dispatch(playSong(track)),
});

export default connect(undefined, MapDispatchToProps)(withWidth()(Stats));
