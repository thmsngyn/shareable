import React from 'react';

import { SharedLayout } from '../shared-layout';
import { Section, Profile, Button } from '../../components';
import { TopResponse, SpotifyService, SpotifyTopType, ArtistsEntity, SpotifyTimeRange, Track } from '../../services';
import { Spacing } from '../../styles';

interface StatsProps {}
interface StatsState {
  hasError: boolean;
  topArtistsTimeRange: SpotifyTimeRange;
  topTracksTimeRange: SpotifyTimeRange;
  topArtists?: any;
  topTracks?: any;
  isLoading: boolean;
}

export class Stats extends React.Component<StatsProps, StatsState> {
  constructor(props: any) {
    super(props);

    this.state = {
      topArtistsTimeRange: SpotifyTimeRange.ShortTerm,
      topTracksTimeRange: SpotifyTimeRange.ShortTerm,
      hasError: false,
      isLoading: true,
    };
  }

  componentDidMount() {
    this.setTopsState(() => this.setState({ hasError: true }));
  }

  async setTopsState(onError: Function) {
    const { topArtistsTimeRange, topTracksTimeRange } = this.state;
    const topArtists: TopResponse = await SpotifyService.getTop(SpotifyTopType.Artists, topArtistsTimeRange);
    const topTracks: TopResponse = await SpotifyService.getTop(SpotifyTopType.Tracks, topTracksTimeRange);

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
    const timeRangeForType = type === SpotifyTopType.Artists ? 'topArtistsTimeRange' : 'topTracksTimeRange';

    return (
      <div style={styles.row}>
        {SpotifyTimeRangeList.map((range, index) => {
          return (
            <div key={index} style={styles.toggle}>
              <Button
                text={SpotifyTimeRangeToDisplay[range]}
                onClick={() => {
                  // Using never as a workaround when calling setState with dynamic keys
                  this.setState<never>({ [timeRangeForType]: range }, () =>
                    this.setTopsState(() => this.setState({ hasError: true }))
                  );
                }}
              />
            </div>
          );
        })}
      </div>
    );
  }

  render() {
    const { hasError, topArtists, topTracks, isLoading, topArtistsTimeRange, topTracksTimeRange } = this.state;
    const SpotifyTimeRangeToDisplay = {
      [SpotifyTimeRange.ShortTerm]: 'Last 4 weeks',
      [SpotifyTimeRange.MediumTerm]: 'Last 6 months',
      [SpotifyTimeRange.LongTerm]: 'Last several years',
    };

    return (
      <SharedLayout hasError={hasError} isLoading={isLoading}>
        <div style={styles.row}>
          <Section headerText={`Top artists (${SpotifyTimeRangeToDisplay[topArtistsTimeRange]})`}>
            {this.renderTimeRangeButtons(SpotifyTopType.Artists)}
            <div style={styles.row}>
              {topArtists &&
                topArtists!.items!.map((artist: ArtistsEntity, index: number) => {
                  return (
                    <Profile
                      key={index}
                      style={styles.profile}
                      imageStyle={styles.image}
                      imageUrl={artist.images![0].url}
                      externalUrl={artist.external_urls.spotify}
                      info={{
                        rank: `${index + 1}`,
                        name: artist.name,
                        genres: artist.genres!.join(', '),
                      }}
                    ></Profile>
                  );
                })}
            </div>
          </Section>
        </div>
        <div style={styles.row}>
          <Section headerText={`Top tracks (${SpotifyTimeRangeToDisplay[topTracksTimeRange]})`}>
            {this.renderTimeRangeButtons(SpotifyTopType.Tracks)}
            <div style={styles.row}>
              {topTracks &&
                topTracks!.items!.map((track: Track, index: number) => {
                  return (
                    <Profile
                      key={index}
                      style={styles.profile}
                      imageStyle={styles.image}
                      imageUrl={track.album!.images![0].url}
                      externalUrl={track.external_urls.spotify}
                      info={{
                        rank: `${index + 1}`,
                        title: track.name,
                        artist: track.artists![0].name,
                      }}
                    ></Profile>
                  );
                })}
            </div>
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
  },
  profile: {
    width: 500,
    marginBottom: Spacing.s12,
    marginRight: Spacing.s48,
  },
  image: {
    width: 90,
    height: 'auto',
  },
  toggle: {
    marginBottom: Spacing.s16,
    marginRight: Spacing.s16,
  },
};
