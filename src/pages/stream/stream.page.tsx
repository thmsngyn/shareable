import React from 'react';

import { Track, Section } from '../../components';
import {
  TracksEntity,
  SpotifyService,
  SpotifyError,
  CurrentPlaybackResponse,
  LikesResponse,
  Track as TrackType,
} from '../../services';
import { SharedLayout } from '../shared-layout';

interface StreamProps {}
interface StreamState {
  hasError: boolean;
  currentTrack: TrackType;
  is_playing: boolean;
  progress_ms: number;
  likes: TracksEntity[];
}

export class Stream extends React.Component<StreamProps, StreamState> {
  constructor(props: StreamProps) {
    super(props);

    this.state = {
      currentTrack: {
        album: {
          images: [{ url: '', height: 0, width: 0 }],
        },
        name: '',
        artists: [{ name: '' }],
        duration_ms: 0,
      } as TrackType,
      is_playing: true,
      progress_ms: 0,
      likes: [],
      hasError: false,
    };
  }

  componentDidMount() {
    this.setCurrentlyPlayingState((error: SpotifyError) => {
      // Something bad happened
      this.setState({ hasError: true });
    });
    this.setLikesState((error: SpotifyError) => {
      // Something bad happened
      this.setState({ hasError: true });
    });
  }

  async setCurrentlyPlayingState(onError: Function) {
    const currentlyPlaying: CurrentPlaybackResponse = await SpotifyService.getCurrentlyPlaying();
    const { error } = currentlyPlaying;

    if (error) {
      return onError(error);
    }

    this.setState({
      currentTrack: currentlyPlaying.item,
    });
  }

  async setLikesState(onError: Function) {
    const likes: LikesResponse = await SpotifyService.getLikes();
    const { error } = likes;

    if (error) {
      return onError(error);
    }

    this.setState({ likes: likes.items! });
  }

  render() {
    const { hasError, currentTrack, likes } = this.state;

    return (
      <SharedLayout hasError={hasError}>
        <Section headerText={'Currently playing'}>
          <Track track={currentTrack} />
        </Section>
        <Section headerText={'Likes'}>
          {likes.map((like, index) => {
            return <Track key={index} track={like.track} />;
          })}
        </Section>
      </SharedLayout>
    );
  }
}
