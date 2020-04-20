import React from 'react';

import { SharedLayout } from '../shared-layout';
import { Section } from '../../components';
import { TopResponse, SpotifyService, SpotifyTopType, ArtistsEntity } from '../../services';
import { Spacing } from '../../styles';

interface StatsProps {}
interface StatsState {
  hasError: boolean;
  topArtists?: any;
  topTracks?: any;
  isLoading: boolean;
}

export class Stats extends React.Component<StatsProps, StatsState> {
  constructor(props: any) {
    super(props);

    this.state = {
      hasError: false,
      isLoading: true,
    };
  }

  componentDidMount() {
    this.setTopsState(() => this.setState({ hasError: true }));
  }

  async setTopsState(onError: Function) {
    const topArtists: TopResponse = await SpotifyService.getTop(SpotifyTopType.Artists);
    const topTracks: TopResponse = await SpotifyService.getTop(SpotifyTopType.Tracks);

    const { error: topArtistsError } = topArtists;
    const { error: topTracksError } = topTracks;

    if (topArtistsError || topTracksError) {
      return onError(topArtistsError, topTracksError);
    }

    this.setState({ topArtists, topTracks, isLoading: false });
  }

  render() {
    const { hasError, topArtists, topTracks, isLoading } = this.state;

    return (
      <SharedLayout hasError={hasError} isLoading={isLoading}>
        <div style={styles.row}>
          <Section headerText={'Top artists'}>
            {topArtists &&
              topArtists!.items!.map((artist: ArtistsEntity, index: number) => {
                return (
                  <div key={index} style={{ marginBottom: Spacing.s12 }}>
                    <div>{artist.name}</div>
                  </div>
                );
              })}
          </Section>

          <Section headerText={'Top genres'}>
            {topArtists &&
              topArtists!.items!.map((artist: ArtistsEntity, index: number) => {
                return (
                  <div key={index} style={{ marginBottom: Spacing.s12 }}>
                    <div>{artist.genres!.join(', ')}</div>
                  </div>
                );
              })}
          </Section>
        </div>
        <div style={styles.row}>
          <Section headerText={'Top artists'}>
            {topArtists &&
              topArtists!.items!.map((artist: ArtistsEntity, index: number) => {
                return (
                  <div key={index} style={{ marginBottom: Spacing.s12 }}>
                    <img
                      className="art"
                      src={artist!.images![0]!.url}
                      onClick={() => window.open(artist.external_urls.spotify, '_blank')}
                    />
                  </div>
                );
              })}
          </Section>

          <Section headerText={'Top genres'}>
            {topArtists &&
              topArtists!.items!.map((artist: ArtistsEntity, index: number) => {
                return (
                  <div key={index} style={{ marginBottom: Spacing.s12 }}>
                    <div>{artist.genres!.join(', ')}</div>
                  </div>
                );
              })}
          </Section>
        </div>
      </SharedLayout>
    );
  }
}

const styles: Record<any, React.CSSProperties> = {
  row: {
    display: 'flex',
    justifyContent: 'space-between',
  },
};
