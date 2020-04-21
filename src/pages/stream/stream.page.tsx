import React from 'react';

import { Section } from '../../components';
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
  currentTrack: TrackType | undefined;
  is_playing: boolean;
  progress_ms: number;
  likes: TracksEntity[];
}

export class Stream extends React.Component<StreamProps, StreamState> {
  constructor(props: StreamProps) {
    super(props);

    this.state = {
      currentTrack: undefined,
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
    const isLoading = !currentTrack && !likes.length;

    return (
      <SharedLayout hasError={hasError} isLoading={isLoading}>
        <Section
          headerText={'Stream feed'}
          subText={'Under development. The intent of this page is to be a live stream of music your friends like.'}
        ></Section>
      </SharedLayout>
    );
  }
}
